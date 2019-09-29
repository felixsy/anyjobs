exports.index = (req, res) => {
  res.render("home/home");
};

exports.freejobs = (req, res) => {
  res.render("home/postfreejob");
};

exports.postfreejobs = (req, res) => {
  console.log(req.body);
};
