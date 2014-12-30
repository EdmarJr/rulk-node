module.exports = function(req, res, next) {
    var canViewPage = function(pathPage,pages) {
        for(page in pages) {
            if(pathPage == page.path) {
                return true;
            }
        }
        return false;
    };

    var url = require('url');
    var path = url.parse(req.url).pathname;
    if(!req.session.usuario) {
        return res.redirect('/');
    }
    if(!canViewPage(path,req.session.paginasPermitidas)) {
        return res.redirect('/');
    }
    return next();


};
