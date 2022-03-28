var express = require('express');
var router = express.Router();

const bookController = require("../controllers/book.controller");

router.post("/getAllBook", bookController.getAllBook);

module.exports = router;
