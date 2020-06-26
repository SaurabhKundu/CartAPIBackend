const helmetType = require('./model/Helmet.js').helmetType;
const helmetColor = require('./model/Helmet.js').helmetColor;
const helmetSize = require('./model/Helmet.js').helmetSize;
const jacketType = require('./model/Jacket.js').jacketType;
const jacketSize = require('./model/Jacket.js').jacketSize;
const jacketColor = require('./model/Jacket.js').jacketColor;

exports.validateProduct = (request) => {
    productType = request.body.productType;
    if(productType == 'Helmet'){
        validateHelmetProduct(request.body);
    }
    if(productType == 'Jacket'){
        validateJacketProduct(request.body);
    }
};

function validateHelmetProduct(requestBody) {
    if(requestBody.helmets.color != helmetColor.BLUE
        && requestBody.helmets.color == helmetColor.GREEN)
        throw new Error("Invalid helmet color...valid colors are: blue, green");

    if(requestBody.helmets.type != helmetType.MILITARY
        && requestBody.helmets.type != helmetType.NORMAL)
        throw new Error("Invalid helmet type...valid types are: military, normal");

    if(requestBody.helmets.size != helmetSize.XL
        && requestBody.helmets.size != helmetSize.L
        && requestBody.helmets.size != helmetSize.M)
        throw new Error("Invalid helmet size...valid sizes are: medium, large, extralarge");
}

function validateJacketProduct(requestBody) {
    if(requestBody.jackets.color != jacketColor.BLUE
        && requestBody.jackets.color != jacketColor.GREEN)
        throw new Error("Invalid jacket color...valid colors are: blue, green");

    if(requestBody.jackets.type != jacketType.DENIM
        && requestBody.jackets.type != jacketType.BOMBER
        && requestBody.jackets.type != jacketType.NORMAL)
        throw new Error("Invalid Jacket type...valid types are: deni, bomber, normal");

    if(requestBody.jackets.size != helmetSize.XL
        && requestBody.jackets.size != jacketSize.L
        && requestBody.jackets.size != jacketSize.M)
        throw new Error("Invalid Jacket size...valid sizes are: medium, large,, extraLarge");
}