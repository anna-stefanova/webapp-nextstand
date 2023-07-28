const express = require('express');
const router = express.Router();
const path = require('node:path');
const fs = require('node:fs/promises');

/* GET users listing. */
router.get('/', function(req, res, next) {
    const guestId = req.query.id;
    const url = `http://localhost:4008/guests/${guestId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            fs.readFile(path.resolve('server/db.json'), 'utf8')
                .then((data) => {
                    if (data) {
                        data = Object.assign([], JSON.parse(data));
                        data['guests'].forEach((g) => {
                            if (g.id === parseInt(req.query.id)) {
                                g['check-in'] = true;
                            }
                        });
                        data = JSON.stringify(Object.assign({}, data));
                        return data;
                    } else console.log('Нет данных');
                })
                .then((data) => fs.writeFile(path.resolve('server/db.json'), data))
                .then(() => console.log('Данные успешно записаны'))
                .catch((err) => console.log(err));

            res.render('greeting', {
                title: 'Greeting',
                id: guestId,
                name: data.name,
                lastname: data.lastname,
                table: data.table

            });

        })
        .catch(error => console.log(error));
});



module.exports = router;