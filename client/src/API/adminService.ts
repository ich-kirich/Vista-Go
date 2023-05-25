import { adminHost } from "./axiosConfig";

export async function createRecommend(cityId: number) {
  const { data } = await adminHost.post("admin/create/recommend", {
    cityId,
  });
  return data;
}

export async function deleteRecommend(id: number) {
  const { data } = await adminHost.delete(`admin/delete/recommend/${id}`);
  return data;
}

export async function createTag(name: string) {
  const { data } = await adminHost.post("admin/create/tag/", {
    name,
  });
  return data;
}

export async function deleteTag(id: number) {
  const { data } = await adminHost.delete(`admin/delete/tag/${id}`);
  return data;
}

export async function updateTag(id: number, name: string) {
  const { data } = await adminHost.post("admin/update/tag/", {
    id,
    name,
  });
  return data;
}

export async function createGuide(name: string, image: File) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  const { data } = await adminHost.post("admin/create/guide/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function deleteGuide(id: number) {
  const { data } = await adminHost.delete(`admin/delete/guide/${id}`);
  return data;
}

export async function updateGuide(
  id: number,
  name: string,
  image: File | undefined,
) {
  const formData = new FormData();
  formData.append("id", String(id));
  if (name) {
    formData.append("name", name);
  }
  if (image) {
    formData.append("image", image);
  }
  const { data } = await adminHost.post("admin/update/guide/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function createSight(
  name: string,
  description: string,
  price: string,
  distance: string,
  tagIds: number[],
  image: File,
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("distance", distance);
  tagIds.forEach((item) => {
    formData.append("tagIds", String(item));
  });
  formData.append("image", image);
  const { data } = await adminHost.post("admin/create/sight/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function deleteSight(id: number) {
  const { data } = await adminHost.delete(`admin/delete/sight/${id}`);
  return data;
}

export async function updateSight(
  id: number,
  name: string,
  description: string,
  price: string,
  distance: string,
  tagIds: number[],
  image: File | undefined,
) {
  const formData = new FormData();
  formData.append("id", String(id));
  if (name) {
    formData.append("name", name);
  }
  if (description) {
    formData.append("description", description);
  }
  if (price) {
    formData.append("price", price);
  }
  if (distance) {
    formData.append("distance", distance);
  }
  if (tagIds.length > 0) {
    tagIds.forEach((item) => {
      formData.append("tagIds", String(item));
    });
  }
  if (image) {
    formData.append("image", image);
  }
  const { data } = await adminHost.post("admin/update/sight/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function createCity(
  country: string,
  name: string,
  lat: string,
  lon: string,
  sightIds: number[],
  guideIds: number[],
  image: File,
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("country", country);
  formData.append("lat", lat);
  formData.append("lon", lon);
  sightIds.forEach((item) => {
    formData.append("sightIds", String(item));
  });
  guideIds.forEach((item) => {
    formData.append("guideIds", String(item));
  });
  formData.append("image", image);
  const { data } = await adminHost.post("admin/create/city/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function deleteCity(id: number) {
  const { data } = await adminHost.delete(`admin/delete/city/${id}`);
  return data;
}

export async function updateCity(
  id: number,
  country: string,
  name: string,
  lat: string,
  lon: string,
  sightIds: number[],
  guideIds: number[],
  image: File | undefined,
) {
  const formData = new FormData();
  formData.append("id", String(id));
  if (name) {
    formData.append("name", name);
  }
  if (country) {
    formData.append("country", country);
  }
  if (lat) {
    formData.append("lat", lat);
  }
  if (lon) {
    formData.append("lon", lon);
  }
  if (sightIds.length > 0) {
    sightIds.forEach((item) => {
      formData.append("sightIds", String(item));
    });
  }
  if (guideIds.length > 0) {
    guideIds.forEach((item) => {
      formData.append("guideIds", String(item));
    });
  }
  if (image) {
    formData.append("image", image);
  }
  const { data } = await adminHost.post("admin/update/city/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
