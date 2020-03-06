const spiritsCtrl = {};

// Models
const Spirit = require("../models/Spirit");

spiritsCtrl.renderSpiritForm = (req, res) => {
    res.render("spirits/new-spirit");
};

spiritsCtrl.createNewSpirit = async(req, res) => {
    const { brand, maker, barcode } = req.body;
    const errors = [];
    if (!brand) {
        errors.push({ text: "What's the brand." });
    }
    if (!maker) {
        errors.push({ text: "Description???" });
    }
    if (!barcode) {
        errors.push({ text: "Barcode???" });
    }
    if (errors.length > 0) {
        res.render("spirits/new-spirit", {
            errors,
            brand,
            maker,
            barcode
        });
    } else {
        const newSpirit = new Spirit({ brand, maker, barcode });
        newSpirit.user = req.user.id;
        await newSpirit.save();
        req.flash("success_msg", "Catalog Added");
        res.redirect("/spirits");
    }
};

spiritsCtrl.renderSpirits = async(req, res) => {
    const spirits = await Spirit.find({ user: req.user.id }).sort({ date: "desc" });
    res.render("spirits/all-spirits", { spirits });
};

spiritsCtrl.renderEditForm = async(req, res) => {
    const spirit = await Spirit.findById(req.params.id);
    if (spirit.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/spirits");
    }
    res.render("spirits/edit-spirit", { spirit });
};

spiritsCtrl.updateSpirit = async(req, res) => {
    const { brand, maker, barcode } = req.body;
    await Spirit.findByIdAndUpdate(req.params.id, { brand, maker, barcode });
    req.flash("success_msg", "Catalog Updated");
    res.redirect("/spirits");
};

spiritsCtrl.deleteSpirit = async(req, res) => {
    await Spirit.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Catalog Deleted");
    res.redirect("/spirits");
};

module.exports = spiritsCtrl;