const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/profile
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// PUT /api/profile
router.put(
    "/",
    auth,
    [
        body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const updates = {};
            if (req.body.name) updates.name = req.body.name;
            const user = await User.findByIdAndUpdate(req.user.id, updates, {
                new: true,
            }).select("-password");
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

module.exports = router;
