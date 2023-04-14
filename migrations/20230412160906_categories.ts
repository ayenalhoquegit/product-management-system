import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("categories", function (table) {
    table.increments("id").primary();
    table.integer("parent_id").nullable();
    table.string("name").notNullable();
    table.string("description").nullable();
    table.enu("status", ["active", "inactive"]).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("categories");
}
