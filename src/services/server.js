const express = require("express")
const mainRouter = require("../routes/index.js")
const { engine } = require("express-handlebars")
const http = require("http")
const { initWsServer, socketEmit } = require("./socket")
const io = require ("socket.io")
const path = require("path")
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const socket = io()
const MongoStore = require("connect-mongo")
const dotenv = require("dotenv")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

dotenv.config
const viewFolderPath = path.resolve(__dirname, "../../views")
const layoutFolderPath = `${viewFolderPath}/layouts`
const partialFolderPath = `${viewFolderPath}/partials`
const defaultLayoutPath = `${layoutFolderPath}/index.hbs`
app.use("/api", mainRouter)

const sessionConfig = {
    secret: 'thisismysecret',
    cookie:{maxAge: 60000 *10},
    saveUninitialized:true,
    resave:false
}

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://nicolima:AXR6rX0SYbupWPfj@cluster0.fd1ldtn.mongodb.net/ecommerce"
        ,
        crypto:{
            secret:'1234'
        }
    }),
    secret:'thisismysecret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge: 600000
    }
}

const mySecret = 'mySecret'
app.use(session(StoreOptions))
app.use(cookieParser(mySecret))
app.set("view engine", "hbs")
app.set("views", viewFolderPath)
app.engine("hbs", engine({
    layoutsDir: layoutFolderPath,
    extname: "hbs",
    defaultLayout: defaultLayoutPath,
    partialsDir: partialFolderPath
}))

const myHTTPServer = http.createServer(app)

const myWebsocketServer= io(myHTTPServer)

initWsServer(myHTTPServer);


app.get("/", async(req,res) =>{
    req.session.destroy()
    res.render("main", {layout: defaultLayoutPath}) 

})

app.get("/login", async(req,res)=>{
    nombre = req.session.nombre
    res.render("logged", {datos: {nombre:nombre}, layout: defaultLayoutPath}) 
})

app.post("/", async(req,res)=>{
    const {nombre} = req.body
    req.session.nombre = nombre
    res.cookie('nombre', nombre).send({proceso:'ok'})
})

app.get("/logout", (req,res)=>{
    // res.render("logout", {datos: {nombre:nombre}, layout:defaultLayoutPath})
    req.session.destroy()
    res.redirect("/")
})


module.exports = myHTTPServer