const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    address: { type: String, default: '(Please Update Address)' },
    //  wishlist
    favorites: [
        { 
            candy: String,

        } 
    ]
});

// This will hash the password before saving to the database
UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
    });
});

module.exports = mongoose.model('User', UserSchema);