function t(){return(t=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])}return t}).apply(this,arguments)}var n=function(){function t(t){this.config=t,this.state={},this.onEventHandlers=[],this.onTransitionHandlers=[],this.started=!1}var n=t.prototype;return n.start=function(){return this.started=!0,this},n.stop=function(){return this},n.onEvent=function(t){return this.onEventHandlers.push(t),this},n.onTransition=function(t){return this.onTransitionHandlers.push(t),this},n.send=function(t){if(this.started)return this.state},t}();exports.DefaultInterpreter=n,exports.assign=function(n){return function(r,e){return t({},r,(i=n,s=function(t,n){return{newContext:t(r,e),type:"assign"}},Object.keys(i).reduce(function(n,r){var e;return t({},n,((e={})[r]=s(i[r]),e))},{})));var i,s}},exports.createMachine=function(t){return new n(t)},exports.send=function(t,n){var r=void 0===n?{}:n,e=r.delay,i=void 0===e?0:e,s=r.to,o=void 0===s?"self":s;return function(t,n){return{type:"send",transition:n.type,to:(r={delay:i,to:o}).to,delay:r.delay};var r}};
//# sourceMappingURL=index.js.map
