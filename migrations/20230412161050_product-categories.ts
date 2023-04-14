import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("product_categories", function (table) {
    table.integer("product_id").unsigned().notNullable();
    table.integer("category_id").unsigned().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("product_categories");
}
