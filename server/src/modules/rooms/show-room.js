import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const showRoom = async ({ id }) => {
  const room = await db("rooms").where({ id }).first();

  if (!room) {
    throw new NotFoundError("Xona topilmadi.");
  }

  return room;
};
