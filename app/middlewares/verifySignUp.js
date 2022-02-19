const User = require('../models/User');
const bcrypt = require("bcryptjs");

let checkDuplicateUsernameFactory = (usernameFieldToCheck) => ((req, res, next) => {
    User.findOne({userName: req.body[usernameFieldToCheck]}).exec((err, user) => {
        if (err){
            res.status(500).send({message: err});
            return;
        }
        if (user){
            res.status(400).send({message: "Failed! Username is already in use!"});
            return;
        }
        next();
    });
})

let checkPasswordLength = (req, res, next) => {
    if (req.body.password.length < 8){
        res.status(500).send({message: "Password too short!"});
            return;
    }

    if (req.body.password.length > 40){
        res.status(500).send({message: "Password too long!"});
            return;
    }
    next();
};

let checkDuplicateUsername = checkDuplicateUsernameFactory("userName");
let checkDuplicateUserNameOnUserNameChange = checkDuplicateUsernameFactory("newUserName")

let hashPassword = (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    next()
}

const verifySignUp = {
    checkDuplicateUsername,
    checkDuplicateUserNameOnUserNameChange,
    hashPassword,
    checkPasswordLength
};

module.exports = verifySignUp