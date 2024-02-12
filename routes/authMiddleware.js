const isAuthenticated = (req, res, next) => {
    console.log(req.session.isLoggedIn);
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
