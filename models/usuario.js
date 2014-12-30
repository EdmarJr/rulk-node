module.exports = function(app) {
    var crypto = require('crypto');
    var Usuario = app.get('bookshelf').Model.extend({
        tableName: 'usuario',
        idAttribute: 'email',
        isValidPassword: function(password) {
            var sha256 = crypto.createHash("sha256");
            sha256.update(password, "utf8");
            var result = sha256.digest("base64");
            if(result == this.get('hashsenha')) {
                return true;
            }
            return false;
        },
        paginasPermitidas: function() {
            var teste = this.hasMany(app.models.paginasPermitidas);
            console.log(teste);
            return teste;
        }
    });
    return Usuario;
};