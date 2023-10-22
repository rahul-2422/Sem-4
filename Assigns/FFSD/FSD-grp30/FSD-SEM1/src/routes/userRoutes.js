const express = require('express');
const router = new express.Router();
const user = require("../models/users");

router.get('/',(req, res) => {
    res.send("")
})

router.post('/user', async(req, res) => {

    try {
        const User = new user(req.body)
        const saveUser = await User.save()
        res.status(200).send(saveUser)
    } catch (e) {
        res.status(500).send(e);
    }

})

router.get('/user', async(req, res)=>{

    try {
        
        const allUsers = await user.find();
        res.status(200).send(allUsers);
 
    } catch (e) {
        res.status(500).send(e);
    }

})

router.get('/user/:id', async(req, res)=>{

    try {
        
        const userId = req.params.id;
        const userFound  = await user.find({_id:userId});
        res.status(200).send(userFound);

    } catch (e) {
        res.status(500).send(e);
        
    }

})

router.get('/user/:name', async(req, res)=>{
    try {
        const Name = req.params.name;
        const userFound = await user.find({name: Name});
        res.status(200).send(userFound);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;