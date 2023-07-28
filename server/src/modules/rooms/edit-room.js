import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const editRoom = async ({ id, ...changes }) => {
  const existing = await db("rooms").where({ id }).first();

  if (!existing) {
    throw new NotFoundError("Xona topilmadi.");
  }

  const result = await db("rooms")
    .where({ id })
    .update({ ...changes })
    .returning("*");

  return result[0];
};
