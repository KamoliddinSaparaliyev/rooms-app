export const up = function (knex) {
  return knex.schema.createTable("rooms", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("floor").notNullable();
    table.boolean("for_stuff").notNullable().defaultTo(false);
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("rooms");
};
