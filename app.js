const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Users = require('./usersDB');

// App Config
const app = express();
const port = process.env.PORT || 8888;
const connection_url =
  'mongodb+srv://admin:admin@cluster0.vznu7.mongodb.net/users?retryWrites=true&w=majority';

// Middlewares
app.use(express.json())

// DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// API Endpoints
app.get('/', (req, res) => res.status(200).send('server work!'));

app.post('/users', (req, res) => {
  const user = req.body;
  Users.create(user, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).send(data);
  });
});

app.get('/users', (req, res) => {
    Users.find((err, data)=>{
        if (err) {
            res.status(500).send(err);
          }
          res.status(200).send(data);
    })
});

// Listener
app.listen(port, () => console.log(`Server listening port ${port}`));
