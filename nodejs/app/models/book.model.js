const db = require("../../dbService");
const config = require('../../app.config');
const queries = require("../constants/book.constant");

// constructor
const Book = function (bookDetail) {
    console.log(bookDetail);
    this.ID = bookDetail.id;
    this.TITLE = bookDetail[1];
    this.PRICE = bookDetail[2];
    this.AUTHOR = bookDetail[3];
}

Book.getAllBook = (id, result) => {

    let bind = {
        P_STATUS: {
            type: db.CURSOR,
            dir: db.BIND_OUT
        },
        P_OUTPUT: {
            type: db.CURSOR,
            dir: db.BIND_OUT
        }
    };

    let options = {
        outFormat: db.OUT_FORMAT_OBJECT
    };
    db.executeSQL(queries.GET_BOOKS, [], options)
        .then(function (res) {
            if(res.rows.length > 0 ) {
                result(null, {
                    P_OUTPUT: res.rows.map(item => {
                        return new Book(item)
                    })
                });
                return;
            }
            result({
                STATUS: 'F',
                MSG: 'not_found'
            }, null);
        })
        .catch(function (err) {
            console.error(err.message);
            result(err, null);
            return;
        });
};

module.exports = Book;