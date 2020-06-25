const Helmet = require('./model/Helmet.js');
const Jacket = require('./model/Jacket.js');
const Gloves = require('./model/Gloves.js');
const Product = require('./model/Product.js');
const Cart = require('./model/Cart.js');
const productValidator = require('./ProductValidator.js');


let getAllProductsInCart = async function(request, response) {
    let cartProducts = await Cart.find();
    const productsInCart = await Promise
    .all(cartProducts.map(cartProduct => Product
        .findOne({_id: cartProduct.productId})));
    return productsInCart;
};

exports.getAppDetails = (request, response) => {
    response.status(200).send("<h1>Cart is ready....<h1>");
};

exports.addProductToDb = (request, response) => {
    let helmetObj = null;
    let jacketObj = null;
    let type = request.body.productType;
    if(type == 'Helmet'){
        helmetObj = getHelmetObj(request);
    }else if(type == 'Jacket'){
        jacketObj = getJacketObj(request);
    }
    const productObj = new Product({
        productType: type,
        helmet: helmetObj,
        jacket: jacketObj
    });
    productObj.save().then(data => {
        console.log(data);
        response.status(201).send(data);
    }).catch(error => {
        console.log(error.message);
        response.status(500).send("<h2>Something went bad...</h2>")
    });
};

function getJacketObj(request){
    productValidator.validateProduct(request);
    return new Jacket({
        type: request.body.jackets.type,
        color: request.body.jackets.color,
        size: request.body.jackets.size,
        price: request.body.jackets.price
    });
}

function getHelmetObj(request){
    productValidator.validateProduct(request);
    return new Helmet({
        color: request.body.helmets.color,
        type: request.body.helmets.type,
        size: request.body.helmets.size,
        price: request.body.helmets.price
    });
}

exports.addProductToCart = (request, response) => {
    const cartObj = new Cart({
        productId: request.params.productId
    });
    cartObj.save()
    .catch(error => console.log(error.message || "Something went wrong..."))
    .then(data => {
        console.log(data);
        response.status(201).send(data)
    });
};

let deleteProductById = async (request) => {
    let productId = request.params.productId;
    let data =  await Product.findOneAndDelete({_id: productId});
    return data;
};

let getAllProductsFromDb = async() => {
    let products = await Product.find();
    return products;
};

let getTotalCartCost = async () => {
    let cartProducts = await Cart.find();
    const productDetailsInCart = await Promise
    .all(cartProducts.map(cartProduct => Product
        .findOne({_id: cartProduct.productId})));

    console.log(productDetailsInCart);
    let cost = 0;
    let totalCost = await Promise.all(productDetailsInCart.map(product => {
        if(product != null){
        if(product.productType == 'Helmet'){
            cost = cost + product.helmet.price;
        }else if(product.productType == 'Jacket'){
            cost = cost + product.jacket.price;
        }
    }}));
    return cost;
}

let deleteProductFromCart = async(request) => {
    let productId = request.params.productId;
    let deletedProduct = await Product.findOneAndDelete({_id: productId});
    return deletedProduct;
};

module.exports.deleteProductFromCart = deleteProductFromCart;
module.exports.getTotalCartCost = getTotalCartCost;
module.exports.getAllProductsFromDb = getAllProductsFromDb;
module.exports.deleteProductById = deleteProductById;
module.exports.getAllProductsInCart = getAllProductsInCart;