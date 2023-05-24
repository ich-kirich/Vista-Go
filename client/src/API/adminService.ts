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
