const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const guestTable = req.query.table;

    const url = `http://localhost:4008/guests?table=${guestTable}`;

    fetch(url)
        .then(response => response.json())
        .then(guests => {
            let active = {};
            let newListGuests = [];
            guests.forEach((el) => {
               if (el.id === Number(req.query.id)) {
                   active = el; // гость, который ищет себя
               } else {
                   newListGuests.push(el); // все остальные, сидящие с ним за столом
               }
            });


            res.render('guests', {
                title: 'Guests',
                guests: newListGuests,
                active: active


            });

        })
        .catch(error => console.log(error));

});

module.exports = router;