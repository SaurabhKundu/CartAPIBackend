var mongoose = require('mongoose');

const helmetType = {
    NORMAL: 'normal',
    MILITARY: 'military'
};

const helmetColor = {
    BLUE: 'blue',
    GREEN: 'green'
};

const helmetSize = {
    M: 'medium',
    L: 'large',
    XL: 'extraLarge'
};

var helmetSchema = mongoose.Schema({
    color: String,
    type: String,
    size: String,
    price: Number
});

module.exports = mongoose.model('Helmet', helmetSchema);
module.exports.helmetColor = helmetColor;
module.exports.helmetSize = helmetSize;
module.exports.helmetType = helmetType;