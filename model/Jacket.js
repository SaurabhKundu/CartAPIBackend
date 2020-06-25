var mongoose = require('mongoose');

const jacketType = {
    BOMBER: 'bomber',
    NORMAL: 'normal',
    DENIM: 'denim'
};

const jacketColor = {
    BLUE: 'blue',
    GREEN: 'green'
};

const jacketSize = {
    M: 'medium',
    L: 'large',
    XL: 'extraLarge'
};

const jacketSchema = mongoose.Schema({
    type: String,
    color: String,
    size: String,
    price: Number
});

module.exports = mongoose.model('Jacket', jacketSchema);
module.exports.jacketType = jacketType;
module.exports.jacketColor = jacketColor;
module.exports.jacketSize = jacketSize;