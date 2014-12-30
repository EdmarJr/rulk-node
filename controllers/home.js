module.exports = function(app) {


    var Usuario = app.models.usuario;
    var verificarSenhaUsuario = function(model) {
        req.body.usuario.senhamodel.get('hashsenha');
    };

    var HomeController = {
        index: function(req, res) {
            res.render('home/index');
        },
        login:function(req, res) {
            req.session.usuario = req.user;
            req.session.paginasPermitidas = req.user.paginasPermitidas();
            res.redirect('/users/' + req.user.username);
        },
        logout: function(req, res) {
            req.session.destroy();
            res.redirect('/');
        }
    };
    return HomeController;
};