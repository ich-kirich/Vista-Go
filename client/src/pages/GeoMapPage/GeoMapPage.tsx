import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import styles from "./GeoMapPage.module.scss";
import Loader from "../../components/Loader/Loader";
import { Locales, Routes } from "../../libs/enums";
import useTypedSelector from "../../hooks/useTypedSelector";
import useActions from "../../hooks/useActions";
import { ISights } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { getRoute } from "../../libs/utils";

const YANDEX_API_URL = process.env.REACT_APP_YANDEX_API_URL || "";

type YMapsApi = any;
type YMapInstance = any;
type YMapGeoLocationResult = any;
type YMapRouteResult = any;
type YMapError = any;
type YMapPlaceMark = any;

declare global {
  interface Window {
    ymaps: any;
  }
}

function GeoMapPage(): JSX.Element {
  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;
  const navigate = useNavigate();

  const mapRef = useRef<HTMLDivElement | null>(null);
  const ymapsRef = useRef<YMapsApi | null>(null);
  const mapInstanceRef = useRef<YMapInstance | null>(null);
  const routePointsRef = useRef<YMapPlaceMark[]>([]);
  const currentRouteRef = useRef<YMapRouteResult | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<number[] | null>(null);
  const [routeInfo, setRouteInfo] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [intermediatePoints, setIntermediatePoints] = useState<number[][]>([]);

  const sightsData = useTypedSelector((state) => state.sights);
  const { fetchAllSights } = useActions();

  useEffect(() => {
    fetchAllSights();
  }, []);

  const viewSight = (id: number, sightId: number) => {
    navigate(getRoute(Routes.SIGHT_DETAILS, { id, sightId }));
  };

  const loadYandexMapsScript = (): Promise<YMapsApi> => {
    return new Promise((resolve, reject) => {
      const apiLanguage = `&lang=${
        language === Locales.RU ? "ru_RU" : "en_US"
      }`;
      const existingScript = document.querySelector(
        `script[src="${YANDEX_API_URL}${apiLanguage}"]`,
      );
      if (existingScript) {
        existingScript?.parentNode?.removeChild(existingScript);
        window.ymaps = null;
      }

      const script = document.createElement("script");
      script.src = YANDEX_API_URL + apiLanguage;
      script.async = true;
      script.onload = () => {
        window.ymaps.ready(() => {
          ymapsRef.current = window.ymaps;
          resolve(window.ymaps);
        });
      };
      script.onerror = (err) => {
        console.error(t("app_error.map.error_loading_api"), err);
        setError(t("app_error.map.error_loading_api"));
        setIsLoading(false);
        reject(err);
      };
      document.body.appendChild(script);
      setIsLoading(false);
    });
  };

  const addSightToMap = (
    sight: ISights,
    ymaps: YMapsApi,
    map: YMapInstance,
  ) => {
    const coords: [number, number] = [Number(sight.lat), Number(sight.lon)];
    const placemark = new ymaps.Placemark(
      coords,
      {
        hintContent: sight.name[language] || sight.name.en,
        balloonContentBody: `
          <div class="${styles.balloon}">
          <img src="${sight.image}" alt="${
          sight.name[language] || sight.name.en
        }" id="balloon-img-${sight.id}">
            <h6>${sight.name[language] || sight.name.en}</h6>
            ${
              sight.tags && sight.tags.length > 0
                ? `
                  <div>
                    <strong>${t("map.sights.tags")}:</strong> ${sight.tags
                    .map((tag) => tag.name[language] || tag.name.en)
                    .join(", ")}
                  </div>
                `
                : ""
            }
          </div>
        `,
      },
      {
        preset: "islands#redDotIcon",
      },
    );

    placemark.events.add("balloonopen", () => {
      const img = document.getElementById(`balloon-img-${sight.id}`);
      if (img) {
        img.onclick = () => {
          viewSight(sight.CityId, sight.id);
        };
      }
    });

    map.geoObjects.add(placemark);
  };

  const addRoutePoint = (
    coords: number[],
    ymaps: YMapsApi,
    map: YMapInstance,
  ) => {
    const newPlacemark = new ymaps.Placemark(
      coords,
      {
        hintContent: t("map.point_route"),
        balloonContentBody: `<button class="${
          styles.removeButton
        }" id="remove-point-${coords.join("-")}">${t(
          "map.point_route_delete",
        )}</button>`,
      },
      {
        preset: "islands#blueCircleDotIcon",
        draggable: false,
      },
    );

    newPlacemark.events.add("balloonopen", () => {
      const removeButton = document.getElementById(
        `remove-point-${coords.join("-")}`,
      );
      if (removeButton) {
        removeButton.onclick = () => {
          removeRoutePoint(newPlacemark, coords);
        };
      }
    });

    map.geoObjects.add(newPlacemark);
    routePointsRef.current = [...routePointsRef.current, newPlacemark];
    setIntermediatePoints((prevPoints) => [...prevPoints, coords]);
  };

  const removeRoutePoint = (
    placemarkToRemove: YMapPlaceMark,
    coordsToRemove: number[],
  ) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.geoObjects.remove(placemarkToRemove);
    routePointsRef.current = routePointsRef.current.filter(
      (placemark) => placemark !== placemarkToRemove,
    );
    setIntermediatePoints((prevPoints) =>
      prevPoints.filter(
        (coords) =>
          coords[0] !== coordsToRemove[0] || coords[1] !== coordsToRemove[1],
      ),
    );
  };

  const buildRouteWithPoints = (
    ymaps: YMapsApi,
    startPoint: number[],
    endPoint: number[],
    wayPoints: number[][],
  ) => {
    if (!ymaps || !mapInstanceRef.current) return;

    setRouteInfo(t("map.route_building"));

    if (currentRouteRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.geoObjects.remove(currentRouteRef.current);
      currentRouteRef.current = null;
    }

    ymaps
      .route([startPoint, ...wayPoints, endPoint], { mapStateAutoApply: true })
      .then((route: YMapRouteResult) => {
        currentRouteRef.current = route;
        mapInstanceRef.current.geoObjects.add(route);

        const points = route.getWayPoints();
        const lastPoint = points.get(points.getLength() - 1);
        const humanLength = route.getHumanLength().replace(/&#160;/g, " ");
        const humanTime = route.getHumanTime().replace(/&#160;/g, " ");
        lastPoint.properties.set({
          balloonContentHeader: t("map.end_point"),
          balloonContentBody: `${t("map.distance")}: ${humanLength}<br>${t(
            "map.travel_time",
          )}: ${humanTime}`,
        });

        setRouteInfo(
          `${t("map.route_build")}. ${t("map.distance")}: ${humanLength}, ${t(
            "map.travel_time",
          )}: ${humanTime}`,
        );
      })
      .catch((err: YMapError) => {
        console.error(t("app_error.map.error_building_route"), err);
        const message = err.message || t("app_error.map.error_building_route");
        setRouteInfo("");
        setError((prev) =>
          prev
            ? `${prev}\n${t("app_error.map.error_building_route")}: ${message}`
            : `${t("app_error.map.error_building_route")}: ${message}`,
        );
      });
  };

  const cancelRoute = () => {
    setError(null);
    if (currentRouteRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.geoObjects.remove(currentRouteRef.current);
      currentRouteRef.current = null;
      setRouteInfo("");
    }
  };

  const handleMapDblClick = (event: any) => {
    setError(null);
    if (!ymapsRef.current || !mapInstanceRef.current) return;
    const coords = event.get("coords");
    addRoutePoint(coords, ymapsRef.current, mapInstanceRef.current);
  };

  const handleStartRoute = () => {
    setError(null);
    if (!ymapsRef.current || !mapInstanceRef.current || !userLocation) {
      setError(t("app_error.map.error_start_point"));
      return;
    }

    let endPoint: number[] | undefined;
    if (intermediatePoints.length > 0) {
      endPoint = intermediatePoints[intermediatePoints.length - 1];
    } else {
      setError(t("app_error.map.no_end_point"));
      return;
    }

    buildRouteWithPoints(
      ymapsRef.current,
      userLocation,
      endPoint,
      intermediatePoints.slice(0, -1),
    );
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setRouteInfo("");

    if (sightsData.sights) {
      let initialCenter = [49.8, 73.1];
      loadYandexMapsScript()
        .then(async (ymaps: YMapsApi) => {
          try {
            const result = await ymaps.geolocation.get({
              provider: "browser",
              mapStateAutoApply: true,
            });
            const userCoords = result.geoObjects
              .get(0)
              .geometry.getCoordinates();
            initialCenter = userCoords;
          } catch (error: any) {
            console.error(t("app_error.map.no_geo_position"), error);
            setError(t("app_error.map.no_geo_position"));
          } finally {
            if (mapRef.current && !mapInstanceRef.current) {
              mapInstanceRef.current = new ymaps.Map(
                mapRef.current,
                {
                  center: initialCenter,
                  zoom: 10,
                  controls: [
                    "zoomControl",
                    "fullscreenControl",
                    "geolocationControl",
                  ],
                },
                {
                  minZoom: 3,
                  restrictMapArea: [
                    [80, -179],
                    [-80, 180],
                  ],
                },
              );
              mapInstanceRef.current.events.add("dblclick", handleMapDblClick);

              if (sightsData.sights) {
                sightsData.sights.forEach((sight) => {
                  addSightToMap(sight, ymaps, mapInstanceRef.current);
                });
              }

              const geolocationControl =
                mapInstanceRef.current.controls.get("geolocationControl");
              if (geolocationControl) {
                geolocationControl.events.add(
                  "locationchange",
                  (event: any) => {
                    const newCoords = event.get("position");
                    setUserLocation(newCoords);

                    if (intermediatePoints.length > 0) {
                      buildRouteWithPoints(
                        ymaps,
                        newCoords,
                        intermediatePoints[intermediatePoints.length - 1],
                        intermediatePoints.slice(0, -1),
                      );
                    }
                  },
                );
              } else {
                console.error(t("app_error.map.no_geo_position"));
                setError(t("app_error.map.no_geo_position"));
                setIsLoading(false);
              }
            }
          }
        })
        .catch(() => {
          setIsLoading(false);
        });

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
          mapInstanceRef.current = null;
        }
      };
    }
  }, [sightsData.sights]);
  return (
    <Box className={styles.map}>
      <Typography
        variant="h6"
        component="h2"
        className={styles.map__title}
        gutterBottom
      >
        {t("map.title")}
      </Typography>

      {(error || sightsData.error) && (
        <Alert severity="error" className={styles.map__error}>
          {(error || sightsData.error)?.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Alert>
      )}

      <Box className={styles.map__wrapper}>
        {(isLoading || sightsData.loading) && (
          <Box className={styles.map__loading}>
            <Loader />
          </Box>
        )}
        <Box ref={mapRef} className={styles.map__container} />
      </Box>

      <Box className={styles.map__info}>
        {routeInfo && (
          <Typography variant="body1" gutterBottom>
            {routeInfo}
          </Typography>
        )}

        <Stack direction="row" spacing={2}>
          {intermediatePoints.length > 0 && userLocation && (
            <Button variant="contained" onClick={handleStartRoute}>
              {t("map.start_route")}
            </Button>
          )}
          {currentRouteRef.current && (
            <Button variant="outlined" onClick={cancelRoute}>
              {t("map.cancel_route")}
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

export default GeoMapPage;
