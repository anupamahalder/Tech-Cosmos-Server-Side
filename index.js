const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5033;

// middleware 
// as server and client are at different location so we have to link them
app.use(cors({
  // origin can contain sigle value or array 
  origin: ['https://654bc9ff6091fc2327a62181--idyllic-parfait-a7e9f6.netlify.app'],
  credentials: true
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://654bc9ff6091fc2327a62181--idyllic-parfait-a7e9f6.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());
app.use(cookieParser());

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

// ---------------------Create our own middleware------------------------

// put this middleware to the middle of any api 
const logger = async(req, res, next)=>{
  // to display the url which is called 
  console.log('Url called', req.host, req.originalUrl);
  // then call next 
  next();
}
// middleware to verify token and use this middleware to secure by token
// const verifyToken = async(req, res, next)=>{
//   const token = req.cookies?.token;
//   console.log('Value of token in verifyToken middleware', token);
//   if(!token){
//     return res.status(401).send({message: 'not authorized'});
//   }
//   // now verify token 
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded)=>{
//     // error 
//     if(err){
//       console.log("Error in token verify", err);
//       return res.status(401).send({message: 'unauthorized'});
//     }
//     // if token is valid then it will be decoded 
//     console.log("The value in token after decoded", decoded);
//     const userEmail = decoded.email;
//     // set decoded to user 
//     req.user = decoded;
//     req.userEmail = userEmail;
//     // when decoded is successful then only go to next 
//     next();
//   })
// }

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

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


    // --------------------------Auth related api----------------------------
    app.post('/jwt', logger, async(req, res)=>{
      const user = req.body;
      console.log('user',user);
      // jwt.sign(payload, secret, option)
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1h'});
      // set cookie [ cookie(token name, token value, options)]
      res
      .cookie('token', token,{
        httpOnly: true,
        secure: false,
      })
      .send({success: true});
    })

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
    app.get('/brands/dell', async(req, res)=>{
      const cursor = dellBrandCollection.find();
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    })
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
    // ---------------Insert data for add products to google collection --------

    app.post('/brands/google',async(req, res)=>{
      const newData = req.body;
      const result = await googleBrandCollection.insertOne(newData);
      res.send(result);
    })
    // ---------------Insert data for add products to canon collection --------

    app.post('/brands/canon',async(req, res)=>{
      const newData = req.body;
      const result = await canonBrandCollection.insertOne(newData);
      res.send(result);
    })
    // ---------------Insert data for add products to samsung collection --------

    app.post('/brands/samsung',async(req, res)=>{
      const newData = req.body;
      const result = await samsungBrandCollection.insertOne(newData);
      res.send(result);
    })
    // ---------------Insert data for add products to microsoft collection --------

    app.post('/brands/microsoft',async(req, res)=>{
      const newData = req.body;
      const result = await microsoftBrandCollection.insertOne(newData);
      res.send(result);
    })
    // ---------------Insert data for add products to sony collection --------

    app.post('/brands/sony',async(req, res)=>{
      const newData = req.body;
      const result = await sonyBrandCollection.insertOne(newData);
      res.send(result);
    })
    // ---------------Insert data for add products to intel collection --------

    app.post('/brands/intel',async(req, res)=>{
      const newData = req.body;
      const result = await intelBrandCollection.insertOne(newData);
      res.send(result);
    })
    // ---------------Insert data for add products to apple collection --------

    app.post('/brands/apple',async(req, res)=>{
      const newData = req.body;
      const result = await appleBrandCollection.insertOne(newData);
      res.send(result);
    })
    // ---------------Insert data for add products to dell collection --------

    app.post('/brands/dell',async(req, res)=>{
      const newData = req.body;
      const result = await dellBrandCollection.insertOne(newData);
      res.send(result);
    })
    

    // ------------------Read all data from my cart data based on user---------------
    app.get('/mycart', async(req, res)=>{
      console.log(req.query.email);
      // from client side if there is provided withCredentials then it will get that 
      console.log('Token from client to mycart',req.cookies.token); //parser gives the name cookies
      // if user wants other's mycart data then return 
      // if(req.query.email !== req.user.email){
      //   return res.status(403).send({message: 'forbidden access'});
      // }
      let query = {};
      // if email is there in req.query then set the email to query 
      if(req.query?.email){
        query = {email: req.query.email}
      }
      const cursor = myCartCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })
    // ---------------Insert data for add to cart in myCartData collection --------

    app.post('/mycart',async(req, res)=>{
      const newData = req.body;
      const result = await myCartCollection.insertOne(newData);
      // res.status(200).json({ message: 'Item added to the cart' });
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
      // console.log(id);
      const result = await brandAdvertisementCollection.findOne(query);
      if(result){
        res.send(result);
        console.log(result);
      }
      else{
        res.status(404).json({ error: 'Advertisement not found' });
      } 
    })
    // ---------------------Update data for google product ---------------
    // create an api to update data 
    app.put('/google/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const option = {upsert: true};
      // take data from body of request 
      const updateProduct = req.body;
      const product = {
        $set:{
          // name the fileds that we want to set/update 
          name: updateProduct.name, 
          brand: updateProduct.brand, 
          image: updateProduct.image,
          type: updateProduct.type, 
          price: updateProduct.price, 
          rating: updateProduct.rating, 
          key_name: updateProduct.key_name, 
          category: updateProduct.category, 
          description: updateProduct.description
        }
      }
      const result = await googleBrandCollection.updateOne(filter, product, option);
      res.send(result);
    })
    // ---------------------Update data for sony product ---------------
    // create an api to update data 
    app.put('/sony/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const option = {upsert: true};
      // take data from body of request 
      const updateProduct = req.body;
      const product = {
        $set:{
          // name the fileds that we want to set/update 
          name: updateProduct.name, 
          brand: updateProduct.brand, 
          image: updateProduct.image,
          type: updateProduct.type, 
          price: updateProduct.price, 
          rating: updateProduct.rating, 
          key_name: updateProduct.key_name, 
          category: updateProduct.category, 
          description: updateProduct.description
        }
      }
      const result = await sonyBrandCollection.updateOne(filter, product, option);
      res.send(result);
    })
    // ---------------------Update data for apple product ---------------
    // create an api to update data 
    app.put('/apple/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const option = {upsert: true};
      // take data from body of request 
      const updateProduct = req.body;
      const product = {
        $set:{
          // name the fileds that we want to set/update 
          name: updateProduct.name, 
          brand: updateProduct.brand, 
          image: updateProduct.image,
          type: updateProduct.type, 
          price: updateProduct.price, 
          rating: updateProduct.rating, 
          key_name: updateProduct.key_name, 
          category: updateProduct.category, 
          description: updateProduct.description
        }
      }
      const result = await appleBrandCollection.updateOne(filter, product, option);
      res.send(result);
    })
    // ---------------------Update data for samsung product ---------------
    // create an api to update data 
    app.put('/samsung/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const option = {upsert: true};
      // take data from body of request 
      const updateProduct = req.body;
      const product = {
        $set:{
          // name the fileds that we want to set/update 
          name: updateProduct.name, 
          brand: updateProduct.brand, 
          image: updateProduct.image,
          type: updateProduct.type, 
          price: updateProduct.price, 
          rating: updateProduct.rating, 
          key_name: updateProduct.key_name, 
          category: updateProduct.category, 
          description: updateProduct.description
        }
      }
      const result = await samsungBrandCollection.updateOne(filter, product, option);
      res.send(result);
    })
    // ---------------------Update data for microsoft product ---------------
    // create an api to update data 
    app.put('/microsoft/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const option = {upsert: true};
      // take data from body of request 
      const updateProduct = req.body;
      const product = {
        $set:{
          // name the fileds that we want to set/update 
          name: updateProduct.name, 
          brand: updateProduct.brand, 
          image: updateProduct.image,
          type: updateProduct.type, 
          price: updateProduct.price, 
          rating: updateProduct.rating, 
          key_name: updateProduct.key_name, 
          category: updateProduct.category, 
          description: updateProduct.description
        }
      }
      const result = await microsoftBrandCollection.updateOne(filter, product, option);
      res.send(result);
    })
    // ---------------------Update data for dell product ---------------
    // create an api to update data 
    app.put('/dell/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const option = {upsert: true};
      // take data from body of request 
      const updateProduct = req.body;
      const product = {
        $set:{
          // name the fileds that we want to set/update 
          name: updateProduct.name, 
          brand: updateProduct.brand, 
          image: updateProduct.image,
          type: updateProduct.type, 
          price: updateProduct.price, 
          rating: updateProduct.rating, 
          key_name: updateProduct.key_name, 
          category: updateProduct.category, 
          description: updateProduct.description
        }
      }
      const result = await dellBrandCollection.updateOne(filter, product, option);
      res.send(result);
    })
    // ---------------------Update data for intel product ---------------
    // create an api to update data 
    app.put('/intel/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const option = {upsert: true};
      // take data from body of request 
      const updateProduct = req.body;
      const product = {
        $set:{
          // name the fileds that we want to set/update 
          name: updateProduct.name, 
          brand: updateProduct.brand, 
          image: updateProduct.image,
          type: updateProduct.type, 
          price: updateProduct.price, 
          rating: updateProduct.rating, 
          key_name: updateProduct.key_name, 
          category: updateProduct.category, 
          description: updateProduct.description
        }
      }
      const result = await intelBrandCollection.updateOne(filter, product, option);
      res.send(result);
    })
    // ---------------------Update data for lg electronics product ---------------
    // create an api to update data 
    app.put('/lgelectronics/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const option = {upsert: true};
      // take data from body of request 
      const updateProduct = req.body;
      const product = {
        $set:{
          // name the fileds that we want to set/update 
          name: updateProduct.name, 
          brand: updateProduct.brand, 
          image: updateProduct.image,
          type: updateProduct.type, 
          price: updateProduct.price, 
          rating: updateProduct.rating, 
          key_name: updateProduct.key_name, 
          category: updateProduct.category, 
          description: updateProduct.description
        }
      }
      const result = await lgelectronicsBrandCollection.updateOne(filter, product, option);
      res.send(result);
    })
    // ---------------------Update data for canon product ---------------
    // create an api to update data 
    app.put('/canon/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const option = {upsert: true};
      // take data from body of request 
      const updateProduct = req.body;
      const product = {
        $set:{
          // name the fileds that we want to set/update 
          name: updateProduct.name, 
          brand: updateProduct.brand, 
          image: updateProduct.image,
          type: updateProduct.type, 
          price: updateProduct.price, 
          rating: updateProduct.rating, 
          key_name: updateProduct.key_name, 
          category: updateProduct.category, 
          description: updateProduct.description
        }
      }
      const result = await canonBrandCollection.updateOne(filter, product, option);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);