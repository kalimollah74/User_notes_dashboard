const express = require("express");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/notes?q=searchText
router.get("/", auth, async (req, res) => {
    const { q } = req.query;
    const query = { user: req.user.id };

    if (q) {
        query.$or = [
            { title: new RegExp(q, "i") },
            { content: new RegExp(q, "i") },
        ];
    }

    try {
        const notes = await Note.find(query).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// POST /api/notes
router.post(
    "/",
    auth,
    [body("title").notEmpty().withMessage("Title is required")],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const note = await Note.create({
                user: req.user.id,
                title: req.body.title,
                content: req.body.content || "",
            });
            res.status(201).json(note);
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

// PUT /api/notes/:id
router.put(
    "/:id",
    auth,
    [body("title").optional().notEmpty().withMessage("Title cannot be empty")],
    async (req, res) => {
        const { id } = req.params;
        const updates = { ...req.body };

        try {
            const note = await Note.findOneAndUpdate(
                { _id: id, user: req.user.id },
                updates,
                { new: true }
            );

            if (!note) return res.status(404).json({ message: "Note not found" });
            res.json(note);
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

// DELETE /api/notes/:id
router.delete("/:id", auth, async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findOneAndDelete({ _id: id, user: req.user.id });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
