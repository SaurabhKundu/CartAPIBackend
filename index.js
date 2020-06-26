const express = require('express');
const userRouter = require('./user/UserController').router;
const cartRouter = require('./cart/CartController').cartRouter;
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const dbConfig = require('./config/DatabaseConfig');
const expressOasGenerator = require('express-oas-generator');


app.use(bodyParser.urlencoded({
    extended: true
}));

expressOasGenerator.init(app, {});
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api", cartRouter);

app.listen(port, () => console.log('Server is up..please proceed...'));

