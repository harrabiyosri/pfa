const mongoose = require('mongoose')

mongoose
  .connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.mwqpn.mongodb.net/mern-project',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, err => {
      if (err) throw err;
      console.log('Connected to MongoDB!!!');
    })
