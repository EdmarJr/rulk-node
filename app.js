const KEY = 'ntalk.sid', SECRET = 'ntalk';
var express = require('express')
, load = require('express-load')
, bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
, expressSession = require('express-session')
, methodOverride = require('method-override')
, error = require('./middlewares/error')
, app = express()
, server = require('http').Server(app)
, io = require('socket.io')(server)
, cookie = cookieParser(SECRET)
, store = new expressSession.MemoryStore()
, mongoose = require('mongoose')
, knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password : 'ed020893',
    database : 'rulk',
    charset  : 'utf8',
    port : 5433
  }
})
,bookshelf = require('bookshelf')(knex)
,passport = require('passport')
,LocalStrategy = require('passport-local').Strategy;

global.db = mongoose.connect('mongodb://localhost/ntalk');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('bookshelf', bookshelf);
app.use(cookie);
app.use(expressSession({
    secret: SECRET,
    name: KEY,
    resave: true,
    saveUninitialized: true,
    store: store
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

io.use(function(socket, next) {
    var data = socket.request;
    cookie(data, {}, function(err) {
        var sessionID = data.signedCookies[KEY];
        store.get(sessionID, function(err, session) {
            if (err || !session) {
                return next(new Error('acesso negado'));
            } else {
                socket.handshake.session = session;
                return next();
            }
        });
    });
});

var teste = {
    teste : 1,
    realizarMetodo: function() {
        
    }
    
}

app.passport = passport;

load('models').then('controllers').then('routes').into(app);
load('sockets').into(io);

app.use(error.notFound);
app.use(error.serverError);

passport.use(new LocalStrategy(
  function(username, password, done) {
    new app.models.usuario({'email':username}).fetch().then(function (user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.isValidPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }).catch(function (err) {
        if (err) { return done(err); }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.get('email'));
});

passport.deserializeUser(function(email, done) {
  new app.models.usuario({'email':email}).fetch().then(function(user) {
        done(null, user);
  });
});

server.listen(3001, function(){
    console.log("Ntalk no ar.");
});

