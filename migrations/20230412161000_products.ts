import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("products", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.string("image_url").notNullable();
    table.enu("status", ["active", "inactive"]).notNullable();
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("products");
}
