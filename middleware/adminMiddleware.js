var adminMiddleware = function(req, res, next) {
    if (req.user && req.user.role == 'admin') {
        next();
    }
    res.redirect('/login');
}

module.exports = adminMiddleware;

