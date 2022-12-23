const express = require("express");
const mainRouter = require("../routes/index.js");
const { engine } = require("express-handlebars");
const http = require("http");
const { initWsServer, socketEmit } = require("./socket");
const io = require("socket.io");
const path = require("path");
const app = express();
const { initMongoDB } = require("../conexion.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const socket = io();
const { loginFunc, signupFunc } = require("./auth");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const passport = require("passport");
const isLoggedIn = require("../middlewares/islogged");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const StoreOptions = {
    store: MongoStore.create({
    mongoUrl:
        "mongodb+srv://nicolima:AXR6rX0SYbupWPfj@cluster0.fd1ldtn.mongodb.net/ecommerce",
    crypto: {
        secret: "1234",
    },
    }),
    secret: "thisismysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
    maxAge: 600000,
    },
};
const sessionConfig = {
    secret: "thisismysecret",
  cookie: { maxAge: 60000 * 10 },
    saveUninitialized: true,
    resave: false,
};

const mySecret = "mySecret";

app.use(cookieParser(mySecret));
app.use(session(StoreOptions));
app.use(passport.initialize());
app.use(passport.session());

dotenv.config;
const viewFolderPath = path.resolve(__dirname, "../../views");
const layoutFolderPath = `${viewFolderPath}/layouts`;
const partialFolderPath = `${viewFolderPath}/partials`;
const defaultLayoutPath = `${layoutFolderPath}/index.hbs`;
app.use("/api", mainRouter);

initMongoDB();

passport.use("login", loginFunc);
passport.use("signup", signupFunc);
app.set("view engine", "hbs");
app.set("views", viewFolderPath);
app.engine(
    "hbs",
    engine({
    layoutsDir: layoutFolderPath,
    extname: "hbs",
    defaultLayout: defaultLayoutPath,
    partialsDir: partialFolderPath,
    })
);

const myHTTPServer = http.createServer(app);

const myWebsocketServer = io(myHTTPServer);

initWsServer(myHTTPServer);

app.get("/", async (req, res) => {
    if (req.session.passport?.user !== '404' && req.session.passport?.user) {
        await res.render("logged", {
        datos: { nombre: req.session.passport.user},
        layout: defaultLayoutPath,
    });
    } else if (req.session.passport?.user === '404') {
        res.redirect("/api/noEncontrado")
    }else{
        res.render("main", { layout: defaultLayoutPath });
    }
});

app.post("/", async (req, res) => {
    const { nombre } = req.body;
    req.session.nombre = nombre;
    res.send({ proceso: "ok" });
});

app.get("/api/login", async (req, res) => {
    res.render("login", { layout: defaultLayoutPath });
});
app.get("/api/signup", async (req, res) => {
    res.render("signup", { layout: defaultLayoutPath });
});

app.get('/api/noEncontrado', async (req,res) =>{
    req.session.destroy()
    res.render('noEncontrado', {layout:defaultLayoutPath})
    
})

app.get("/", isLoggedIn,async (req, res) => {
    res.json({msg:'logueado'})
});

app.get("/logout", (req, res) => {
    const nombre = req.session.passport.user
    res.render("logout", {
    datos: { nombre: nombre },
    layout: defaultLayoutPath,
    });
    req.session.destroy();
});

module.exports = myHTTPServer;