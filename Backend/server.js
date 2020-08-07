const Todo = require("./todos.model")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
require("dotenv").config()

const app = express()
const router = express.Router()

const PORT = process.env.PORT || 4003

app.use(cors())
app.use(bodyParser.json());


const uri = process.env.MONGODB_URI

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const connection = mongoose.connection

connection.once("open", () => {
    console.log("Mongo DB connection succesfull")
})

app.use("/todos", router)

router.route("/").get((req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            res.status(400).send("Can not get datas from database. Please try again later")
        } else {
            res.json(todos)
        }
    })
})

router.route("/:id").get((req, res) => {
    let id = req.params.id
    Todo.findById(id, (err, todo) => {
        if (err) {
            res.status(404)
        } else {
            res.json(todo)
        }
    })
})

router.route("/add").post((req, res) => {
    let todo = new Todo(req.body);
    todo.save().then((todo) => {
        res.status(200).json({todo: "Todo added succesfully"})
    }).catch(err => {
        res.status(400).send("Could not add todo!!!")
    })
})

router.route("/delete/:id").delete((req,res) => {
    Todo.findByIdAndDelete(req.params.id).then(() => {
        res.json({deleted : "todo : " + req.body.todo})
    }).catch(err => {
        res.status(404).send("Could not find an existing todo with id : " + req.params.id)
    })
})

router.route("/update/:id").put((req,res) => {
    Todo.findByIdAndUpdate(
        req.params.id,
        {
            todo : req.body.todo,
            completed : req.body.completed
        },
        {new : true},
        () => {
            console.log("Todo updated")
        }
    )
        .then(
            res.json({updated : req.body.todo})
        ).catch(err => {
            res.status(404).send("Could not find a todo with id : " + req.params.id)
    })
})

app.use(express.static(path.join(__dirname, "../dist")))
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../dist"))
})
app.listen(PORT, () => {
    console.log("server started at port: " + PORT)
})
