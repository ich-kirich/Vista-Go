import { DATA, db } from "../libs/constants";

async function generateDb() {
  db.push("/cities", DATA);
  return db;
}

export default generateDb;
