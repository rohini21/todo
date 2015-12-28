(function() {

var gulp = require('gulp');

var _seqStartTasks = {};
var originalEmit = gulp.emit;
gulp.emit = function(event, args) {
  if (args.task in _seqStartTasks) { return true; }
  return originalEmit.apply(gulp, arguments);
};

var originalTask = gulp.task;
gulp.task = function(name, dep, fn) {

  function _runCb(cb) {
    if (typeof(cb) === 'function') { cb(); }
  }

  function _newName(name) {
    var n1 = 33 + Math.floor((126-32) * Math.random());
    var n2 = 33 + Math.floor((126-32) * Math.random());
    var suffix = String.fromCharCode(n1) + String.fromCharCode(n2);
    suffix = '\u001B[8m' + suffix +'\u001B[0m\u001B[2D'; //hidden
    return name + suffix;
  }

  function _defineSeqStartTask(name, dep) {
    _seqStartTasks[name] = true;
    var newName = _newName(name);
    var newDep = dep.concat(newName);
    var fn = function(cb) {
      SeqEngine.startTasks(newDep, new Ender(name, cb));
    };
    originalTask.call(gulp, name, undefined, fn);
    return newName;
  }

  function _createSeqTask(name, dep, fn) {
    var newName = _defineSeqStartTask(name, dep);
    return _createTask(newName, undefined, fn);
  }

  function _createTask(name, dep, fn) {
    var newFn;
    if (!fn) {
      newFn = function(cb) { (new Ender(name, cb))(); };
    } else if (fn.length === 0) {
      newFn = function(cb) { var end = new Ender(name); fn(); end(cb); };
    } else {
      newFn = function(cb) { var end = new Ender(name, cb); fn(end); };
    }
    return originalTask.call(gulp, name, dep, newFn);
  }

  if (Array.isArray(dep) && dep.length === 1 && Array.isArray(dep[0])) {
    return _createSeqTask(name, dep[0], fn);
  } else {
    if (!fn && (typeof(dep) === 'function')) { fn = dep; dep = undefined; }
    return _createTask(name, dep, fn);
  }
};

}());
