const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UsersSchema = new Schema ({
    username: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = Users = mongoose.model("users", UsersSchema);