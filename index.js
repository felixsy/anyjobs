const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");
const multer = require("multer");

const app = express();

require("./models/Company");

const key = require("./config/key");
const homeroute = require("./routes/homeroute");
const employerroute = require("./routes/employerroute");

require("./config/passport")(passport);

mongoose
  .connect(
    key.mongoURI,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
      console.log("Anyjobs Db Connected Succesfully");
    }
  )
  .catch(err => {
    throw err;
  });

const {
  truncate,
  stripTags,
  formatDate,
  select,
  editIcon
} = require("./helpers/hbs");

// Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      select: select,
      formatDate: formatDate
    }
  })
);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/logo");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}${file.originalname
        .split(" ")
        .join("_")}`
    );

    // cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// express handlebars middleware
app.set("view engine", "handlebars");

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("logo")
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// passport session
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global Variable
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Using Routes
app.use("/", homeroute);
app.use("/employer", employerroute);

// listening port
const port = process.env.PORT || 5000;

// starting the app
app.listen(port, () => {
  console.log("Anyjobs App Started Succesfully");
});
