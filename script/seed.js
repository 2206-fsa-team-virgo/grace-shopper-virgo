"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");
const axios = require("axios");

const emojiUrl =
  "https://emoji-api.com/emojis?access_key=d114e3a23dc50347b5d784a65d2cc1a7a7382bf4";

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: "cody@cody.com",
      password: "123",
      firstName: "Cody",
      lastName: "Davis",
    }),
    User.create({
      email: "murphy@irish.com",
      password: "123",
      firstName: "Mike",
      lastName: "Murphy",
    }),
    User.create({
      email: "evanbarden@gmail.com",
      password: "123",
      firstName: "Evan",
      lastName: "Barden",
      isAdmin: true,
    }),
    User.create({
      email: "danielyj98@gmail.com",
      password: "123",
      firstName: "Daniel",
      lastName: "Jacobson",
      isAdmin: true,
    }),
    User.create({
      email: "HarrisonJK@gmail.com",
      password: "123",
      firstName: "Harrison",
      lastName: "JK",
      isAdmin: true,
    }),
    User.create({
      email: "Kzkevin123@gmail.com",
      password: "123",
      firstName: "Kevin",
      lastName: "Zhang",
      isAdmin: true,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  const getEmoji = async () => {
    let res = await axios.get(emojiUrl);
    // .then(console.log);
    // console.log(res.data);
    return res;
  };

  console.log(await getEmoji());

  const products = await Promise.all([
    Product.create({
      name: "smiley",
      price: 10.5,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      quantity: 10,
    }),
    Product.create({
      name: "smiley wink",
      price: 9.5,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      quantity: 3,
    }),
    Product.create({
      name: "frown face",
      price: 11.5,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }),
    Product.create({
      name: "squinty smile",
      price: 5.5,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      quantity: 1,
    }),
  ]);

  console.log(`seeded ${products.length} responses`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
      evan: users[2],
      daniel: users[3],
      harrison: users[4],
      kevin: users[5],
    },
    products: products.length,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
