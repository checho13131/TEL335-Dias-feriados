const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt')
const validator = require('validator')

const UserSchema = new Schema({
    name: {type: String, require: true},
    username: {type: String, require: true, unique : true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
});

//static signup
UserSchema.statics.signup = async function (name, username, email, password){

    //Validation
    
    if(!name || !username || !email || !password){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not  valid')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const verEmail = await this.findOne({email})
    const verUsername = await this.findOne({username})

    if (verEmail){
        throw Error("Email already in use")
    }
    if (verUsername){
        throw Error("Username already in use, please choose another one")
    }
    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({name, username, email, password: hash})

    return user
}

//Static login
UserSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})
    if (!user){
        throw Error("Incorrect email or password")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error("Incorrect email or password")
    }

    return user

}

module.exports = mongoose.model('User', UserSchema);