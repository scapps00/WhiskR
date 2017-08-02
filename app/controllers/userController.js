var users = require('./controllers/user.js");

module.exports = function(app) {
    app.route('/user').post(user.create);
};
