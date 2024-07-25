import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {user} from './models/user.js'
import mongoose from 'mongoose'
await mongoose.connect('mongodb://localhost:27017/')
const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json())
app.post('/signup',(req,res)=>{
    console.log(req.body)
    const NewUser=new user({username:req.body.username,password:req.body.password,loggedIn:false});
    user.insertMany([NewUser])
})

app.post('/login',async (req,res)=>{
  // let currentUser=await user.findOne({username:req.body.username});
  // if(currentUser && currentUser.password===req.body.password){
  //   currentUser.loggedIn=true;
  // }
  try {
    let currentUser = await user.findOne({ username: req.body.username });
    if (currentUser && currentUser.password === req.body.password) {
        currentUser.loggedIn = true;
        await currentUser.save(); // Ensure changes are saved to the database
        res.status(200).send({ message: 'Login successful' });
    } else {
        res.status(401).send('Invalid username or password');
    }
} catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error');
}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})     