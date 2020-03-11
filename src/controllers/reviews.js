const spirit = require('../models/Spirit');

module.exports = {
    create
};

function create(req, res) {
    spirit.findById(req.params.id, function(err, Spirit) {
        Spirit.reviews.push(req.body.reviews);
        Spirit.save(function(err) {
            res.redirect(`/Spirit/${Spirit._id}`);
        });
    });

}