import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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

  const loadYandexMapsScript = (): Promise<YMapsApi> => {
    return new Promise((resolve, reject) => {
      if (window.ymaps) {
        ymapsRef.current = window.ymaps;
        resolve(window.ymaps);
        return;
      }

      const existingScript = document.querySelector(
        `script[src="${YANDEX_API_URL}"]`,
      );
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          ymapsRef.current = window.ymaps;
          resolve(window.ymaps);
        });
        return;
      }

      const script = document.createElement("script");
      script.src = YANDEX_API_URL;
      script.async = true;
      script.onload = () => {
        window.ymaps.ready(() => {
          ymapsRef.current = window.ymaps;
          resolve(window.ymaps);
        });
      };
      script.onerror = (err) => {
        console.error("Ошибка загрузки Yandex Maps API:", err);
        setError("Не удалось загрузить API Яндекс Карт.");
        setIsLoading(false);
        reject(err);
      };
      document.body.appendChild(script);
    });
  };

  const addRoutePoint = (
    coords: number[],
    ymaps: YMapsApi,
    map: YMapInstance,
  ) => {
    const newPlacemark = new ymaps.Placemark(
      coords,
      {
        hintContent: "Точка маршрута",
        balloonContentBody: `<button id="remove-point-${coords.join(
          "-",
        )}">Удалить</button>`,
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

    setRouteInfo("Построение маршрута...");

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
        const humanLength = route.getHumanLength();
        const humanTime = route.getHumanTime();

        lastPoint.properties.set({
          iconContent: "Конец",
          balloonContentHeader: "Конечная точка",
          balloonContentBody: `Расстояние: ${humanLength}<br>Время в пути: ${humanTime}`,
        });

        setRouteInfo(
          `Маршрут построен. Расстояние: ${humanLength}, Время: ${humanTime}`,
        );
      })
      .catch((err: YMapError) => {
        console.error("Ошибка построения маршрута:", err);
        const message = err.message || "Не удалось построить маршрут.";
        setRouteInfo("");
        setError((prev) =>
          prev
            ? `${prev}\nОшибка маршрута: ${message}`
            : `Ошибка маршрута: ${message}`,
        );
      });
  };

  const cancelRoute = () => {
    if (currentRouteRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.geoObjects.remove(currentRouteRef.current);
      currentRouteRef.current = null;
      setRouteInfo("");
    }
  };

  const handleMapDblClick = (event: any) => {
    if (!ymapsRef.current || !mapInstanceRef.current) return;
    const coords = event.get("coords");
    addRoutePoint(coords, ymapsRef.current, mapInstanceRef.current);
  };

  const handleStartRoute = () => {
    if (!ymapsRef.current || !mapInstanceRef.current || !userLocation) {
      setError("Не удалось определить начальную точку маршрута.");
      return;
    }
    buildRouteWithPoints(
      ymapsRef.current,
      userLocation,
      [52.370216, 4.895168],
      intermediatePoints,
    );
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setRouteInfo("");

    loadYandexMapsScript()
      .then((ymaps: YMapsApi) => {
        if (!mapRef.current) return;

        mapInstanceRef.current = new ymaps.Map(
          mapRef.current,
          {
            center: [52.37, 4.89],
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

        ymaps.geolocation
          .get({
            provider: "browser",
            mapStateAutoApply: true,
          })
          .then((result: YMapGeoLocationResult) => {
            const coords: number[] = result.geoObjects
              .get(0)
              .geometry.getCoordinates();
            setUserLocation(coords);

            result.geoObjects.options.set("preset", "islands#redCircleIcon");
            result.geoObjects.get(0).properties.set({
              balloonContentBody: "Мое местоположение",
            });
            mapInstanceRef.current.geoObjects.add(result.geoObjects);

            setIsLoading(false);
          })
          .catch((err: YMapError) => {
            console.error("Ошибка геолокации:", err);
            setError(
              "Не удалось определить ваше местоположение. Убедитесь, что вы разрешили доступ к геолокации.",
            );

            if (mapInstanceRef.current) {
              setIsLoading(false);
            }
          });
      })
      .catch((err) => {
        setIsLoading(false);
      });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);
  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h5" gutterBottom>
        Яндекс Карта (React + TS + Mui)
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Alert>
      )}

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "600px",
          marginBottom: 2,
          border: "1px solid #ccc",
        }}
      >
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 10,
            }}
          >
            <CircularProgress />
            <Typography sx={{ marginLeft: 1 }}>Загрузка карты...</Typography>
          </Box>
        )}
        <Box ref={mapRef} sx={{ width: "100%", height: "100%" }} />
      </Box>

      {userLocation && (
        <Typography variant="body1" gutterBottom>
          Ваши координаты: {userLocation.join(", ")}
        </Typography>
      )}
      {intermediatePoints.length > 0 && (
        <Typography variant="body2" gutterBottom>
          Выбраны точки маршрута:{" "}
          {intermediatePoints
            .map((point) => `[${point.join(", ")}]`)
            .join("; ")}
        </Typography>
      )}
      {routeInfo && (
        <Typography variant="body1" gutterBottom>
          {routeInfo}
        </Typography>
      )}

      <Stack direction="row" spacing={2}>
        {intermediatePoints.length > 0 && userLocation && (
          <Button variant="contained" onClick={handleStartRoute}>
            Старт маршрута
          </Button>
        )}
        {currentRouteRef.current && (
          <Button variant="outlined" onClick={cancelRoute}>
            Отменить маршрут
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default GeoMapPage;
