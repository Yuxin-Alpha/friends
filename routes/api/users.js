// login &register
const express = require("express")
const router = express.Router()
const User = require("../../models/users/User")
// test of users api
router.get('/test', (req, res) => {
  res.json({msg: "api works"})
})

router.post('/register', (req, res) => {
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res.status(400).json({msg: "Email exited"})
    } else {
       new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).save().then(user => res.json(user)).catch(err => {
        console.log(err);
      })
    }
  })
})
module.exports = router;