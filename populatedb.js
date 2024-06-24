#!/usr/bin/env node

console.log(
    'This script populates some test items, categories, and item instances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Item = require("./models/item");
  const Category = require("./models/category");
  const ItemInstance = require("./models/itemInstance");
  
  const categories = [];
  const items = [];
  const iteminstances = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    await createItemInstances();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // categories[0] will always be the first category, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function categoryCreate(index, name) {
    const category = new Category({ name: name });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function itemCreate(index, name, description, isbn, category) {
    const itemdetail = {
      name: name,
      description: description,
      isbn: isbn,
    };
    if (category != false) itemdetail.category = category;
  
    const item = new Item(itemdetail);
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
  }
  
  async function itemInstanceCreate(index, item, imprint, due_back, status) {
    const iteminstancedetail = {
      item: item,
      imprint: imprint,
    };
    if (due_back != false) iteminstancedetail.due_back = due_back;
    if (status != false) iteminstancedetail.status = status;
  
    const iteminstance = new ItemInstance(iteminstancedetail);
    await iteminstance.save();
    iteminstances[index] = iteminstance;
    console.log(`Added item instance: ${imprint}`);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Household"),
      categoryCreate(1, "Farm tools"),
      categoryCreate(2, "Toys"),
    ]);
  }
  
  async function createItems() {
    console.log("Adding items");
    await Promise.all([
      itemCreate(
        0,
        "Sofa",
        "It is yellowish,but smells funny",
        "9781473211896",
        [categories[0]]
      ),
      itemCreate(
        1,
        "Half broken TV",
        "You can watch Cartoon Network on it",
        "9788401352836",
        [categories[0]]
      ),
      itemCreate(
        2,
        "Old Table",
        "The white spots are from milk, I swear",
        "9780756411336",
        [categories[0]]
      ),
      itemCreate(
        3,
        "Rusty Saw",
        "Stick it to your head and be silly",
        "9780765379528",
        [categories[1]]
      ),
      itemCreate(
        4,
        "A hammer",
        "Do not swing too wide, the head will fly away and break someone's swimming pool",
        "9780765379504",
        [categories[1]]
      ),
      itemCreate(
        5,
        "Test Item 1",
        "Summary of test item 1",
        "ISBN111111",
        [categories[0], categories[1]]
      ),
      itemCreate(
        6,
        "Test Item 2",
        "Summary of test item 2",
        "ISBN222222",
        false
      ),
    ]);
  }
  
  async function createItemInstances() {
    console.log("Adding item instances");
    await Promise.all([
      itemInstanceCreate(0, items[0], "London Gollancz, 2014.", false, "Available"),
      itemInstanceCreate(1, items[1], " Gollancz, 2011.", false, "Loaned"),
      itemInstanceCreate(2, items[2], " Gollancz, 2015.", false, false),
      itemInstanceCreate(
        3,
        items[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      itemInstanceCreate(
        4,
        items[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      itemInstanceCreate(
        5,
        items[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      itemInstanceCreate(
        6,
        items[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Available"
      ),
      itemInstanceCreate(
        7,
        items[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Maintenance"
      ),
      itemInstanceCreate(
        8,
        items[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Loaned"
      ),
      itemInstanceCreate(9, items[0], "Imprint XXX2", false, false),
      itemInstanceCreate(10, items[1], "Imprint XXX3", false, false),
    ]);
  }
  