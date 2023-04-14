import knex from "knex";
import development from "../../knexfile";

const Knex = knex(development);
export default Knex;
