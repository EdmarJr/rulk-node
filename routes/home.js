module.exports = function(app) {
    var home = app.controllers.home;
    app.get('/',home.index);
    app.post('/entrar',app.passport.authenticate('local'),home.login);
    app.post('/sair',home.logout);
};