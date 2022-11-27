"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("core-js/modules/es7.object.get-own-property-descriptors");
require("core-js/modules/es6.object.keys");
require("core-js/modules/es6.promise");
require("core-js/modules/es7.symbol.async-iterator");
require("core-js/modules/es6.symbol");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseJsbeautifyConfig = exports.parseDefaultJsbeautifyConfig = exports.finalizeJsbeautifyConfig = exports.extendJsbeautifyConfigWithEditorOverrides = exports.extendJsbeautifyConfigWithCurrentFileMatchRules = exports.extendJsbeautifyConfigFromFolders = exports.extendJsbeautifyConfigFromFile = exports.extendJsbeautifyConfigFromEditorConfigInFolders = exports.extendJsbeautifyConfigFromEditorConfigFile = exports.extendJsbeautifyConfig = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
require("core-js/modules/es7.object.entries");
require("regenerator-runtime/runtime");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _path = _interopRequireDefault(require("path"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _clone = _interopRequireDefault(require("lodash/clone"));
var _promiseArrays = _interopRequireDefault(require("promise-arrays"));
var _paths = require("./paths");
var _constants = require("./constants");
var _jsonUtils = require("./jsonUtils");
var _editorconfigUtils = require("./editorconfigUtils");
var _configSanitizers = require("./configSanitizers");
var _fileUtils = require("./fileUtils");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
// Parses a .jsbeautifyrc json file and returns a sanitized object
// with a consistent and expected format.
var parseJsbeautifyConfig = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(filePath) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _configSanitizers.sanitizeJsbeautifyConfig;
            _context.next = 3;
            return (0, _jsonUtils.parseJSON5File)(filePath);
          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt("return", (0, _context.t0)(_context.t1));
          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function parseJsbeautifyConfig(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Parses the default .jsbeautifyrc json file coming with this plugin.
exports.parseJsbeautifyConfig = parseJsbeautifyConfig;
var parseDefaultJsbeautifyConfig = function parseDefaultJsbeautifyConfig() {
  return parseJsbeautifyConfig(_path.default.join(_paths.ROOT_DIR, '.jsbeautifyrc.defaults.json'));
};

// Clones and extends a given .jsbeautifyrc object with the one located at a
// file path. If none exists, a clone of the original is returned.
exports.parseDefaultJsbeautifyConfig = parseDefaultJsbeautifyConfig;
var extendJsbeautifyConfig = function extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig) {
  var oldClonedJsbeautifyConfig = (0, _clone.default)(oldJsbeautifyConfig);
  for (var _i = 0, _Object$entries = Object.entries(newJsbeautifyConfig || {}); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
      fileType = _Object$entries$_i[0],
      newFileSettings = _Object$entries$_i[1];
    switch (fileType) {
      case 'all':
      case 'html':
      case 'css':
      case 'js':
      case 'json':
        oldClonedJsbeautifyConfig[fileType] = _objectSpread(_objectSpread({}, oldClonedJsbeautifyConfig[fileType] || {}), newFileSettings || {});
        break;
      case 'custom':
        for (var _i2 = 0, _Object$entries2 = Object.entries(newFileSettings || {}); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = (0, _slicedToArray2.default)(_Object$entries2[_i2], 2),
            globString = _Object$entries2$_i[0],
            newGlobConfig = _Object$entries2$_i[1];
          oldClonedJsbeautifyConfig.custom[globString] = _objectSpread(_objectSpread({}, oldClonedJsbeautifyConfig.custom[globString] || {}), newGlobConfig || {});
        }
        break;
      default:
        throw new Error("Unknown .jsbeautifyrc file type: ".concat(fileType));
    }
  }
  return oldClonedJsbeautifyConfig;
};

// Clones and extends a given .jsbeautifyrc object with the one located at a
// file path. If none exists, a clone of the original is returned.
exports.extendJsbeautifyConfig = extendJsbeautifyConfig;
var extendJsbeautifyConfigFromFile = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(filePath, oldJsbeautifyConfig) {
    var newJsbeautifyConfig;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return parseJsbeautifyConfig(filePath);
          case 2:
            newJsbeautifyConfig = _context2.sent;
            return _context2.abrupt("return", extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig));
          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function extendJsbeautifyConfigFromFile(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

// Clones and extends a given .jsbeautifyrc object with an .editorconfig file
// located at a file path. If none exists, a clone of the original is returned.
exports.extendJsbeautifyConfigFromFile = extendJsbeautifyConfigFromFile;
var extendJsbeautifyConfigFromEditorConfigFile = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(filePath, oldJsbeautifyConfig) {
    var newEditorConfig, newJsbeautifyConfig;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _editorconfigUtils.parseEditorConfigFile)(filePath);
          case 2:
            newEditorConfig = _context3.sent;
            newJsbeautifyConfig = (0, _configSanitizers.sanitizeJsbeautifyConfig)((0, _configSanitizers.translateEditorConfigToJsbeautifyConfig)(newEditorConfig));
            return _context3.abrupt("return", extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig));
          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function extendJsbeautifyConfigFromEditorConfigFile(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

// Clones and extends a given .jsbeautifyrc object with the first one found in
// a list of folder paths. If none exists, a clone of the original is returned.
exports.extendJsbeautifyConfigFromEditorConfigFile = extendJsbeautifyConfigFromEditorConfigFile;
var extendJsbeautifyConfigFromFolders = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(folderPaths, oldJsbeautifyConfig) {
    var filesToCheck, newJsbeautifyConfigPath;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            filesToCheck = folderPaths.map(function (f) {
              return _path.default.join(f, '.jsbeautifyrc');
            });
            _context4.next = 3;
            return _promiseArrays.default.filter(filesToCheck, _fsExtra.default.pathExists);
          case 3:
            newJsbeautifyConfigPath = _context4.sent[0];
            if (!newJsbeautifyConfigPath) {
              _context4.next = 6;
              break;
            }
            return _context4.abrupt("return", extendJsbeautifyConfigFromFile(newJsbeautifyConfigPath, oldJsbeautifyConfig));
          case 6:
            return _context4.abrupt("return", (0, _clone.default)(oldJsbeautifyConfig));
          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function extendJsbeautifyConfigFromFolders(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

// Clones and extends a given .jsbeautifyrc object with the first .editorconfig
// file found in a list of folder paths. If none exists, a clone of the original
// is returned.
exports.extendJsbeautifyConfigFromFolders = extendJsbeautifyConfigFromFolders;
var extendJsbeautifyConfigFromEditorConfigInFolders = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(folderPaths, oldJsbeautifyConfig) {
    var filesToCheck, newEditorConfigPath;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            filesToCheck = folderPaths.map(function (f) {
              return _path.default.join(f, '.editorconfig');
            });
            _context5.next = 3;
            return _promiseArrays.default.filter(filesToCheck, _fsExtra.default.pathExists);
          case 3:
            newEditorConfigPath = _context5.sent[0];
            if (!newEditorConfigPath) {
              _context5.next = 6;
              break;
            }
            return _context5.abrupt("return", extendJsbeautifyConfigFromEditorConfigFile(newEditorConfigPath, oldJsbeautifyConfig));
          case 6:
            return _context5.abrupt("return", (0, _clone.default)(oldJsbeautifyConfig));
          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function extendJsbeautifyConfigFromEditorConfigInFolders(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

// Clones and extends a given .jsbeautifyrc with some additional custom options
// defined in the "custom" field, which contains globs defining additional
// prettification rules for certain files paths.
exports.extendJsbeautifyConfigFromEditorConfigInFolders = extendJsbeautifyConfigFromEditorConfigInFolders;
var extendJsbeautifyConfigWithCurrentFileMatchRules = function extendJsbeautifyConfigWithCurrentFileMatchRules(jsbeautifyConfig) {
  var clonedJsbeautifyConfig = (0, _clone.default)(jsbeautifyConfig);
  clonedJsbeautifyConfig.currentFileMatchRules = {};
  for (var _i3 = 0, _Object$entries3 = Object.entries(clonedJsbeautifyConfig.custom || {}); _i3 < _Object$entries3.length; _i3++) {
    var _Object$entries3$_i = (0, _slicedToArray2.default)(_Object$entries3[_i3], 2),
      globString = _Object$entries3$_i[0],
      globFileConfig = _Object$entries3$_i[1];
    for (var _i4 = 0, _Object$entries4 = Object.entries(globFileConfig || {}); _i4 < _Object$entries4.length; _i4++) {
      var _Object$entries4$_i = (0, _slicedToArray2.default)(_Object$entries4[_i4], 2),
        prefName = _Object$entries4$_i[0],
        globPrefValue = _Object$entries4$_i[1];
      if ((0, _fileUtils.isMatchingGlob)(globString)) {
        clonedJsbeautifyConfig.currentFileMatchRules[prefName] = globPrefValue;
      }
    }
  }
  return clonedJsbeautifyConfig;
};

// Clones and extends a given .jsbeautifyrc with some additional custom options
// retrieved from the editor settings.
exports.extendJsbeautifyConfigWithCurrentFileMatchRules = extendJsbeautifyConfigWithCurrentFileMatchRules;
var extendJsbeautifyConfigWithEditorOverrides = function extendJsbeautifyConfigWithEditorOverrides(jsbeautifyConfig) {
  var clonedJsbeautifyConfig = (0, _clone.default)(jsbeautifyConfig);
  clonedJsbeautifyConfig.editorOverrides = {};
  if (_constants.EDITOR_INDENT_SIZE !== '?') {
    clonedJsbeautifyConfig.editorOverrides.indent_size = +_constants.EDITOR_INDENT_SIZE;
  }
  if (_constants.EDITOR_INDENT_WITH_TABS !== '?') {
    if (_constants.EDITOR_INDENT_WITH_TABS === 'True') {
      clonedJsbeautifyConfig.editorOverrides.indent_with_tabs = true;
      clonedJsbeautifyConfig.editorOverrides.indent_char = '\t';
    } else {
      clonedJsbeautifyConfig.editorOverrides.indent_with_tabs = false;
      clonedJsbeautifyConfig.editorOverrides.indent_char = ' ';
    }
  }
  return clonedJsbeautifyConfig;
};

// Clones and extends a given .jsbeautifyrc with some additional meta-options
// following some specific rules respecting global editor settings.
exports.extendJsbeautifyConfigWithEditorOverrides = extendJsbeautifyConfigWithEditorOverrides;
var finalizeJsbeautifyConfig = function finalizeJsbeautifyConfig(jsbeautifyConfig) {
  var extendedJsbeautifyConfig = extendJsbeautifyConfigWithCurrentFileMatchRules(extendJsbeautifyConfigWithEditorOverrides(jsbeautifyConfig));
  return {
    html: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, extendedJsbeautifyConfig.all || {}), extendedJsbeautifyConfig.html || {}), {}, {
      css: extendedJsbeautifyConfig.css,
      js: extendedJsbeautifyConfig.js
    }, extendedJsbeautifyConfig.currentFileMatchRules || {}), extendedJsbeautifyConfig.editorOverrides || {}),
    css: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, extendedJsbeautifyConfig.all || {}), extendedJsbeautifyConfig.css || {}), extendedJsbeautifyConfig.currentFileMatchRules || {}), extendedJsbeautifyConfig.editorOverrides || {}),
    js: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, extendedJsbeautifyConfig.all || {}), extendedJsbeautifyConfig.js || {}), extendedJsbeautifyConfig.currentFileMatchRules || {}), extendedJsbeautifyConfig.editorOverrides || {}),
    json: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, extendedJsbeautifyConfig.all || {}), extendedJsbeautifyConfig.json || {}), extendedJsbeautifyConfig.currentFileMatchRules || {}), extendedJsbeautifyConfig.editorOverrides || {})
  };
};
exports.finalizeJsbeautifyConfig = finalizeJsbeautifyConfig;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMvY29uZmlnVXRpbHMuanMiLCJuYW1lcyI6WyJwYXJzZUpzYmVhdXRpZnlDb25maWciLCJmaWxlUGF0aCIsInNhbml0aXplSnNiZWF1dGlmeUNvbmZpZyIsInBhcnNlSlNPTjVGaWxlIiwicGFyc2VEZWZhdWx0SnNiZWF1dGlmeUNvbmZpZyIsInBhdGgiLCJqb2luIiwiUk9PVF9ESVIiLCJleHRlbmRKc2JlYXV0aWZ5Q29uZmlnIiwibmV3SnNiZWF1dGlmeUNvbmZpZyIsIm9sZEpzYmVhdXRpZnlDb25maWciLCJvbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnIiwiY2xvbmUiLCJPYmplY3QiLCJlbnRyaWVzIiwiZmlsZVR5cGUiLCJuZXdGaWxlU2V0dGluZ3MiLCJnbG9iU3RyaW5nIiwibmV3R2xvYkNvbmZpZyIsImN1c3RvbSIsIkVycm9yIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21GaWxlIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21FZGl0b3JDb25maWdGaWxlIiwicGFyc2VFZGl0b3JDb25maWdGaWxlIiwibmV3RWRpdG9yQ29uZmlnIiwidHJhbnNsYXRlRWRpdG9yQ29uZmlnVG9Kc2JlYXV0aWZ5Q29uZmlnIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21Gb2xkZXJzIiwiZm9sZGVyUGF0aHMiLCJmaWxlc1RvQ2hlY2siLCJtYXAiLCJmIiwicHJvbWlzZUFycmF5cyIsImZpbHRlciIsImZzIiwicGF0aEV4aXN0cyIsIm5ld0pzYmVhdXRpZnlDb25maWdQYXRoIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21FZGl0b3JDb25maWdJbkZvbGRlcnMiLCJuZXdFZGl0b3JDb25maWdQYXRoIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ1dpdGhDdXJyZW50RmlsZU1hdGNoUnVsZXMiLCJqc2JlYXV0aWZ5Q29uZmlnIiwiY2xvbmVkSnNiZWF1dGlmeUNvbmZpZyIsImN1cnJlbnRGaWxlTWF0Y2hSdWxlcyIsImdsb2JGaWxlQ29uZmlnIiwicHJlZk5hbWUiLCJnbG9iUHJlZlZhbHVlIiwiaXNNYXRjaGluZ0dsb2IiLCJleHRlbmRKc2JlYXV0aWZ5Q29uZmlnV2l0aEVkaXRvck92ZXJyaWRlcyIsImVkaXRvck92ZXJyaWRlcyIsIkVESVRPUl9JTkRFTlRfU0laRSIsImluZGVudF9zaXplIiwiRURJVE9SX0lOREVOVF9XSVRIX1RBQlMiLCJpbmRlbnRfd2l0aF90YWJzIiwiaW5kZW50X2NoYXIiLCJmaW5hbGl6ZUpzYmVhdXRpZnlDb25maWciLCJleHRlbmRlZEpzYmVhdXRpZnlDb25maWciLCJodG1sIiwiYWxsIiwiY3NzIiwianMiLCJqc29uIl0sInNvdXJjZXMiOlsidXRpbHMvY29uZmlnVXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IGNsb25lIGZyb20gJ2xvZGFzaC9jbG9uZSc7XG5pbXBvcnQgcHJvbWlzZUFycmF5cyBmcm9tICdwcm9taXNlLWFycmF5cyc7XG5cbmltcG9ydCB7IFJPT1RfRElSIH0gZnJvbSAnLi9wYXRocyc7XG5pbXBvcnQgeyBFRElUT1JfSU5ERU5UX1NJWkUsIEVESVRPUl9JTkRFTlRfV0lUSF9UQUJTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgcGFyc2VKU09ONUZpbGUgfSBmcm9tICcuL2pzb25VdGlscyc7XG5pbXBvcnQgeyBwYXJzZUVkaXRvckNvbmZpZ0ZpbGUgfSBmcm9tICcuL2VkaXRvcmNvbmZpZ1V0aWxzJztcbmltcG9ydCB7IHNhbml0aXplSnNiZWF1dGlmeUNvbmZpZywgdHJhbnNsYXRlRWRpdG9yQ29uZmlnVG9Kc2JlYXV0aWZ5Q29uZmlnIH0gZnJvbSAnLi9jb25maWdTYW5pdGl6ZXJzJztcbmltcG9ydCB7IGlzTWF0Y2hpbmdHbG9iIH0gZnJvbSAnLi9maWxlVXRpbHMnO1xuXG4vLyBQYXJzZXMgYSAuanNiZWF1dGlmeXJjIGpzb24gZmlsZSBhbmQgcmV0dXJucyBhIHNhbml0aXplZCBvYmplY3Rcbi8vIHdpdGggYSBjb25zaXN0ZW50IGFuZCBleHBlY3RlZCBmb3JtYXQuXG5leHBvcnQgY29uc3QgcGFyc2VKc2JlYXV0aWZ5Q29uZmlnID0gYXN5bmMgZmlsZVBhdGggPT4gc2FuaXRpemVKc2JlYXV0aWZ5Q29uZmlnKGF3YWl0IHBhcnNlSlNPTjVGaWxlKGZpbGVQYXRoKSk7XG5cbi8vIFBhcnNlcyB0aGUgZGVmYXVsdCAuanNiZWF1dGlmeXJjIGpzb24gZmlsZSBjb21pbmcgd2l0aCB0aGlzIHBsdWdpbi5cbmV4cG9ydCBjb25zdCBwYXJzZURlZmF1bHRKc2JlYXV0aWZ5Q29uZmlnID0gKCkgPT4gcGFyc2VKc2JlYXV0aWZ5Q29uZmlnKHBhdGguam9pbihST09UX0RJUiwgJy5qc2JlYXV0aWZ5cmMuZGVmYXVsdHMuanNvbicpKTtcblxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyBvYmplY3Qgd2l0aCB0aGUgb25lIGxvY2F0ZWQgYXQgYVxuLy8gZmlsZSBwYXRoLiBJZiBub25lIGV4aXN0cywgYSBjbG9uZSBvZiB0aGUgb3JpZ2luYWwgaXMgcmV0dXJuZWQuXG5leHBvcnQgY29uc3QgZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZyA9IChuZXdKc2JlYXV0aWZ5Q29uZmlnLCBvbGRKc2JlYXV0aWZ5Q29uZmlnKSA9PiB7XG4gIGNvbnN0IG9sZENsb25lZEpzYmVhdXRpZnlDb25maWcgPSBjbG9uZShvbGRKc2JlYXV0aWZ5Q29uZmlnKTtcblxuICBmb3IgKGNvbnN0IFtmaWxlVHlwZSwgbmV3RmlsZVNldHRpbmdzXSBvZiBPYmplY3QuZW50cmllcyhuZXdKc2JlYXV0aWZ5Q29uZmlnIHx8IHt9KSkge1xuICAgIHN3aXRjaCAoZmlsZVR5cGUpIHtcbiAgICAgIGNhc2UgJ2FsbCc6XG4gICAgICBjYXNlICdodG1sJzpcbiAgICAgIGNhc2UgJ2Nzcyc6XG4gICAgICBjYXNlICdqcyc6XG4gICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgb2xkQ2xvbmVkSnNiZWF1dGlmeUNvbmZpZ1tmaWxlVHlwZV0gPSB7XG4gICAgICAgICAgLi4ub2xkQ2xvbmVkSnNiZWF1dGlmeUNvbmZpZ1tmaWxlVHlwZV0gfHwge30sXG4gICAgICAgICAgLi4ubmV3RmlsZVNldHRpbmdzIHx8IHt9LFxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgIGZvciAoY29uc3QgW2dsb2JTdHJpbmcsIG5ld0dsb2JDb25maWddIG9mIE9iamVjdC5lbnRyaWVzKG5ld0ZpbGVTZXR0aW5ncyB8fCB7fSkpIHtcbiAgICAgICAgICBvbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmN1c3RvbVtnbG9iU3RyaW5nXSA9IHtcbiAgICAgICAgICAgIC4uLm9sZENsb25lZEpzYmVhdXRpZnlDb25maWcuY3VzdG9tW2dsb2JTdHJpbmddIHx8IHt9LFxuICAgICAgICAgICAgLi4ubmV3R2xvYkNvbmZpZyB8fCB7fSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIC5qc2JlYXV0aWZ5cmMgZmlsZSB0eXBlOiAke2ZpbGVUeXBlfWApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnO1xufTtcblxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyBvYmplY3Qgd2l0aCB0aGUgb25lIGxvY2F0ZWQgYXQgYVxuLy8gZmlsZSBwYXRoLiBJZiBub25lIGV4aXN0cywgYSBjbG9uZSBvZiB0aGUgb3JpZ2luYWwgaXMgcmV0dXJuZWQuXG5leHBvcnQgY29uc3QgZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21GaWxlID0gYXN5bmMgKGZpbGVQYXRoLCBvbGRKc2JlYXV0aWZ5Q29uZmlnKSA9PiB7XG4gIGNvbnN0IG5ld0pzYmVhdXRpZnlDb25maWcgPSBhd2FpdCBwYXJzZUpzYmVhdXRpZnlDb25maWcoZmlsZVBhdGgpO1xuICByZXR1cm4gZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZyhuZXdKc2JlYXV0aWZ5Q29uZmlnLCBvbGRKc2JlYXV0aWZ5Q29uZmlnKTtcbn07XG5cbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgb2JqZWN0IHdpdGggYW4gLmVkaXRvcmNvbmZpZyBmaWxlXG4vLyBsb2NhdGVkIGF0IGEgZmlsZSBwYXRoLiBJZiBub25lIGV4aXN0cywgYSBjbG9uZSBvZiB0aGUgb3JpZ2luYWwgaXMgcmV0dXJuZWQuXG5leHBvcnQgY29uc3QgZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21FZGl0b3JDb25maWdGaWxlID0gYXN5bmMgKGZpbGVQYXRoLCBvbGRKc2JlYXV0aWZ5Q29uZmlnKSA9PiB7XG4gIGNvbnN0IG5ld0VkaXRvckNvbmZpZyA9IGF3YWl0IHBhcnNlRWRpdG9yQ29uZmlnRmlsZShmaWxlUGF0aCk7XG4gIGNvbnN0IG5ld0pzYmVhdXRpZnlDb25maWcgPSBzYW5pdGl6ZUpzYmVhdXRpZnlDb25maWcodHJhbnNsYXRlRWRpdG9yQ29uZmlnVG9Kc2JlYXV0aWZ5Q29uZmlnKG5ld0VkaXRvckNvbmZpZykpO1xuICByZXR1cm4gZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZyhuZXdKc2JlYXV0aWZ5Q29uZmlnLCBvbGRKc2JlYXV0aWZ5Q29uZmlnKTtcbn07XG5cbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgb2JqZWN0IHdpdGggdGhlIGZpcnN0IG9uZSBmb3VuZCBpblxuLy8gYSBsaXN0IG9mIGZvbGRlciBwYXRocy4gSWYgbm9uZSBleGlzdHMsIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGlzIHJldHVybmVkLlxuZXhwb3J0IGNvbnN0IGV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRm9sZGVycyA9IGFzeW5jIChmb2xkZXJQYXRocywgb2xkSnNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBmaWxlc1RvQ2hlY2sgPSBmb2xkZXJQYXRocy5tYXAoZiA9PiBwYXRoLmpvaW4oZiwgJy5qc2JlYXV0aWZ5cmMnKSk7XG4gIGNvbnN0IG5ld0pzYmVhdXRpZnlDb25maWdQYXRoID0gKGF3YWl0IHByb21pc2VBcnJheXMuZmlsdGVyKGZpbGVzVG9DaGVjaywgZnMucGF0aEV4aXN0cykpWzBdO1xuXG4gIGlmIChuZXdKc2JlYXV0aWZ5Q29uZmlnUGF0aCkge1xuICAgIHJldHVybiBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUZpbGUobmV3SnNiZWF1dGlmeUNvbmZpZ1BhdGgsIG9sZEpzYmVhdXRpZnlDb25maWcpO1xuICB9XG5cbiAgcmV0dXJuIGNsb25lKG9sZEpzYmVhdXRpZnlDb25maWcpO1xufTtcblxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyBvYmplY3Qgd2l0aCB0aGUgZmlyc3QgLmVkaXRvcmNvbmZpZ1xuLy8gZmlsZSBmb3VuZCBpbiBhIGxpc3Qgb2YgZm9sZGVyIHBhdGhzLiBJZiBub25lIGV4aXN0cywgYSBjbG9uZSBvZiB0aGUgb3JpZ2luYWxcbi8vIGlzIHJldHVybmVkLlxuZXhwb3J0IGNvbnN0IGV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnSW5Gb2xkZXJzID0gYXN5bmMgKGZvbGRlclBhdGhzLCBvbGRKc2JlYXV0aWZ5Q29uZmlnKSA9PiB7XG4gIGNvbnN0IGZpbGVzVG9DaGVjayA9IGZvbGRlclBhdGhzLm1hcChmID0+IHBhdGguam9pbihmLCAnLmVkaXRvcmNvbmZpZycpKTtcbiAgY29uc3QgbmV3RWRpdG9yQ29uZmlnUGF0aCA9IChhd2FpdCBwcm9taXNlQXJyYXlzLmZpbHRlcihmaWxlc1RvQ2hlY2ssIGZzLnBhdGhFeGlzdHMpKVswXTtcblxuICBpZiAobmV3RWRpdG9yQ29uZmlnUGF0aCkge1xuICAgIHJldHVybiBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUVkaXRvckNvbmZpZ0ZpbGUobmV3RWRpdG9yQ29uZmlnUGF0aCwgb2xkSnNiZWF1dGlmeUNvbmZpZyk7XG4gIH1cblxuICByZXR1cm4gY2xvbmUob2xkSnNiZWF1dGlmeUNvbmZpZyk7XG59O1xuXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIHdpdGggc29tZSBhZGRpdGlvbmFsIGN1c3RvbSBvcHRpb25zXG4vLyBkZWZpbmVkIGluIHRoZSBcImN1c3RvbVwiIGZpZWxkLCB3aGljaCBjb250YWlucyBnbG9icyBkZWZpbmluZyBhZGRpdGlvbmFsXG4vLyBwcmV0dGlmaWNhdGlvbiBydWxlcyBmb3IgY2VydGFpbiBmaWxlcyBwYXRocy5cbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnV2l0aEN1cnJlbnRGaWxlTWF0Y2hSdWxlcyA9IChqc2JlYXV0aWZ5Q29uZmlnKSA9PiB7XG4gIGNvbnN0IGNsb25lZEpzYmVhdXRpZnlDb25maWcgPSBjbG9uZShqc2JlYXV0aWZ5Q29uZmlnKTtcbiAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5jdXJyZW50RmlsZU1hdGNoUnVsZXMgPSB7fTtcblxuICBmb3IgKGNvbnN0IFtnbG9iU3RyaW5nLCBnbG9iRmlsZUNvbmZpZ10gb2YgT2JqZWN0LmVudHJpZXMoY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5jdXN0b20gfHwge30pKSB7XG4gICAgZm9yIChjb25zdCBbcHJlZk5hbWUsIGdsb2JQcmVmVmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGdsb2JGaWxlQ29uZmlnIHx8IHt9KSkge1xuICAgICAgaWYgKGlzTWF0Y2hpbmdHbG9iKGdsb2JTdHJpbmcpKSB7XG4gICAgICAgIGNsb25lZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzW3ByZWZOYW1lXSA9IGdsb2JQcmVmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNsb25lZEpzYmVhdXRpZnlDb25maWc7XG59O1xuXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIHdpdGggc29tZSBhZGRpdGlvbmFsIGN1c3RvbSBvcHRpb25zXG4vLyByZXRyaWV2ZWQgZnJvbSB0aGUgZWRpdG9yIHNldHRpbmdzLlxuZXhwb3J0IGNvbnN0IGV4dGVuZEpzYmVhdXRpZnlDb25maWdXaXRoRWRpdG9yT3ZlcnJpZGVzID0gKGpzYmVhdXRpZnlDb25maWcpID0+IHtcbiAgY29uc3QgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZyA9IGNsb25lKGpzYmVhdXRpZnlDb25maWcpO1xuICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcyA9IHt9O1xuXG4gIGlmIChFRElUT1JfSU5ERU5UX1NJWkUgIT09ICc/Jykge1xuICAgIGNsb25lZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzLmluZGVudF9zaXplID0gK0VESVRPUl9JTkRFTlRfU0laRTtcbiAgfVxuXG4gIGlmIChFRElUT1JfSU5ERU5UX1dJVEhfVEFCUyAhPT0gJz8nKSB7XG4gICAgaWYgKEVESVRPUl9JTkRFTlRfV0lUSF9UQUJTID09PSAnVHJ1ZScpIHtcbiAgICAgIGNsb25lZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzLmluZGVudF93aXRoX3RhYnMgPSB0cnVlO1xuICAgICAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMuaW5kZW50X2NoYXIgPSAnXFx0JztcbiAgICB9IGVsc2Uge1xuICAgICAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMuaW5kZW50X3dpdGhfdGFicyA9IGZhbHNlO1xuICAgICAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMuaW5kZW50X2NoYXIgPSAnICc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNsb25lZEpzYmVhdXRpZnlDb25maWc7XG59O1xuXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIHdpdGggc29tZSBhZGRpdGlvbmFsIG1ldGEtb3B0aW9uc1xuLy8gZm9sbG93aW5nIHNvbWUgc3BlY2lmaWMgcnVsZXMgcmVzcGVjdGluZyBnbG9iYWwgZWRpdG9yIHNldHRpbmdzLlxuZXhwb3J0IGNvbnN0IGZpbmFsaXplSnNiZWF1dGlmeUNvbmZpZyA9IChqc2JlYXV0aWZ5Q29uZmlnKSA9PiB7XG4gIGNvbnN0IGV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZyA9IGV4dGVuZEpzYmVhdXRpZnlDb25maWdXaXRoQ3VycmVudEZpbGVNYXRjaFJ1bGVzKFxuICAgIGV4dGVuZEpzYmVhdXRpZnlDb25maWdXaXRoRWRpdG9yT3ZlcnJpZGVzKFxuICAgICAganNiZWF1dGlmeUNvbmZpZyxcbiAgICApLFxuICApO1xuXG4gIHJldHVybiB7XG4gICAgaHRtbDoge1xuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmFsbCB8fCB7fSxcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5odG1sIHx8IHt9LFxuICAgICAgY3NzOiBleHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3NzLFxuICAgICAganM6IGV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5qcyxcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5jdXJyZW50RmlsZU1hdGNoUnVsZXMgfHwge30sXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzIHx8IHt9LFxuICAgIH0sXG5cbiAgICBjc3M6IHtcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5hbGwgfHwge30sXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3NzIHx8IHt9LFxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmN1cnJlbnRGaWxlTWF0Y2hSdWxlcyB8fCB7fSxcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMgfHwge30sXG4gICAgfSxcblxuICAgIGpzOiB7XG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuYWxsIHx8IHt9LFxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmpzIHx8IHt9LFxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmN1cnJlbnRGaWxlTWF0Y2hSdWxlcyB8fCB7fSxcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMgfHwge30sXG4gICAgfSxcblxuICAgIGpzb246IHtcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5hbGwgfHwge30sXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuanNvbiB8fCB7fSxcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5jdXJyZW50RmlsZU1hdGNoUnVsZXMgfHwge30sXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzIHx8IHt9LFxuICAgIH0sXG4gIH07XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQTZDO0FBQUE7QUFBQSwrQ0FiN0M7QUFlQTtBQUNBO0FBQ08sSUFBTUEscUJBQXFCO0VBQUEsb0ZBQUcsaUJBQU1DLFFBQVE7SUFBQTtNQUFBO1FBQUE7VUFBQTtZQUFBLGNBQUlDLDBDQUF3QjtZQUFBO1lBQUEsT0FBTyxJQUFBQyx5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
