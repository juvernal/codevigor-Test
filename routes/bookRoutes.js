const express = require("express");
const controller = require("../controllers/bookController");

const router = express.Router();

//route to get the list off all books
router.get("/getAll", controller.getAll);

//route to get the book by id
router.get("/get/:id", controller.get);

//route to save a new book
router.post("/save", controller.save);

//route to update a book by id
router.put("/update/:id", controller.update);

//route to delete a book
router.delete("/delete/:id", controller.del);

module.exports = router;
