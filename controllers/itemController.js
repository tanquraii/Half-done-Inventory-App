const Item = require("../models/item");
const Category = require("../models/category");
const ItemInstance = require("../models/itemInstance");
const { DateTime } = require("luxon");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)
  const [
    numItems,
    numItemInstances,
    numAvailableItemInstances,
    numCategory,
  ] = await Promise.all([
    Item.countDocuments({}).exec(),
    ItemInstance.countDocuments({}).exec(),
    ItemInstance.countDocuments({ status: "Available" }).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Local Inventory Home",
    item_count: numItems,
    item_instance_count: numItemInstances,
    item_instance_available_count: numAvailableItemInstances,
    category_count: numCategory,
  });
});


// Display list of all books.
exports.item_list = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({})
      .sort({ title: 1 })
      .populate("")
      .exec();
  
    res.render("item_list", { title: "Item List", item_list: allItems });
  });
  

// Display detail page for a specific book.
exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
});

// Display book create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create GET");
});

// Handle book create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create POST");
});

// Display book delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update POST");
});

