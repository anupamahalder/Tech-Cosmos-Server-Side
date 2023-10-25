const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5033;

// middleware 
app.use(cors());
app.use(express.json());

// create a root route 
app.get('/',(req, res)=>{
  res.send('Tech cosmos server is running...');
})

app.listen(port, ()=>{
  console.log(`Server is running on PORT:${port}`);
})

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rvmau43.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // ---------------create collection -----------------

    // giving the collection name in which we will perform operation 
    const myBrandCollection = client.db('brandDB').collection('brand');
    // create google brand collection 
    const googleBrandCollection = client.db('brandDB').collection('googleBrand');
    // create canon brand collection 
    const canonBrandCollection = client.db('brandDB').collection('canonBrand');
    // create sony brand collection 
    const sonyBrandCollection = client.db('brandDB').collection('sonyBrand');
    // create microsoft brand collection 
    const microsoftBrandCollection = client.db('brandDB').collection('microsoftBrand');
    // create lg electronics brand collection 
    const lgelectronicsBrandCollection = client.db('brandDB').collection('lgelectronicsBrand');
    // create apple brand collection 
    const appleBrandCollection = client.db('brandDB').collection('appleBrand');
    // create intel brand collection 
    const intelBrandCollection = client.db('brandDB').collection('intelBrand');
    // create samsung brand collection 
    const samsungBrandCollection = client.db('brandDB').collection('samsungBrand');
    // create dell brand collection 
    const dellBrandCollection = client.db('brandDB').collection('dellBrand');
    // create collection for my cart data 
    const myCartCollection = client.db('brandDB').collection('myCartData');
    // create collection for brands advertisement 
    const brandAdvertisementCollection = client.db('brandDB').collection('brandAdvertisement');

    // -------------------Read data from database -----------------------

    // read data of google brand 
    app.get('/brands/google', async(req, res)=>{
      const cursor = googleBrandCollection.find();
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    })
    // read data of canon brand 
    app.get('/brands/canon', async(req, res)=>{
      const cursor = canonBrandCollection.find();
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    })
    // read data of samsung brand 
    app.get('/brands/samsung', async(req, res)=>{
      const cursor = samsungBrandCollection.find();
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    })
    // read data of lgelectronics brand 
    app.get('/brands/lgelectronics', async(req, res)=>{
      const cursor = lgelectronicsBrandCollection.find();
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    })
    // read data of dell brand 
    // app.get('/brands/dell', async(req, res)=>{
    //   const cursor = dellBrandCollection.find();
    //   const result = await cursor.toArray();
    //   // console.log(result);
    //   res.send(result);
    // })
    // read data of apple brand 
    app.get('/brands/apple', async(req, res)=>{
      const cursor = appleBrandCollection.find();
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    })
    // read data of microsoft brand 
    app.get('/brands/microsoft', async(req, res)=>{
      const cursor = microsoftBrandCollection.find();
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    })
    // read data of sony brand 
    app.get('/brands/sony', async(req, res)=>{
      const cursor = sonyBrandCollection.find();
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    })
    // read data of intel brand 
    app.get('/brands/intel', async(req, res)=>{
      const cursor = intelBrandCollection.find();
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    })
    // display data to the client from user
    app.get('/brands', async(req, res)=>{
      const cursor = myBrandCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    // ------------Display data from brands using id ---------------

    // display one specific data item with id of google product
    app.get('/products/google/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await googleBrandCollection.findOne(query);
      res.send(result);
    })
    // display one specific data item with id of sony product
    app.get('/products/sony/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await sonyBrandCollection.findOne(query);
      res.send(result);
    })
    // display one specific data item with id of samsung product
    app.get('/products/samsung/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await samsungBrandCollection.findOne(query);
      res.send(result);
    })
    // display one specific data item with id of dell product
    app.get('/products/dell/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await dellBrandCollection.findOne(query);
      res.send(result);
    })
    // display one specific data item with id of microsoft product
    app.get('/products/microsoft/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await microsoftBrandCollection.findOne(query);
      res.send(result);
    })
    // display one specific data item with id of lgelectronics product
    app.get('/products/lgelectronics/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await lgelectronicsBrandCollection.findOne(query);
      res.send(result);
    })
    // display one specific data item with id of canon product
    app.get('/products/canon/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await canonBrandCollection.findOne(query);
      res.send(result);
    })
    // display one specific data item with id of intel product
    app.get('/products/intel/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await intelBrandCollection.findOne(query);
      res.send(result);
    })
    // display one specific data item with id of microsoft product
    app.get('/products/microsoft/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await microsoftBrandCollection.findOne(query);
      res.send(result);
    })
    // display one specific data item with id of apple product
    app.get('/products/apple/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await appleBrandCollection.findOne(query);
      res.send(result);
    })
    // display one specific data item with id of dell product
    app.get('/products/dell/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await dellBrandCollection.findOne(query);
      res.send(result);
    })
    // ---------------Insert data for add to cart in myCartData collection --------

    app.post('/mycart',async(req, res)=>{
      const newData = req.body;
      const result = await myCartCollection.insertOne(newData);
      res.send(result);
    })

    // ------------------Read all data from my cart data ----------------------------
    app.get('/mycart', async(req, res)=>{
      const cursor = myCartCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    // ---------------------Read one specific data from my cart----------------------
    app.get('/mycart/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: id};
      const result = await myCartCollection.findOne(query);
      // console.log(result);
      res.send(result);
    })

    //------------- create delete api to delete one time from mycart --------------------
    app.delete('/mycart/:id',async(req, res)=>{
      const id = req.params.id;
      const query = {_id: id};
      const result = await myCartCollection.deleteOne(query);
      res.send(result);
    })
    // ----------------Read All data from brands advertisement ----------------
    app.get('/brands/advertisement', async(req, res)=>{
      const cursor = brandAdvertisementCollection.find();
      const result = await cursor.toArray();
      res.send(result); 
    })
    // ----------------Read specific data from brands advertisement ----------------
    app.get('/brands/advertisement/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {brand: id};
      console.log(id);
      const result = await brandAdvertisementCollection.findOne(query);
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



