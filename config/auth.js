const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(request, response, next) {

    const token = request.headers["x-access-token"] || request.headers["authorization"];

    if(!token) return response.status(400).send("Access denied, no token provided");

    try{
        const decodedToken = jwt.verify(token, config.get('myprivatekey'));
        request.user =decodedToken;
        next();
    }catch(ex){
        response.status(400).send("Access denied, invalid token provided");
    }
}; 