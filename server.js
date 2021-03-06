const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const passportConfig = require('./config/passport');
const session = require('express-session')

var db = require('./models');

app.use(session({
  secret: 'something',
  cookie: {
      maxAge: 1000*60*60*24 //đơn vị là milisecond
  }
}));

// support parsing of application/json type post data
app.use(bodyParser.json());

//set public folder to serve static assets
app.use(express.static(__dirname + '/public'));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

passportConfig(app);

const router = require('./routes/index');

app.use(router);

app.set('view engine', 'ejs');


db.sync().then(function() {
  app.listen(port, function () {
    console.log(`server is running on port ${port}`);
  })
})



