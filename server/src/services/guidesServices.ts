import Guide from "../../models/guide";

export async function findGuides() {
  const guides = await Guide.findAll();
  return guides;
}

export default findGuides;
