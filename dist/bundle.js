/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/around.js":
/*!****************************!*\
  !*** ./src/core/around.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = around;\nfunction around(before, after) {\n  return function (target, name, descriptor) {\n    function decorate(fn) {\n      return function () {\n        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n          args[_key] = arguments[_key];\n        }\n\n        if (typeof before === 'function') {\n          before(target, name, descriptor, args);\n        }\n        var result = fn.bind(this).apply(undefined, args);\n        if (typeof after === 'function') {\n          after(target, name, descriptor, args, result);\n        }\n        return result;\n      };\n    }\n\n    if (descriptor.value) {\n      var fn = descriptor.value;\n      if (typeof fn === 'function') {\n        descriptor.value = decorate(fn);\n      }\n    } else if (typeof descriptor.get === 'function') {\n      var _fn = descriptor.get();\n      if (typeof _fn === 'function') {\n        descriptor.get = function () {\n          return decorate(_fn);\n        };\n      }\n    }\n\n    return descriptor;\n  };\n}\n\n//# sourceURL=webpack:///./src/core/around.js?");

/***/ }),

/***/ "./src/core/core-decorators.js":
/*!*************************************!*\
  !*** ./src/core/core-decorators.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.timer = exports.log = exports.around = exports.readonly = undefined;\n\nvar _readonly = __webpack_require__(/*! ./readonly */ \"./src/core/readonly.js\");\n\nvar _readonly2 = _interopRequireDefault(_readonly);\n\nvar _around = __webpack_require__(/*! ./around */ \"./src/core/around.js\");\n\nvar _around2 = _interopRequireDefault(_around);\n\nvar _log = __webpack_require__(/*! ./log */ \"./src/core/log.js\");\n\nvar _log2 = _interopRequireDefault(_log);\n\nvar _timer = __webpack_require__(/*! ./timer */ \"./src/core/timer.js\");\n\nvar _timer2 = _interopRequireDefault(_timer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.readonly = _readonly2.default;\nexports.around = _around2.default;\nexports.log = _log2.default;\nexports.timer = _timer2.default;\n\n//# sourceURL=webpack:///./src/core/core-decorators.js?");

/***/ }),

/***/ "./src/core/log.js":
/*!*************************!*\
  !*** ./src/core/log.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = log;\n\nvar _around = __webpack_require__(/*! ./around */ \"./src/core/around.js\");\n\nvar _around2 = _interopRequireDefault(_around);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction log(target, name, descriptor) {\n\n  return (0, _around2.default)(function (target, name, descriptor, args) {\n    return console.log('>> Function ' + name + ' starts, with arguments: ' + args);\n  }, function (target, name, descriptor, args, result) {\n    return console.log('<< Function ' + name + ' ends, returning: ' + result);\n  })(target, name, descriptor);\n}\n\n//# sourceURL=webpack:///./src/core/log.js?");

/***/ }),

/***/ "./src/core/readonly.js":
/*!******************************!*\
  !*** ./src/core/readonly.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = readonly;\nfunction readonly(target, name, descriptor) {\n  descriptor.writable = false;\n  return descriptor;\n}\n\n//# sourceURL=webpack:///./src/core/readonly.js?");

/***/ }),

/***/ "./src/core/timer.js":
/*!***************************!*\
  !*** ./src/core/timer.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = timer;\n\nvar _around = __webpack_require__(/*! ./around */ \"./src/core/around.js\");\n\nvar _around2 = _interopRequireDefault(_around);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction timer(target, name, descriptor) {\n  return (0, _around2.default)(function (target, name) {\n    return console.time(name);\n  }, function (target, name) {\n    return console.timeEnd(name);\n  })(target, name, descriptor);\n}\n\n//# sourceURL=webpack:///./src/core/timer.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _desc, _value, _class, _descriptor;\n\nvar _coreDecorators = __webpack_require__(/*! ./core/core-decorators */ \"./src/core/core-decorators.js\");\n\nfunction _initDefineProp(target, property, descriptor, context) {\n  if (!descriptor) return;\n  Object.defineProperty(target, property, {\n    enumerable: descriptor.enumerable,\n    configurable: descriptor.configurable,\n    writable: descriptor.writable,\n    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0\n  });\n}\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {\n  var desc = {};\n  Object['ke' + 'ys'](descriptor).forEach(function (key) {\n    desc[key] = descriptor[key];\n  });\n  desc.enumerable = !!desc.enumerable;\n  desc.configurable = !!desc.configurable;\n\n  if ('value' in desc || desc.initializer) {\n    desc.writable = true;\n  }\n\n  desc = decorators.slice().reverse().reduce(function (desc, decorator) {\n    return decorator(target, property, desc) || desc;\n  }, desc);\n\n  if (context && desc.initializer !== void 0) {\n    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;\n    desc.initializer = undefined;\n  }\n\n  if (desc.initializer === void 0) {\n    Object['define' + 'Property'](target, property, desc);\n    desc = null;\n  }\n\n  return desc;\n}\n\nfunction _initializerWarningHelper(descriptor, context) {\n  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');\n}\n\nvar Student = (_class = function () {\n  function Student() {\n    _classCallCheck(this, Student);\n\n    _initDefineProp(this, 'name', _descriptor, this);\n  }\n\n  _createClass(Student, [{\n    key: 'sayHello',\n    value: function sayHello() {\n      console.log('Hello, ' + this.name);\n    }\n  }]);\n\n  return Student;\n}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'name', [_coreDecorators.readonly], {\n  enumerable: true,\n  initializer: function initializer() {\n    return 'Tommy';\n  }\n}), _applyDecoratedDescriptor(_class.prototype, 'sayHello', [_coreDecorators.timer, _coreDecorators.log], Object.getOwnPropertyDescriptor(_class.prototype, 'sayHello'), _class.prototype)), _class);\n\n\nvar student = new Student();\ntry {\n  student.name = 'Adam';\n} catch (e) {\n  console.log('Exception caught:', e.message);\n}\nconsole.log('Student name:', student.name);\n\nconsole.log();\nstudent.sayHello();\nconsole.log();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });