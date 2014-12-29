module.exports = function(app) {
    var HttpStatus = require('http-status-codes');
    var EmpresaController = {
        incluir : function(req,res) {
            console.log(req.body.empresa);
            new app.models.empresa(req.body.empresa).save().then(function(model) {
                res.status(HttpStatus.CREATED).end();
            }).catch(function(err) {
            });
        }
    }
    return EmpresaController;
};