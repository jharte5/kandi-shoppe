const express = require('express');
const router = express.Router();
const Sweet = require('./models/Sweets');

router.get('/', (req, res, next) => {
    // return res.render('auth/home')
    Sweet.find({}).then()

});

router.post('/create-candy', (req, res, next) => {
    Sweet.findOne({ name: req.body.name })
    .then(candy=> {
        if(candy) {
            return res.send('Candy Exists')
        }else {
            const  newCandy = new Sweet();
            newCandy.name = req.body.name;
            newCandy.type = req.body.type;

            newCandy
            .save()
            .then(sweet => {
               res.send(sweet)
            })
            .catch(err => {
                console.log( err)
            })
        }
    })
    .catch( err => {
        console.log (err)
    })
}
)
module.exports = router