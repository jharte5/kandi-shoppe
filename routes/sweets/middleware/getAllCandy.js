const Sweet = require('./models/Sweets');

const getAllCandy = (req, res, next) => {
    Sweet.find({}, (err, candy) => {  
        if (err) return next(err);
        console.log(candy);
        // res.locals.categories = categories;
        next();
    });
};

module.exports = getAllCandy;