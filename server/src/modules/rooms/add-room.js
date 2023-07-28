import db from "../../db/index.js";

export const addRoom = async (data) => {
  const result = await db("rooms").insert(data).returning("*");

  return result[0];
};
