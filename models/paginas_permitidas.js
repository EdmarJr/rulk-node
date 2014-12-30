module.exports = function(app) {
    var Pagina = app.get('bookshelf').Model.extend({
       tableName: 'usuario_has_acesso_paginas',
        idAttribute: 'email_usuario',
        usuario: function() {
            return this.belongsTo(app.models.usuario);
        }
    });
    return Pagina;
};