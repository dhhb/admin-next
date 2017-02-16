import Mousetrap from 'mousetrap';

/**
 * adds a bindGlobal method to Mousetrap that allows you to
 * bind specific keyboard shortcuts that will still work
 * inside a text input field
 *
 * usage:
 * Mousetrap.bindGlobal('ctrl+s', _saveChanges);
 *
 * https://github.com/ccampbell/mousetrap/tree/master/plugins/global-bind
 */
const _globalCallbacks = {};
const _originalStopCallback = Mousetrap.prototype.stopCallback;

Mousetrap.prototype.stopCallback = function (e, element, combo, sequence) {
  const self = this;

  if (self.paused) {
    return true;
  }

  if (_globalCallbacks[combo] || _globalCallbacks[sequence]) {
    return false;
  }

  return _originalStopCallback.call(self, e, element, combo);
};

Mousetrap.prototype.bindGlobal = function (keys, callback, action) {
  const self = this;

  self.bind(keys, callback, action);

  if (keys instanceof Array) {
    for (let i = 0; i < keys.length; i++) {
      _globalCallbacks[keys[i]] = true;
    }
    return;
  }

  _globalCallbacks[keys] = true;
};

Mousetrap.init();

export default Mousetrap;

