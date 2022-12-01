var express = require("express")
var app = express()
var cors = require("cors")
let myappCollection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://Kachi:prac4@cluster0.udrpgld.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlParser: true })

const insertProjects = (project, callback) => {
    myappCollection.insert(project, callback);
}

const getProjects = (callback) => {
    myappCollection.find({}).toArray(callback);
}

const createColllection = (collectionName) => {
    client.connect((err, db) => {
        myappCollection = client.db().collection(collectionName);
        if (!err) {
            console.log('MongoDB Connected Successfully')
        }

        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}

app.get('/api/projects', (req, res) => {
    getProjects((err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err })
        }
        else {
            res.json({ statusCode: 200, message: "Success", data: result })
        }
    })
})

app.post('/api/projects', (req, res) => {
    console.log("A New Project has been added", req.body)
    var newProject = req.body;
    insertProjects(newProject, (err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err })
        }
        else {
            res.json({ statusCode: 200, message: "Project Added Successfully ", data: result })
        }
    })
})


var port = process.env.port || 3000;
app.listen(port, () => {
    console.log("App listening to http://localhost:" + port)
    createColllection("Puppies")
})