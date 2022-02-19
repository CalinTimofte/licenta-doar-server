const mongoose = require("mongoose");
const { Schema } = mongoose;

// Password is in plaintext for now but it will be changed later
const userSchema = new Schema({
    userName: {type: String, required: true, maxLength: 40, minlength: 5},
    password: {type: String, required: true},
    priviledge: {type: Number, required: true}
});

module.exports = mongoose.model("User", userSchema);