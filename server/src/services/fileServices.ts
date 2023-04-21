import { DATA, db } from "../libs/constants";

async function generateDb() {
  db.push("/cities", DATA);
  db.push("/recommends", DATA);
  return db;
}

export default generateDb;
