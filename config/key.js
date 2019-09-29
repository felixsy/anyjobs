if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI: "mongodb+srv://anyjobs:dbmsdrexeh@cluster0-cctes.mongodb.net/anyjobs?retryWrites=true&w=majority"
  };
} else {
  module.exports = { mongoURI: "mongodb://localhost/anyjobs" };
}
