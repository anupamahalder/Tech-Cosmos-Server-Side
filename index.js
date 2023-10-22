const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5050;

// middleware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rvmau43.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const user = {
  name:'Anupama Halder',
  brand: 'Google',
  age: '25',
  address: '123 AS Road'
}
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // giving the collection name in which we will perform operation 
    const myBrandCollection = client.db('brandDB').collection('brand');

    // insert data to the collection and give a callback function and a parameter
    app.post('/user', async(req, res)=>{
      const result = myBrandCollection.insertOne(user);
      console.log(result);
      res.send(result);
    })
    // display data to the client from user
    app.get('/user', async(req, res)=>{
      const cursor = myBrandCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// create a root route 
app.get('/',(req, res)=>{
    res.send('Tech cosmos server is running...');
})

app.listen(port, ()=>{
    console.log(`Server is running on PORT:${port}`);
})
