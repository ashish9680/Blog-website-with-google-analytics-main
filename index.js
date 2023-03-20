const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const Mongo = require('connect-mongo')(session)
const passport = require('passport')
const expressHbs = require('express-handlebars')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

// requiring passport
require('./config/passport')

// routes import
const indexRouter = require('./router/index')
const adminRouter = require('./router/admin')
const { EventEmitter } = require('events')

// enviromental variable
require('dotenv').config()


// database support
mongoose.connect(process.env.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Retriving data from mongoose`)
    }
})
mongoose.set('useFindAndModify', false);

// view engine setup
app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'hbs')

// middlewares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: "weareabouttoend",
    resave: false,
    saveUninitialized: false,
    store: new Mongo({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 100 * 60 * 1000 }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


const emitter = new EventEmitter()
emitter.setMaxListeners(100)

// login middleware
app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

// initializine routes
app.use('/', indexRouter)
app.use('/admin', adminRouter)

// server setup
app.listen(process.env.PORT || 3000, (err) => {
    if (err)
        console.log(err)
    else
        console.log(`Responding code ` + 200 + ` Wating for database`)
})