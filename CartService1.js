const Helmet = require('./model/Helmet.js');
const Jacket = require('./model/Jacket.js');
const Gloves = require('./model/Gloves.js');
const Product = require('./model/Product.js');
const Cart = require('./model/Cart.js');


let getAllProductsInCart = async function(request, response) {
    let cartProducts = await Cart.find();
    const productsInCart = await Promise.all(cartProducts.map(cartProduct => Product.findOne({_id: cartProduct.productId})));
    response.status(200).send(productsInCart);
};

exports.getAppDetails = (request, response) => {
    response.status(200).send("<h1>Cart is ready....<h1>");
};

exports.addProductByType = (request, response) => {
    if(request.body.productType == 'Helmet'){
        const helmetObj = new Helmet({
            color: request.body.helmets.color,
            type: request.body.helmets.type,
            size: request.body.helmets.size,
            price: request.body.helmets.price
        });
        helmetObj.save().then(data => {
            console.log(data);
            response.status(201).send(data)
        })
        .catch(error => error.message || "Something went wrong...");
    }
};

exports.addProductToCart = (request, response) => {
    const cartObj = new Cart({
        productId: request.body.productId
    });
    cartObj.save()
    .catch(error => console.log(error.message || "Something went wrong..."))
    .then(data => {
        console.log(data);
        response.status(201).send(data)
    });
};

module.exports.getAllProductsInCart = getAllProductsInCart;