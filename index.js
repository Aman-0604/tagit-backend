const connectToMongo = require('./db');
const express = require('express')
var cors=require('cors');// installed this because you can't call your api's from you web server

connectToMongo();
const app = express()
const port = 8000// bcoz 3000 pe humari react app chalegi

app.use(cors());
// MiddleWare (if you want to use req.body)
app.use(express.json()); 

// Available Routes
app.use('/api/auth',require('./routes/auth'));
// app.use('/api/notes',require('./routes/posts'));

app.listen(port, () => {
  console.log(`tagit_backend is listening on port ${port}`)
})