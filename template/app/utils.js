import _ from 'lodash';

export default utils = {
  detectEnterKey: function(e) {
    var keycode;
    if (e) {
      keycode = e.which;
    } else if (window.event) {
      keycode = window.event.keyCode;
    } else {
      return false;
    }
    return keycode == 13;
  },

  noop() {
    return null;
  },

  whitelist: function(obj, props) {
    var copy = {};
    var includeProps = {};
    if (_.isArray(props)) {
      var i = 0;
      for (i; i < props.length; i++) {
        includeProps[props[i]] = true;
      }
      i = null;
    } else if (_.isString(props)) {
      includeProps[props] = true;
    } else {
      throw new Error('ERROR:  BLACKLIST EXPECTS STRING OR ARRAY AS SECOND ARGUMENT');
    }

    for (var key in obj) {
      if (includeProps[key]) {
        copy[key] = obj[key];
      }
    }
    return copy;
  },

  blacklist: function(obj, props) {
    var copy = {};
    var skipProps = {};
    if (_.isArray(props)) {
      var i = 0;
      for (i; i < props.length; i++) {
        skipProps[props[i]] = true;
      }
      i = null;
    } else if (_.isString(props)) {
      skipProps[props] = true;
    } else {
      throw new Error('ERROR:  BLACKLIST EXPECTS STRING OR ARRAY AS SECOND ARGUMENT');
    }

    for (var key in obj) {
      if (skipProps[key]) {
        continue;
      }
      copy[key] = obj[key];
    }
    return copy;
  }
};