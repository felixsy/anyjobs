module.exports = {
  ensureAuth: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
  },
  ensureGuest: function(req, res, next){
    if(req.isAuthenticated()){
      res.redirect('/dashboard');
    } else {
      return next();
    }
  },
  
  ensureCeo: function(req, res, next){
    if(req.user.position != 'CEO'){
        res.redirect('/');
    }else{
        return next(); 
    }
  },
  ensureAdmin: function(req, res, next){
    if(req.user.position != 'DB Admin'){
        res.redirect('/');
    }else{
        return next(); 
    }
  }
}