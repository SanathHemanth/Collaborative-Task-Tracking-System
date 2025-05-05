// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// const mongoConnect = async () =>{
//     try{
//         await MongoClient.connect('mongodb+srv://sanath:Snow%232025%40cluster0.3tfn20w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
//         console.log('connected to db');
//     }
//     catch (err){
//         console.log(err);
//     };
// }

// module.exports = mongoConnect;

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://sanath:Snow%232025@cluster0.3tfn20w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } catch{
//     console.log("Error in establishing connection to db")
//   }
// }
// // run().catch(console.dir);

// module.exports = run;

const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connection established")
        } catch (error) {
        console.log("DB Error: " + error)
    }
}

module.exports = dbConnection;