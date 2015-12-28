function Ender(taskname, taskCb) {
  function _popCallback(keys) {
    return (typeof(keys[keys.length -1]) === 'function') ? keys.pop() : null;
  }

  var _ender, _wait, _ntf;
  var info = SeqEngine.getInfoByRunningTask(taskname);
  if (info != null) {
    _ender = function(cb) {
      SeqEngine.endTask(info, taskname, function() {
        if (typeof(cb) === 'function') { cb(); }
        if (typeof(taskCb) === 'function') { taskCb(); }
      });
    };
    _wait = function(/*...keys [, cb]*/) {
      var keys = Array.prototype.slice.call(arguments);
      var cb = _popCallback(keys);
      SeqEngine.waitTask(info, taskname, keys, cb);
      return _ender;
    };
    _ntf = function(key, cb) {
      SeqEngine.notifyTask(info, taskname, key, cb, taskCb);
      return _ender;
    };
  } else {
    _ender = function(cb) {
      if (typeof(cb) === 'function') { cb(); }
      if (typeof(taskCb) === 'function') { taskCb(); }
    };
    var _waitKeys = {}, _waitCb;
    _wait = function() {
      var keys = Array.prototype.slice.call(arguments);
      _waitCb = _popCallback(keys);
      for (var i=0, n=keys.length; i<n; i++) { _waitKeys[keys[i]] = true; }
      return _ender;
    };
    _ntf = function(key, cb) {
      if (typeof(cb) === 'function') { cb(); }
      delete _waitKeys[key];
      if (Object.keys(_waitKeys).length === 0) {
        if (typeof(_waitCb) === 'function') { _waitCb(); }
        if (typeof(taskCb) === 'function') { taskCb(); }
      }
      return _ender;
    };
  }

  _ender.with = function(cb) { return function() { _ender(cb); }; };
  _ender.wait = _wait;
  _ender.notify = _ntf;
  _ender.notifier = function(key,cb) { return function() { _ntf(key,cb); }; };

  return _ender;
}
