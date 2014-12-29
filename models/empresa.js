module.exports = function(app) {
    var Empresa = app.get('bookshelf').Model.extend({
        tableName: 'empresa',
        idAttribute: 'id'
    });
    return Empresa;
};