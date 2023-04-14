import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("attributes_variant", function (table) {
    table.integer("attributes_id").unsigned().notNullable();
    table.string("variant_name").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("attributes_variant");
}
