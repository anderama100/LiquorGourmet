const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    content: String
}, {
    timestamps: true
});


const SpiritSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    maker: {
        type: String,
        required: true
    },
    barcode: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],

    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model("Spirit", SpiritSchema);