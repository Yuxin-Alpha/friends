// login &register
const express = require("express")
const router = express.Router()
const User = require("../../models/users/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// test of users api
router.get('/test', (req, res) => {
  res.json({msg: "api works"})
})

// @desc login api
// @return token jwt passport
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email}).then(user => {
    if (!user) {
      return res.status(404).json({msg: 'Please Regist'})
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const rule = {id: user.id, name: user.name};

        jwt.sign(rule, "secretName", {expiresIn: 3600}, (err, token) => {
          if (err) throw err
          res.json({
            success: true,
            token: 'clement' + token
          })
        });
      } else {
        return res.status(400).json({msg: "Error Password"})
      }
    })
  })
})


router.post('/register', (req, res) => {
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res.status(400).json({msg: "Email exited"})
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash;
          newUser.save().then(user => res.json(user)).catch(err => {
            console.log(err);
          })
        });
      });
    }
  })
})
router.get('/current', )
module.exports = router;