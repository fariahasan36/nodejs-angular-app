const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();

const dbService = require('./dbService');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


var bookRouter = require('./app/routes/book.route');


app.use('/book', bookRouter);


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
    // console.log(`Example app listening on port ${port}!`)
});

module.exports = app;