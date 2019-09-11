const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//db config
const db = require('./config/keys').mongoURI;

//connect w mongoose
mongoose.connect(db).then(() => console.log('DB connected')).catch(err => console.log(err));

app.get('/', (req, res) => res.send('HELLO WORLD'));

// Routes
app.use('/api/users', users);
app.use('/api/profiles', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on port  ' + port));