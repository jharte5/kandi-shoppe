const express = require('express');
const router = express.Router();
const Sweet = require('./models/Sweets');

// const getAllCandy = require('./middleware/getAllCandy')


router.get('/', (req, res, next) => {
    if(req.user) {
        Sweet.find({})
        .then(candy => {
            if(candy) {
    return res.render('main/home',{candy: candy})
                console.log(candy)
            }
        })
    }else{
        return res.render('main/home-welcome', {candy: candy})
    }

});

router.post('/create-candy', (req, res, next) => {
    Sweet.findOne({ name: req.body.name })
    .then(candy=> {
        if(candy) {
            return res.send('Candy Exists')
        }else {
            const newCandy = new Sweet();
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
});

router.get('/add-to-fave/:id', (req, res) => {
    let user = req.user
    user.favorites.push({
        candy: req.params.id
    })
    user.save()
})

router.get('/show-fave', (req,res)=>{

})

module.exports = router