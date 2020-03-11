const express = require("express");
const router = express.Router();
const path = require("path");
//const Review = require("../controllers/reviews.js");

// Controller
const {
    renderSpiritForm,
    createNewSpirit,
    renderSpirits,
    renderEditForm,
    updateSpirit,
    deleteSpirit
} = require("../controllers/spirits.js");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Catalog
router.get("/spirits/add", isAuthenticated, renderSpiritForm);

router.post("/spirits/new-spirit", isAuthenticated, createNewSpirit);

// Get All Catalogs
router.get("/spirits", isAuthenticated, renderSpirits);

// Edit catalogs
router.get("/spirits/edit/:id", isAuthenticated, renderEditForm);

router.put("/spirits/edit-spirit/:id", isAuthenticated, updateSpirit);

//router.put("/")

// Delete catalogs
router.delete("/spirits/delete/:id", isAuthenticated, deleteSpirit);

module.exports = router;