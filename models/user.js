const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
});

//it automatically implements username salting hashing hash password. we do not need to make it
//it also implements methods like setpassword, authenticate etc
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);