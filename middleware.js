//Middleware is the programming pattern of providing hooks with a resume callback.
// constructor
var Middleware = function() {
    let index = 0;
    let count = 0;
    const cbArray = [];    
    const next = function() {
        if(index < count){
            cbArray[index](next)
            index++;
        }
    }
    this.use = function(cb) {
        count ++;
        cbArray.push(cb);
    }
    this.go = function(cb){
        this.use(cb);
        next();
    }
}

// usage
var middleware = new Middleware();

middleware.use(function(next) {
  var self = this;
  setTimeout(function() {
    self.hook1 = true;
    next();
  }, 10);
});

middleware.use(function(next) {
  var self = this;
  setTimeout(function() {
    self.hook2 = true;
    next();
  }, 10);
});

var start = new Date();
middleware.go(function() {
  console.log(this.hook1); // true
  console.log(this.hook2); // true
  console.log(new Date() - start); // around 20
});