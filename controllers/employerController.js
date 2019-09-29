const passport = require("passport");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Company = mongoose.model("companies");

exports.login = (req, res) => {
  res.render("employer/login");
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/employer/dashboard",
    failureRedirect: "/employer/login",
    failureFlash: true
  })(req, res, next);
};

exports.signup = (req, res) => {
  res.render("employer/signup");
};

exports.postSignup = (req, res) => {
  const errors = [];

  console.log(req.file.filename);

  if (req.body.phone.length < 11) {
    errors.push({ err_msg: "Phone number must be 11 digit" });
  }

  if (req.body.password !== req.body.confirmpassword) {
    errors.push({ err_msg: "Password and Confirm Password dont match" });
  }

  if (errors.length > 0) {
    res.render("employer/signup", {
      errors: errors,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
      state: req.body.state
    });
  } else {
    Company.findOne({ email: req.body.email }).then(company => {
      if (!company) {
        const newCompany = new Company({
          company: req.body.company,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          lga: req.body.lga,
          state: req.body.state,
          logo: req.file.filename,
          password: req.body.password
        });

        bcrypt.hash(req.body.password, 10, (err, hash) => {
          newCompany.password = hash;
          newCompany
            .save()
            .then(() => {
              req.flash(
                "success_msg",
                "Signup Successful, login to post & Manage intern positions"
              );
              res.redirect("/employer/login");
            })
            .catch(err => {
              throw err;
            });
        });
      } else {
        errors.push({
          err_msg: `${req.body.email} is already registered to an account, Login Instead`
        });
        res.render("employer/signup", {
          errors: errors,
          name: req.body.name,
          phone: req.body.phone,
          address: req.body.address,
          email: req.body.email,
          password: password
        });
      }
    });
  }
};
