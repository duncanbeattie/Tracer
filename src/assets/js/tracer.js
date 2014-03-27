
// Config Settings:
//
// debug: bool - set false to turn off tracer
// recursive - set true to attempt deep parsing of nested objects
// tests - for dev purposes, a bunch of use cases setup in paired arrays
//
var config = {
  debug: true,
  recursive: true,
  tests: {
    string: ['string value'],
    TitleString: ['Title String', 1],
    array: [['a','b','c','d']],
    array_expanded: [['a','b','c','d'], 1],
    object: [{int:123,str:'abc',arr:['q','w','e','r','t','y']}],
    object_expanded: [{int:123,str:'abc',arr:['q','w','e','r','t','y']}, 1],
    func: [function(){var n=0;}],
    func_expanded: [function(){var n=0;}, 1]
  }
};

// get size of object
function getObjSize(o) {
  var s=0, k
  for(k in o){if (o.hasOwnProperty(k)) s++;}
  return s;
};
// run config tests
function runTests(Tests){
  var tn=1
  for (test in Tests) {
    console.log('\n\n\n\n****************************************************')
    console.log('**  Run Test '+tn+' --> '+test+' :: '+typeof(Tests[test][0])+'\n')
    console.log('dbt.trace('+typeof(Tests[test][0])+', '+Tests[test][1]+')\n\n')
    dbt.trace(Tests[test][0], Tests[test][1])
    console.log('\n\n****************************************************\n')
    tn++
  }
}



// GO
// say hello and run some tests
//
$(function(){
  dbt.trace('Tracer - parse out *whatever*', 1)
  dbt.trace('debug: '+config.debug)
  dbt.trace('recursive: '+config.recursive)
  dbt.trace('tests: '+getObjSize(config.tests))
  runTests(config.tests)
});



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// Tracer
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
                switch(typeof(self.msg)){
                  case 'object': self.traceObject(); break;
                  case 'function': self.traceFunc(); break;
                  case 'string': self.traceString(); break;
                  default: console.log('-> '+this.msg)
                }
            },
            // simple strings
            traceString: function(){
              if(this.mod){ this.traceBump() }
              else{ console.log('-> '+this.msg) }
            },
            traceBump: function(){
              var bump = {
                pre: '\n\n////////////////////////////////////////////////////////////\n//   ',
                post: '\n////////////////////////////////////////////////////////////\n\n'
              }
              this.msg = bump.pre+' '+this.msg+' '+bump.post
              this.traceOut()
            },
            // deal with objects
            traceObject: function(){
              console.log('\n\n\n')
              console.log(this.msg)
              if(this.mod){
                this.getObjectDetails(this.msg)
              }
            },
            getObjectDetails: function(obj) {
                var key
                for (key in obj) {
                    trace(key+' :: '+obj[key])
                    if(config.recursive){
                        trace(obj[key], typeof(obj[key])!='string')
                    }
                }
            },
            // do something with functions
            traceFunc: function() {
              this.traceOut()
              if(this.mod){
                trace('function expanded :: dont really do anything for these yet')
                trace('func :: '+this.msg)
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
