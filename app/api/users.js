var User = require('../models/user');

module.exports = function (app) {
    
    /*
     * GET: /users.json
     */
    app.get('/users.json', function(req, res) {
        User.find({}).sort('surename').exec(function (err, users) {
            if (err)
              return res.send(500);
            
            res.send(200, users);
        });
    });
}