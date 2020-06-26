const mongoose = require('mongoose');
const Jacket = require('./Jacket.js').schema;
const Gloves = require('./Gloves.js').schema;
const Helmet = require('./Helmet.js').schema;


const productSchema = mongoose.Schema({
    productType: String,
    jacket: Jacket,
    gloves: Gloves,
    helmet: Helmet
});

module.exports = mongoose.model('Product', productSchema);