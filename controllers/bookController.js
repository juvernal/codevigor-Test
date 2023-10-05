const Book = require("../models/Book");

//method to get the list of books
const getAll = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(error.code || 500).json(error);
  } finally {
    res.end();
  }
};

//return one book by the id
const get = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(error.code || 500).json(error);
  } finally {
    res.end();
  }
};

//save a new book
const save = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(error.code || 500).json(error);
  } finally {
    res.end();
  }
};

//update a book
const update = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(error.code || 500).json(error);
  } finally {
    res.end();
  }
};

//delete a book
const del = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(error.code || 500).json(error);
  } finally {
    res.end();
  }
};

module.exports = {
  getAll,
  get,
  save,
  update,
  del,
};
