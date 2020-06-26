const express = require('express');
const { User, validate } = require('./User');
const bcrypt = require('bcrypt');
const auth = require('../config/auth');
const router = express.Router();


router.get('/current-user', auth, async(req, res) => {
    const user = await User.findById(req.user._id);
    console.log(user);
    res.status(200).send(user);
});


router.post('/', async(request, response) => {

    const { error } = validate(request.body);
    if(error) response.status(400).send(error.details[0].message);

    let user = await User.findOne({email: request.body.email});
    if(user) response.status(400).send("User already exist");

    user = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    });

    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    const token = user.generateAuthToken();

    response.status(200).header("x-auth-token", token).send({
        userId: user._id,
        name: user.name,
        email: user.email,
    });
});

exports.router = router;