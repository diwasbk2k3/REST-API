import express from "express";
const app = express();

import { MongoClient, ObjectId } from "mongodb";
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url)

// middleware
app.use(express.json())

client.connect().then((connection) => {
    const db = connection.db("school")
    const collection = db.collection("students")

    // get all stundets api
    app.get("/api/students", async (req, res) => {
        const result = await collection.find().toArray()
        res.send({ message: "data fetched", result: result, success: true })
    })

    // get student by id
    app.get("/api/student/:id", async (req, res) => {
        const result = await collection.findOne({ _id: new ObjectId(req.params.id) })
        res.send({ message: `User Id: ${id} fetched successfully`, result: result, success: true })
    })

    // admit (post) new student
    app.post("/api/add-student", async (req, res) => {
        const result = await collection.insertOne(req.body)
        res.send({ message: "student added successfully", success: true, result: result })
    });

    // put api
    app.put("/api/update-student/:id", async (req, res) => {
        const result = collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
        res.send({ message: `user id: ${req.params.id} updated successfully`, success: true })
    })

    // delete api
    app.delete("/api/delete-student/:id", async (req, res) => {
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) })
        res.send({ message: `user id: ${id} deleted successfully.`, success: true })
    })
})

app.listen(4000)


/*
    const { student_id, name, age, grade, city } = req.body
    if (!student_id || !name || !age || !grade || !city) {
        res.send({ message: "Error! Please fill in all details", success: false })
    }
*/
