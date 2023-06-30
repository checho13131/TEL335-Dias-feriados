const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');


const createToken = (_id) =>{
    return jwt.sign({_id}, 'JustAsANExampleThisGoesInEnvironmentVariables', {expiresIn: '3d'})
}


//login
router.post('/login', async (req, res) =>{

    const {email, password} = req.body;

    try{
        const user = await User.login(email, password)

        //Create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})

    }catch(error){
        
        res.status(400).json({error: error.message})
    }
    
});

//signup
router.post('/signup', async (req, res) =>{
    const {name, username, email, password} = req.body;

    try{
        const user = await User.signup(name, username, email, password)

        //Create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})

    }catch(error){
        
        res.status(400).json({error: error.message})
    }


    
});

module.exports = router;