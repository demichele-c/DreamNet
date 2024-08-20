const hasAuth = (req, res, next) => {
  console.log("Request session object:", req.session);

  if (!req.session.userId) {
      console.log("User not authenticated. Redirecting to /login.");
      res.redirect('/login');
  } else {
      console.log("User authenticated. Proceeding to the next middleware.");
      next();
  }
};

module.exports = hasAuth;
