//@ts-ignore-all

import bcrypt from "bcryptjs";
import { client, e } from "~/db";

async function seed() {
  const email = "info@checkr.nl";
  const pass = "talkmate";
  const user = e.select(e.User, (u) => ({
    filter: e.op(u.email, "=", email),
  }));

  // cleanup the existing database
  await e.delete(user).run(client);

  // create password and user nestedly
  const hash = await bcrypt.hash(pass, 10);
  await e
    .insert(e.Password, {
      hash,
      user: e.insert(e.User, {
        email,
      }),
    })
    .run(client);

  // create notes
  await e
    .set(
      e.insert(e.Note, {
        title: "My first note",
        body: "Hello, world!",
        user,
      }),
      e.insert(e.Note, {
        title: "My second note",
        body: "Hello, world!",
        user,
      })
    )
    .run(client);

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    client.close();
  });
