const withAuth = (req, res, next) => {
  // Check if the user is logged in by evaluating the 'logged_in' property in the session
  if (!req.session.logged_in) {
    // If the user is not logged in, redirect them to the login page
    res.redirect('/login');
  } else {
    // If the user is logged in, proceed to the next middleware or route handler
    next();
  }
};

module.exports = withAuth; // Export the 'withAuth' middleware function for use in other parts of the application
