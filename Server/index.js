const express = require('express');
const mongoose = require('mongoose');
const Access = require('./Schema/Access');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.listen(4000, () => {
    console.log(`Server Started at ${4000}`)
})

require('dotenv').config();
const mongoString = process.env.MONGO
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// get all pending request
app.post('/getPending',async(req,res) => {
    try{
        const data = await Access.find({requested: req.body.requested});
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

});
// write pending request
app.post('/writePending',async(req,res) => {
    const access = new Access({
        requester: req.body.requester,
        requested: req.body.requested,
    })
    try{
        const newAccess = await access.save();
        res.status(201).json(newAccess)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
// access grant
app.put('/grant',async(req,res) => {
    const filter = { requester: req.body.requester, requested: req.body.requested };
    const update = { $set: { access: true } };
    // Update the document
    try{
        const result = await Access.updateOne(filter, update);
        if(await result.modifiedCount === 1){
        res.status(201).json("update success")
        
    }
        else{
            res.status(400).json("update failed")
        }
    }catch(error){
        res.status(400).json({message: error.message})
    }
})
// revoke access

app.delete('/revoke',async(req,res) => {
    const filter = { requester: req.body.requester, requested: req.body.requested };

    // Update the document
    try{
        const result = await Access.deleteOne(filter);
        if(await result.deletedCount === 1){
        res.status(201).json("access revoke success")}
        else{
            res.status(400).json("access revoke failed")
        }
    }catch(error){
        res.status(400).json({message: error.message})
    }
})
// update grant and revoke

app.post('/grantList',async(req,res) => {
    try{
        const data = await Access.find({requester: req.body.requester, access: true});
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})