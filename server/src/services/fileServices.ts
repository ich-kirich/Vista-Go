import { JsonDB, Config } from "node-json-db";
import DATA from "../libs/constants";

async function generateDb() {
  const db = new JsonDB(new Config("myDataBase", true, false, "/"));
  db.push("/cities[]", DATA);
  return db;
}

export default generateDb;
