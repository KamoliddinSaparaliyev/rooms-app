import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const removeRoom = async ({ id }) => {
  return db.transaction(async (trx) => {
    const room = await trx("rooms").where({ id }).first();

    if (!room) {
      throw new NotFoundError("Xona topilmadi.");
    }

    const [deletedId] = await trx("rooms").where({ id }).del().returning("id");

    return deletedId;
  });
};
