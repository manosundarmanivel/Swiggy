const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');

const app = express();
const cors = require("cors");
const e = require('express');
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: Array,
});
userSchema.methods.pullFromCart = function(itemId) {
  const index = this.cart.findIndex(item => item.id === itemId);
  if (index !== -1) {
    this.cart.splice(index, 1);
  }
};

const User = mongoose.model('User', userSchema);

mongoose
  .connect('mongodb://localhost:27017/Swiggy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(8000, () => {
      console.log('Server is running on http://localhost:8000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const document = {
    name:name,email:email,password:password,
  }
 try
 {
    const check = await User.findOne({email:email})
    if (check){
      console.log(check);
    res.json("exist")
    }
    else {
        res.json("not exist")
        await User.insertMany([document])
    }
 }
 catch {
    res.json("not exist")
 }
  
});

app.post('/login', async (req, res) => {
    const{email ,password}= req.body;

    try{
        const findEmail = await User.findOne({email:email})
        

        
        if(findEmail["password"]==password){
            
            res.json(findEmail)

        }
        else
        {
            res.json("not-found")
        }

    }
    catch{
        res.json("error in login")
    }
})

app.post('/addItems', async(req ,res)=>{
    const {val , email} = req.body
    const user = await User.findOne({email:email})
    if(user)
    {
        user.cart.push(val)
        await user.save();
    }
    else
    {
        console.log("Items Cannot be inserted")
    }

})

app.post('/removeItems', async(req,res)=>{

    const{id , email} = req.body
    const user = await User.findOne({email:email})
    if(user)
    {
      console.log(id)
        user.pullFromCart(id)
       
        await user.save();
        
    }
    
})

app.post('/getItems', async (req , res)=>{
    const {email} = req.body
    const user  = await User.findOne({email:email})
    if (user)
    {
        res.json(user.cart)
        
    }
    else
    {
        console.log("Error in fetching the data")
    }
})

