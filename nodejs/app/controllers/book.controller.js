const Book = require('../models/book.model');


exports.getAllBook = (req, res) => {

    Book.getAllBook(req, (err, data) => {
        if (err) {
            if (err.MSG === "not_found") {
                res.status(404).send({
                    success: false,
                    message: `No data found`
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: "Error retrieving data"
                });
            }
        } else res.send({
            success: true,
            data: data
        });
    });
};
