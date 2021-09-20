(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var pipe = function pipe(initVal) {
    for (var _len = arguments.length, fns = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      fns[_key - 1] = arguments[_key];
    }

    return fns.reduce(function (returned, fn) {
      return fn(returned);
    }, initVal);
  };
  /**
   * 
   * @param {*} msg data
   * @param {*} sub subscriber that subscribe the data
   */


  var Pubsub = function Pubsub(initData) {
    var _store = {
      subs: []
    };

    var ack = function ack(_ref) {
      var topic = _ref.topic;

      if (topic === 'store') {
        _store.subs.forEach(function (sub) {
          return sub(_store);
        });
      } else {
        _store[topic].subs.forEach(function (sub) {
          return sub(_store[topic].data);
        });
      }
    };

    var _subscribe = function subscribe(_ref2) {
      var topic = _ref2.topic,
          sub = _ref2.sub;

      if (topic === 'store') {
        _store.subs.push(sub);
      } else {
        if (!_store[topic]) Object.assign(_store, _defineProperty({}, topic, {
          subs: []
        }));else {
          _store[topic].subs.push(sub);
        }
      }

      return {
        topic: topic
      };
    };

    var getData = function getData(_store) {
      return function (topic) {
        return _store[topic].data;
      };
    };

    var publish = function publish(topic, msgs) {
      var prevStore = _store[topic];

      var temp = _defineProperty({}, topic, {
        data: prevStore ? _objectSpread2(_objectSpread2({}, prevStore['data']), msgs) : _objectSpread2(_defineProperty({}, Symbol.toStringTag, topic), msgs),
        subs: prevStore ? _toConsumableArray(prevStore['subs']) : []
      });

      Object.assign(_store, temp);
      return {
        topic: topic
      };
    };

    var mutate = function mutate(topic, msgs) {
      return [pipe(publish(topic, msgs), ack)];
    };

    var action = function action(topic, fn) {
      var _fn;

      return [pipe(publish(topic, (_fn = fn(getData(_store)(topic))) !== null && _fn !== void 0 ? _fn : {}), ack)];
    };

    if (initData) Object.entries(initData).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          topic = _ref4[0],
          data = _ref4[1];

      return publish(topic, data);
    });
    return {
      mutate: mutate,
      publish: publish,
      subscribe: function subscribe(topic, sub) {
        return _subscribe({
          topic: topic,
          sub: sub
        });
      },
      getData: getData(_store),
      action: action
    };
  };

  module.exports = {
    Pubsub: Pubsub
  };

})));
//# sourceMappingURL=pubsub.js.map
