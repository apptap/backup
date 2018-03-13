(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])
return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:false
};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.loaded=true;return module.exports;}
__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.p="";return __webpack_require__(0);})
([function(module,exports,__webpack_require__){'use strict';function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}
function _slicedToArray(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i['return'])_i['return']();}finally{if(_d)throw _e;}}return _arr;}else{throw new TypeError('Invalid attempt to destructure non-iterable instance');}}
var _rafDebounce=__webpack_require__(1);var _rafDebounce2=_interopRequireDefault(_rafDebounce);function detect(){var frames=document.getElementsByTagName('iframe');for(var i=0;i<frames.length;i++){var el=frames[i];if(el.__vp)continue;if(isVideoPress(el)){attach(el);}}}
function attach(el){var parent=el.parentNode;if(!parent)return;var initialWidth=el.width;var initialHeight=el.height;var resize=function resize(){el.width=Math.min(parent.offsetWidth,initialWidth);el.height=initialHeight*el.width/initialWidth;};resize();__vpResize(el,resize);el.__vp=true;}
var fns=[];window.__vpResize=window.__vpResize||function(el,fn){fns.push([el,fn]);if(1==fns.length)initResize();};function initResize(){var _debounce=(0,_rafDebounce2['default'])(function(){fns.forEach(function(_ref3){var _ref32=_slicedToArray(_ref3,2);var resize=_ref32[1];return resize();});});var fn=_debounce.fn;var cancel=_debounce.cancel;window.addEventListener('resize',fn,false);var gc=setInterval(function(){(0,_rafDebounce2['default'])(function(){fns.forEach(function(_ref,i){var _ref2=_slicedToArray(_ref,1);var iframe=_ref2[0];var p=iframe;while(p!=document.body){p=p.parentNode;if(!p){fns.splice(i,1);if(!fns.length)cleanup();break;}}});}).fn();},10000);var cleanup=function cleanup(){cancel();window.removeEventListener('resize',fn,false);clearInterval(gc);};}
var re=/videopress\.com\/embed\//;function isVideoPress(el){return re.test(el.src);}
detect();document.addEventListener('DOMContentLoaded',detect);},function(module,exports,__webpack_require__){'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports['default']=debounce;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}
function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2;}else{return Array.from(arr);}}
var _raf=__webpack_require__(2);var _raf2=_interopRequireDefault(_raf);function debounce(fn){var args=undefined;var next=undefined;function loop(){next=_raf2['default'](function(){next=null;fn.apply(undefined,_toConsumableArray(args));});}
return{fn:function fn(){for(var _len=arguments.length,argv=Array(_len),_key=0;_key<_len;_key++){argv[_key]=arguments[_key];}
if(!next)loop();args=argv;},cancel:function cancel(){if(next)_raf2['default'].cancel(next);}};}
module.exports=exports['default'];},function(module,exports,__webpack_require__){var now=__webpack_require__(3),global=typeof window==='undefined'?{}:window,vendors=['moz','webkit'],suffix='AnimationFrame',raf=global['request'+suffix],caf=global['cancel'+suffix]||global['cancelRequest'+suffix],isNative=true
for(var i=0;i<vendors.length&&!raf;i++){raf=global[vendors[i]+'Request'+suffix]
caf=global[vendors[i]+'Cancel'+suffix]||global[vendors[i]+'CancelRequest'+suffix]}
if(!raf||!caf){isNative=false
var last=0,id=0,queue=[],frameDuration=1000/60
raf=function(callback){if(queue.length===0){var _now=now(),next=Math.max(0,frameDuration-(_now-last))
last=next+_now
setTimeout(function(){var cp=queue.slice(0)
queue.length=0
for(var i=0;i<cp.length;i++){if(!cp[i].cancelled){try{cp[i].callback(last)}catch(e){setTimeout(function(){throw e},0)}}}},Math.round(next))}
queue.push({handle:++id,callback:callback,cancelled:false})
return id}
caf=function(handle){for(var i=0;i<queue.length;i++){if(queue[i].handle===handle){queue[i].cancelled=true}}}}
module.exports=function(fn){if(!isNative){return raf.call(global,fn)}
return raf.call(global,function(){try{fn.apply(this,arguments)}catch(e){setTimeout(function(){throw e},0)}})}
module.exports.cancel=function(){caf.apply(global,arguments)}
},function(module,exports,__webpack_require__){(function(process){(function(){var getNanoSeconds,hrtime,loadTime;if((typeof performance!=="undefined"&&performance!==null)&&performance.now){module.exports=function(){return performance.now();};}else if((typeof process!=="undefined"&&process!==null)&&process.hrtime){module.exports=function(){return(getNanoSeconds()-loadTime)/1e6;};hrtime=process.hrtime;getNanoSeconds=function(){var hr;hr=hrtime();return hr[0]*1e9+hr[1];};loadTime=getNanoSeconds();}else if(Date.now){module.exports=function(){return Date.now()-loadTime;};loadTime=Date.now();}else{module.exports=function(){return new Date().getTime()-loadTime;};loadTime=new Date().getTime();}}).call(this);}.call(exports,__webpack_require__(4)))
},function(module,exports,__webpack_require__){var process=module.exports={};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}
if(queue.length){drainQueue();}}
function drainQueue(){if(draining){return;}
var timeout=setTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){currentQueue[queueIndex].run();}
queueIndex=-1;len=queue.length;}
currentQueue=null;draining=false;clearTimeout(timeout);}
process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}
queue.push(new Item(fun,args));if(queue.length===1&&!draining){setTimeout(drainQueue,0);}};function Item(fun,array){this.fun=fun;this.array=array;}
Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';process.versions={};function noop(){}
process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/'};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};}
]);