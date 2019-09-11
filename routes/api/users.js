const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

//Load user model
const user = require('../../models/User');

// @Route  GET api/users/test
// @desc   Test users route
// @access Public
router.get('/test', (req, res) => res.json({
    msg: "User works"
}));


// @Route  POST api/users/register
// @desc   Register users
// @access Public
router.post('/register', (req, res) => {
    user.findOne({email: req.body.email}).then(user => {
        if(user) {
            res.status(400).json({email: 'Email already exists'});
        } else {
            avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err){throw err; }
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                });
            });
        }
    });
});

// @Route  POST api/users/login
// @desc   Login users / return JWT
// @access Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Login user
    User.findOne({email}).then(user => {
        if(!user){
            return res.status(404).json({email: 'User not Found'});
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                res.json({msg: 'Success'});
            } else {
                return res.status(400).json({password: 'Password Incorrect'});
            }
        });
    });
});

module.exports = router;