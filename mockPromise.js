var _Promise = function (cb){
    this.then = function(thenCb){
        this.thenCb = thenCb;
        if(this.result){
           setTimeout(() => {
               this. result = this.thenCb(this.result) 
           },0)
        }
        return this;
    }
    resolve = function(result){ 
        if(this.thenCb) {
            if(!this.result){
                this.result = result;
                setTimeout(() => this.thenCb(result), 0)
            }
        }
    }

    this.catch = function(catchCb){
        this.catchCb = catchCb;
        this. result = undefined;
        if(this.error){
            setTimeout(() => this.catchCb(this.error), 0)
        }
        return this;
    }
    reject = function(error){ 
        if (this.catchCb && !this.error) {
            setTimeout(() => this.catchCb(error),0);
            this.error = error;
        }
    }
    cb(resolve, reject);
}

var p = new _Promise((resolve, reject) => {
    //do something with resolve and reject
    //resoving a promise should invoke then
    //rejecting a promise should invoke catch
})

p.then(function(result) {
    //do something with result
    //must return promise
}).catch(function(err){
    //do something with err    
})