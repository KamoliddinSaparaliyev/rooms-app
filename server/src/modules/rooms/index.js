import { readFileSync } from "fs";
import { join } from "path";
import { listRooms } from "./list-rooms.js";
import { showRoom } from "./show-room.js";
import { addRoom } from "./add-room.js";
import { editRoom } from "./edit-room.js";
import { removeRoom } from "./remove-room.js";

const resolvers = {
  Query: {
    rooms: (_, args) => {
      return listRooms({ ...args.input });
    },
    room: (_, args) => {
      return showRoom({ id: args.id });
    },
  },
  Mutation: {
    createRoom: async (_, args) => {
      const result = await addRoom({ ...args.input });

      return result;
    },
    updateRoom: (_, args) => {
      return editRoom({ id: args.id, ...args.input });
    },
    removeRoom: (_, args) => {
      return removeRoom({ id: args.id });
    },
  },
};

export default {
  typeDefs: readFileSync(
    join(process.cwd(), "src", "modules", "rooms", "_schema.gql"),
    "utf8"
  ),
  resolvers,
};
