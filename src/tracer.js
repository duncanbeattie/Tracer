
var config = {
  debug: true,
};



(function(exports, $, undefined){
    "use strict";
    var trace = (function(){
        // catch trace Messages and modifiers
        var trace = function(msg, mod){ new exports.dbt.Tracer(msg, mod) };
        return trace;
    }());
    exports.dbt = exports.dbt || {};
    exports.dbt.trace = trace;
    
    var Tracer = (function(el){
        // output messages to the console based
        var Tracer = function(msg, mod){
            this.msg = msg;
            this.mod = mod;
            this.init()
        };

        Tracer.prototype = $.extend({}, Tracer.prototype, {
            init: function(){
                var self = this;
                if(!config.debug){return}
                if(typeof(self.msg)=='object'){ self.traceObject() }
                else if(self.mod){ self.traceBump() }
                else{ console.log('-> '+this.msg) }
            },
            traceBump: function(){
              var bump = {
                pre: '\n\n//////////////////////////////\n//   ',
                post: '\n//////////////////////////////\n\n'
              }
              this.msg = bump.pre+' '+this.msg+' '+bump.post
              this.traceOut()
            },
            traceObject: function(){
              console.log(this.msg)
              if(this.mod){
                var splt = ''
                for(var i=0;i<this.msg.length;i++){ splt+='-> '+this.msg[i]+'\n' }
                this.msg = splt + '\n\n'
                this.traceOut()
              }
            },
            traceOut: function(){
              console.log(this.msg)
            }
        });
        return Tracer;
    }());
    exports.dbt = exports.dbt || {};
    exports.dbt.Tracer = Tracer;
}(this, this.jQuery));





// Do that thing

(function(exports, $, undefined){
    "use strict";
    $(function(){
      dbt.trace(config)
      dbt.trace('test out', 1)
    })
}(this, this.jQuery));
