"use strict";

const {
  db,
  models: { User, Product, Order },
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
  console.log(`seeded users successfully`);

  const getEmoji = async () => {
    let res = await axios.get(emojiUrl);
    return res.data;
  };

  const emojiArray = await getEmoji();

  const productArray = emojiArray.map((emoji) => {
    Product.create({
      name: emoji.unicodeName,
      price: 2,
      desc: emoji.character,
      quantity: 10,
    });
  });

  const products = await Promise.all(productArray);

  // const products = await Promise.all([
  //   Product.create({
  //     name: "smiley",
  //     price: 10.5,
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     quantity: 10,
  //   }),
  // ]);

  console.log(`seeded ${products.length} products`);
  // console.log(products);
  console.log(`seeded products successfully`);

  const orders = await Promise.all([
    Order.create({
      status: "active",
    }),
    Order.create({
      status: "active",
    }),
    Order.create({
      status: "active",
    }),
    Order.create({
      status: "active",
    }),
    Order.create({
      status: "closed",
    }),
    Order.create({
      status: "closed",
    }),
    Order.create({
      status: "closed",
    }),
  ]);

  console.log(`seeded ${orders.length} orders`);
  // console.log(orders);
  console.log(`seeded orders successfully`);

  // associate orders with users
  orders[0].setUser(users[0]);
  orders[1].setUser(users[1]);
  orders[2].setUser(users[2]);
  orders[3].setUser(users[3]);
  orders[4].setUser(users[1]);
  orders[5].setUser(users[4]);
  orders[6].setUser(users[5]);

  // add some products to orders
  // console.log(products);
  // await products[0].addOrder(orders[0]);
  // await products[1].addOrder(orders[0]);
  // await products[2].addOrder(orders[0]);

  // await products[0].addOrder(orders[1]);
  // await products[3].addOrder(orders[1]);
  // await products[4].addOrder(orders[1]);

  // await products[5].addOrder(orders[2]);
  // await products[6].addOrder(orders[2]);
  // await products[7].addOrder(orders[2]);

  // await products[8].addOrder(orders[3]);
  // await products[6].addOrder(orders[3]);
  // await products[9].addOrder(orders[3]);

  // await products[10].addOrder(orders[4]);
  // await products[11].addOrder(orders[4]);
  // await products[12].addOrder(orders[4]);

  // await products[12].addOrder(orders[5]);
  // await products[13].addOrder(orders[5]);
  // await products[14].addOrder(orders[5]);

  // await products[15].addOrder(orders[6]);
  // await products[16].addOrder(orders[6]);
  // await products[14].addOrder(orders[6]);

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
    orders: {
      order1: orders[0],
      order2: orders[1],
      order3: orders[2],
      order4: orders[3],
      order5: orders[4],
      order6: orders[5],
      order7: orders[6],
    },
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
