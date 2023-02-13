import e from "dbschema/edgeql-js";
import { createClient } from "edgedb";

export * from "dbschema/edgeql-js";
export * from "dbschema/interfaces";

const client = createClient();

export { client, e };
