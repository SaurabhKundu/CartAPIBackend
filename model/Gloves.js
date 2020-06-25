var mongoose = require('mongoose');

const glovesType = {
    NORMAL: 'normal',
    MILITARY: 'military'
};

const glovesColor = {
    BLUE: 'blue',
    GREEN: 'green'
};

const glovesSize = {
    M: 'medium',
    L: 'large',
    XL: 'extraLarge'
};

const glovesSchema = mongoose.Schema({
    type: String,
    size: String,
    color: String,
    price: Number
});

module.exports = mongoose.model('Gloves', glovesSchema);
module.exports.glovesType = glovesType;
module.exports.glovesColor = glovesColor;
module.exports.glovesSize = glovesSize;