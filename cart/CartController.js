const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cartService = require('./CartService.js');
const cartRouter = express.Router();
const auth = require('../config/auth');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/* app services starts */

//Gives app details
cartRouter.get('/', auth, cartService.getAppDetails);

/* app services ends */

/* product services starts */

//add produts to Db
cartRouter.post('/products', auth, cartService.addProductToDb);

//delete  products by id
cartRouter.delete('/products/:productId', auth, async (request, response) => {
    let data = cartService.deleteProductById(request);
    data.then(response.status(204).send("Product deleted..."))
    .catch(error => {
        console.log(error.message);
        response.status(500).send("<h2>Something went bad...</h2>");
    });
});
//get all products from Db
cartRouter.get('/products', auth, async (request, response) => {
    let allProducts = cartService.getAllProductsFromDb();
    allProducts.then(products => {
        console.log(products);
        response.status(200).send(products);
    })
    .catch(error => {
        console.log(error.message);
        response.status(500).send("<h2>Something went bad...</h2>");
    });
});

//app.put('/products/{productId}', cartService.updateProduct);

/* app services ends */

/* cart services starts */

//add products to cart, cart will contain only productIds
cartRouter.post('/cart/:productId', auth, cartService.addProductToCart);

//Gets all products from cart
cartRouter.get('/cart', auth, async (request, response) => {
    let cartDetails = cartService.getAllProductsInCart(request, response);
    cartDetails.then(cartItems => response.status(200).send(cartItems))
    .catch(error => {
        console.log(error.message);
        response.status(500).send("<h2>Something went bad...</h2>");
    });
});

//delete product from cart
cartRouter.delete('/cart/:productId', auth, async(request, response) => {
    let deletedProduct = cartService.deleteProductFromCart(request);
    deletedProduct.then(response.status(204).send("<h3>Item removed from cart</h3>"))
    .catch(error => {
        console.log(error.message);
        response.status(500).send("<h2>Something went bad...</h2>");
    });
});

//calculate total cost of products in cart
cartRouter.get('/cart/total', auth, async(request, response) => {
    let cartTotal = cartService.getTotalCartCost();
    cartTotal.then(totalCost => response.status(200).send("<h1>Total Cost : </h1>" + totalCost))
    .catch(error => {
        console.log(error.message);
        response.status(500).send("<h2>Something went bad...</h2>");
    });
});

/* cart services ends */

exports.cartRouter = cartRouter;