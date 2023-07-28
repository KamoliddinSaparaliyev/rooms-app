import db from "../../db/index.js";

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 1;
const DEFAULT_SORT_BY = "FLOOR";
const DEFAULT_SORT_ORDER = "desc";

export const listRooms = async ({
  q,
  filters: { floor, for_stuff } = {},
  page: { offset = DEFAULT_OFFSET, limit = DEFAULT_LIMIT } = {},
  sort: { by = DEFAULT_SORT_BY, order = DEFAULT_SORT_ORDER } = {},
}) => {
  try {
    let query = db("rooms").select("*");

    if (floor) query = query.where({ floor });

    if (typeof for_stuff === "boolean") query = query.where({ for_stuff });

    if (q) {
      query = query.whereILike("name", `%${q}%`);
    }
    const total = await query;
    query = query
      .orderBy(by.toLocaleLowerCase(), order)
      .limit(limit)
      .offset(offset);

    const rooms = await query;

    return {
      list: rooms,
      offset,
      limit,
      total: total.length,
    };
  } catch (error) {
    throw new Error("Error:" + error);
  }
};
