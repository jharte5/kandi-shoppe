const Cart = require('../models/Cart');

module.exports = (req, res, next) => {
    if(req.user){
        Cart.findOne({owner: req.user._id })
        .then((cart) => {
            if (cart){
                let totalItems = 0;
                
                for(let item of cart.items) totalItems += item.quantity;
                res.locals.cartTotal = totalItems;
                next();
            } else {
                res.locals.cartTotal = 0;
                next()
            }
        }).catch(err=> {
            return next(err);
        });
    }else {
        next()
    }
}