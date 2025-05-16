const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json())
const uri = "mongodb+srv://SimpleMongoBD:XcDhiluUh6LUl6D2@mafikul-zone.2erf5yt.mongodb.net/?retryWrites=true&w=majority&appName=Mafikul-Zone";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});




app.get('/', (req, res) => {
    res.send('Hello World!!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const database = client.db("userdb");
        const usercollection = database.collection("user");
        app.post('/users', async (req, res) => {
            const NewUser = req.body
            const result = await usercollection.insertOne(NewUser);
            res.send(result)
        })
        app.get('/users', async (req, res) => {
            const corsor = usercollection.find();
            const result = await corsor.toArray()
            res.send(result)
        })
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const quary = { _id: new ObjectId(id) };
            const result = await usercollection.findOne(quary)
            res.send(result)
        })
        app.delete('/users/:id', async (req, res) => {
            console.log("req.params")
            const id = req.params.id;
            const quary = { _id: new ObjectId(id) }
            const result = await usercollection.deleteOne(quary)
            res.send(result)
        })
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const user = req.body;
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    Name: user.Name,
                    Email: user.Email,
                },
            };
            const result = await usercollection.updateOne(filter, updateDoc, options)
            res.send(result)
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