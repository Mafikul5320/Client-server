const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json())
const uri = "mongodb+srv://SimpleMongoBD:XcDhiluUh6LUl6D2@mafikul-zone.2erf5yt.mongodb.net/?retryWrites=true&w=majority&appName=Mafikul-Zone";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// user: SimpleMongoBD
// Pass: XcDhiluUh6LUl6D2
app.get('/', (req, res) => {
    res.send('Hello World!!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("userdb")
        const usercolletion = database.collection('user')

        app.post("/users", async (req, res) => {
            console.log(req.body)
            const NewUser = req.body;
            const result = await usercolletion.insertOne(NewUser)
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);