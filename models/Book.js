const mongoose = require("mongoose");

//define a model of book that will be store in mongo db
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
  },
});

Book = mongoose.model("book", bookSchema);
module.exports = Book;
