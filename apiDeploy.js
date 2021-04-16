
let mongoose = require('mongoose');
const express = require('express');
// let validator = require('validator');

mongoose.connect("mongodb://localhost:27017/bookManager", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log("Connection Successfull"))
.catch(() => console.log("Connection Error"));


let dbSchema = new mongoose.Schema( {
    
    title : {
        type : String,
        required : true
    },

    author : {
        type : String,
        required : true
    },

    price : {
        type : String,
        default : "Not Available"
    },

    publisher : {
        type : String,
        required : true
    }
})


let Books = new mongoose.model("Books", dbSchema);



let server = new express();
server.use(express.json())
let port = process.env.port || 3000;

server.post("/add/", async (req, res) => {
    try {
        let book = new Books(req.body);
        await book.save();
        res.status(201).send("Successfully Added New Book");

    } catch (err) {
        console.log(err);
        res.send("Some Error has occured, Check Console for Error");
    }
});

server.get("/view/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        let bookDetails = await Books.findById({ _id : req.params.id } );
        res.send(bookDetails);
        }catch (err) {
        console.log(err);
        res.status(404).send("Some Error has occured, Check Console for Error");
    }
});

server.listen(port, () => console.log("Server is Live"));