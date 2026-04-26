const router = require("express").Router();
const Book = require("../models/Book");

// CREATE
router.post("/", async (req, res) => {
  const book = new Book(req.body);
  const saved = await book.save();
  res.json(saved);
});

// READ
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// SEARCH
router.get("/search", async (req, res) => {
  const q = req.query.q;

  const books = await Book.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { author: { $regex: q, $options: "i" } },
      { year: Number(q) || 0 }
    ]
  });

  res.json(books);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;