module.exports = function(app) {
    var autenticar = require('./../middlewares/autenticador'), empresa = app.controllers.empresa;
    app.post('/rest/empresas',app.passport.authorize('local-authz', {failureRedirect: '/' }),empresa.incluir);
}