const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var url = 'mongodb://localhost:27017/cartservice';

module.exports = mongoose.connect(url, {useNewUrlParser: true}).then(() => console.log("Connection successfull.."))
.catch(error => {
    console.log(error.message || "something went wrong");
    process.exit();

});