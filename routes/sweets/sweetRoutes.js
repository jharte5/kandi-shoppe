const express = require("express");
const router = express.Router();
const Sweet = require("./models/Sweets");
const User = require("../users/models/User");

// const getAllCandy = require('./middleware/getAllCandy')

router.get("/", (req, res, next) => {
  if (req.user) {
    Sweet.find({}).then(candy => {
      if (candy) {
        return res.render("main/home", { candy: candy });
        console.log(candy);
      }
    });
  } else {
    return res.render("main/home-welcome", { candy: candy });
  }
});

router.post("/create-candy", (req, res, next) => {
  Sweet.findOne({ name: req.body.name })
    .then(candy => {
      if (candy) {
        return res.send("Candy Exists");
      } else {
        const newCandy = new Sweet();
        newCandy.name = req.body.name;
        newCandy.type = req.body.type;

        newCandy
          .save()
          .then(sweet => {
            res.send(sweet);
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/add-to-fave/:name", (req, res) => {
  let user = req.user;
  let find = req.user.favorites
  let name = req.params.name
  if (find.indexOf(name, 0) === -1) {
    user.favorites.push({
      candy: req.params.name
    });
    user
      .save()
      .then(favorites => {
        res.redirect("/sweets");
      })
      .catch(err => {
        console.log(err);
      });
  } else {
      res.redirect('/sweets')
  }
});

router.get("/delete", (req, res) => {
  let candy = req.user.favorites;
  return res.render("partials/sweets-remove", { candy });
});

router.get("/delete-fave/:id", (req, res) => {
  let user = req.user._id;

  User.findOne({ _id: user }).then(user => {
    user.favorites.pull({ _id: req.params.id });

    user.save().then(user => {
      res.redirect("/sweets/delete");
    });
  });

  // user.favorites.findOneAndDelete({
  //     candy: req.params.name,
  //     candy_id: req.params.id
  // })
  // user.save()
  // .then(favorites => {
  //     res.redirect('/sweets')
  // })
  // .catch(err => {
  //     console.log(err)
  // })
});

router.get("/show-fave", (req, res) => {
  let user = req.user;
  let candy = req.user.favorites;
  // User.findById({ user })
  // .populate('candy')
  // .exec()
  // .then(sweet => {
  console.log(candy);
  res.render("partials/show-fave", { candy });
  // })
});

router.get("/process-fave", (req, res, next) => {
  res.render("main/thank-you");
});

module.exports = router;
