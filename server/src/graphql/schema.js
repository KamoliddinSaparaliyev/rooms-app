import { makeExecutableSchema } from "@graphql-tools/schema";

// Modules
import roomsModul from "../modules/rooms/index.js";

export const schema = makeExecutableSchema({
  typeDefs: [roomsModul.typeDefs],
  resolvers: [roomsModul.resolvers],
});
