"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("core-js/modules/es7.symbol.async-iterator");
require("core-js/modules/es6.symbol");
require("core-js/modules/es6.array.from");
require("core-js/modules/es6.regexp.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMatchingGlob = exports.isJSON = exports.isJS = exports.isHTML = exports.isCSS = void 0;
require("core-js/modules/es7.array.includes");
require("core-js/modules/es6.string.includes");
require("core-js/modules/es6.regexp.constructor");
require("core-js/modules/es6.regexp.match");
var _path = require("path");
var _minimatch = _interopRequireDefault(require("minimatch"));
var _constants = require("./constants");
var _jsonUtils = require("./jsonUtils");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var GLOBAL_FILE_RULES = (0, _jsonUtils.parseJSON5)(_constants.GLOBAL_FILE_RULES_JSON);

// Checks if a file path is allowed by regexing the file name and expecting
// it not to match certain expressions.
var hasDisallowedFilePathPattern = function hasDisallowedFilePathPattern(fileType, filePath) {
  var _iterator = _createForOfIteratorHelper((GLOBAL_FILE_RULES[fileType] || {}).disallowed_file_patterns || []),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var pattern = _step.value;
      if (filePath.match(new RegExp(pattern, 'i'))) {
        return true;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return false;
};

// Checks if a file is of a particular type by regexing the file name and
// expecting a certain extension.
var hasAllowedFileExtension = function hasAllowedFileExtension(expectedType, filePath) {
  var _iterator2 = _createForOfIteratorHelper((GLOBAL_FILE_RULES[expectedType] || {}).allowed_file_extensions || []),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var extension = _step2.value;
      if (filePath.match(new RegExp("\\.".concat(extension, "$"), 'i'))) {
        return true;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return false;
};

// Checks if a file is of a particular type by regexing the syntax name and
// expecting a pattern.
var hasAllowedFileSyntax = function hasAllowedFileSyntax(expectedType, fileSyntax) {
  var _iterator3 = _createForOfIteratorHelper((GLOBAL_FILE_RULES[expectedType] || {}).allowed_file_syntaxes || []),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var pattern = _step3.value;
      if (fileSyntax.toLowerCase().includes(pattern)) {
        return true;
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return false;
};
var isCSS = function isCSS() {
  var isSavedFile = _constants.ORIGINAL_FILE_PATH !== '?';
  var useEditorFileSyntaxForDeterminingFileType = _constants.EDITOR_FILE_SYNTAX !== '?';
  var isAllowedExtension = hasAllowedFileExtension('css', _constants.ORIGINAL_FILE_PATH);
  var isAllowedSyntax = hasAllowedFileSyntax('css', _constants.EDITOR_FILE_SYNTAX);
  var isDisallowedFilePattern = hasDisallowedFilePathPattern('css', _constants.ORIGINAL_FILE_PATH);
  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax : false;
  }
  if (isDisallowedFilePattern) {
    return false;
  }
  return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isAllowedExtension : isAllowedExtension;
};
exports.isCSS = isCSS;
var isHTML = function isHTML(bufferContents) {
  var isSavedFile = _constants.ORIGINAL_FILE_PATH !== '?';
  var useEditorFileSyntaxForDeterminingFileType = _constants.EDITOR_FILE_SYNTAX !== '?';
  var isAllowedExtension = hasAllowedFileExtension('html', _constants.ORIGINAL_FILE_PATH);
  var isAllowedSyntax = hasAllowedFileSyntax('html', _constants.EDITOR_FILE_SYNTAX);
  var isDisallowedFilePattern = hasDisallowedFilePathPattern('html', _constants.ORIGINAL_FILE_PATH);
  var isMaybeHtml = bufferContents.match(/^\s*</);
  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isMaybeHtml : isMaybeHtml;
  }
  if (isDisallowedFilePattern) {
    return false;
  }
  return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isAllowedExtension : isAllowedExtension;
};
exports.isHTML = isHTML;
var isJSON = function isJSON(bufferContents) {
  var isSavedFile = _constants.ORIGINAL_FILE_PATH !== '?';
  var useEditorFileSyntaxForDeterminingFileType = _constants.EDITOR_FILE_SYNTAX !== '?';
  var isAllowedExtension = hasAllowedFileExtension('json', _constants.ORIGINAL_FILE_PATH);
  var isAllowedSyntax = hasAllowedFileSyntax('json', _constants.EDITOR_FILE_SYNTAX);
  var isDisallowedFilePattern = hasDisallowedFilePathPattern('json', _constants.ORIGINAL_FILE_PATH);
  var isMaybeJson = bufferContents.match(/^\s*[{[]/);
  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isMaybeJson : isMaybeJson;
  }
  if (isDisallowedFilePattern) {
    return false;
  }
  return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isAllowedExtension : isAllowedExtension;
};
exports.isJSON = isJSON;
var isJS = function isJS(bufferContents) {
  var isSavedFile = _constants.ORIGINAL_FILE_PATH !== '?';
  var useEditorFileSyntaxForDeterminingFileType = _constants.EDITOR_FILE_SYNTAX !== '?';
  var isAllowedExtension = hasAllowedFileExtension('js', _constants.ORIGINAL_FILE_PATH);
  var isAllowedSyntax = hasAllowedFileSyntax('js', _constants.EDITOR_FILE_SYNTAX);
  var isDisallowedFilePattern = hasDisallowedFilePathPattern('js', _constants.ORIGINAL_FILE_PATH);
  var isMaybeJs = !bufferContents.match(/^\s*</);
  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isMaybeJs : isMaybeJs;
  }
  if (isDisallowedFilePattern) {
    return false;
  }
  return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isAllowedExtension : isAllowedExtension;
};

// Checks if a file path matches a particular glob string.
exports.isJS = isJS;
var isMatchingGlob = function isMatchingGlob(globString) {
  // If file unsaved, reject glob matching;
  if (_constants.ORIGINAL_FILE_PATH === '?') {
    return false;
  }
  return (0, _minimatch.default)(_constants.ORIGINAL_FILE_PATH, globString) || (0, _minimatch.default)((0, _path.basename)(_constants.ORIGINAL_FILE_PATH), globString);
};
exports.isMatchingGlob = isMatchingGlob;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMvZmlsZVV0aWxzLmpzIiwibmFtZXMiOlsiR0xPQkFMX0ZJTEVfUlVMRVMiLCJwYXJzZUpTT041IiwiR0xPQkFMX0ZJTEVfUlVMRVNfSlNPTiIsImhhc0Rpc2FsbG93ZWRGaWxlUGF0aFBhdHRlcm4iLCJmaWxlVHlwZSIsImZpbGVQYXRoIiwiZGlzYWxsb3dlZF9maWxlX3BhdHRlcm5zIiwicGF0dGVybiIsIm1hdGNoIiwiUmVnRXhwIiwiaGFzQWxsb3dlZEZpbGVFeHRlbnNpb24iLCJleHBlY3RlZFR5cGUiLCJhbGxvd2VkX2ZpbGVfZXh0ZW5zaW9ucyIsImV4dGVuc2lvbiIsImhhc0FsbG93ZWRGaWxlU3ludGF4IiwiZmlsZVN5bnRheCIsImFsbG93ZWRfZmlsZV9zeW50YXhlcyIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJpc0NTUyIsImlzU2F2ZWRGaWxlIiwiT1JJR0lOQUxfRklMRV9QQVRIIiwidXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGUiLCJFRElUT1JfRklMRV9TWU5UQVgiLCJpc0FsbG93ZWRFeHRlbnNpb24iLCJpc0FsbG93ZWRTeW50YXgiLCJpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybiIsImlzSFRNTCIsImJ1ZmZlckNvbnRlbnRzIiwiaXNNYXliZUh0bWwiLCJpc0pTT04iLCJpc01heWJlSnNvbiIsImlzSlMiLCJpc01heWJlSnMiLCJpc01hdGNoaW5nR2xvYiIsImdsb2JTdHJpbmciLCJtaW5pbWF0Y2giLCJiYXNlbmFtZSJdLCJzb3VyY2VzIjpbInV0aWxzL2ZpbGVVdGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuXG5pbXBvcnQgeyBiYXNlbmFtZSB9IGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgbWluaW1hdGNoIGZyb20gJ21pbmltYXRjaCc7XG5cbmltcG9ydCB7IEdMT0JBTF9GSUxFX1JVTEVTX0pTT04sIE9SSUdJTkFMX0ZJTEVfUEFUSCwgRURJVE9SX0ZJTEVfU1lOVEFYIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgcGFyc2VKU09ONSB9IGZyb20gJy4vanNvblV0aWxzJztcblxuY29uc3QgR0xPQkFMX0ZJTEVfUlVMRVMgPSBwYXJzZUpTT041KEdMT0JBTF9GSUxFX1JVTEVTX0pTT04pO1xuXG4vLyBDaGVja3MgaWYgYSBmaWxlIHBhdGggaXMgYWxsb3dlZCBieSByZWdleGluZyB0aGUgZmlsZSBuYW1lIGFuZCBleHBlY3Rpbmdcbi8vIGl0IG5vdCB0byBtYXRjaCBjZXJ0YWluIGV4cHJlc3Npb25zLlxuY29uc3QgaGFzRGlzYWxsb3dlZEZpbGVQYXRoUGF0dGVybiA9IChmaWxlVHlwZSwgZmlsZVBhdGgpID0+IHtcbiAgZm9yIChjb25zdCBwYXR0ZXJuIG9mIChHTE9CQUxfRklMRV9SVUxFU1tmaWxlVHlwZV0gfHwge30pLmRpc2FsbG93ZWRfZmlsZV9wYXR0ZXJucyB8fCBbXSkge1xuICAgIGlmIChmaWxlUGF0aC5tYXRjaChuZXcgUmVnRXhwKHBhdHRlcm4sICdpJykpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLy8gQ2hlY2tzIGlmIGEgZmlsZSBpcyBvZiBhIHBhcnRpY3VsYXIgdHlwZSBieSByZWdleGluZyB0aGUgZmlsZSBuYW1lIGFuZFxuLy8gZXhwZWN0aW5nIGEgY2VydGFpbiBleHRlbnNpb24uXG5jb25zdCBoYXNBbGxvd2VkRmlsZUV4dGVuc2lvbiA9IChleHBlY3RlZFR5cGUsIGZpbGVQYXRoKSA9PiB7XG4gIGZvciAoY29uc3QgZXh0ZW5zaW9uIG9mIChHTE9CQUxfRklMRV9SVUxFU1tleHBlY3RlZFR5cGVdIHx8IHt9KS5hbGxvd2VkX2ZpbGVfZXh0ZW5zaW9ucyB8fCBbXSkge1xuICAgIGlmIChmaWxlUGF0aC5tYXRjaChuZXcgUmVnRXhwKGBcXFxcLiR7ZXh0ZW5zaW9ufSRgLCAnaScpKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8vIENoZWNrcyBpZiBhIGZpbGUgaXMgb2YgYSBwYXJ0aWN1bGFyIHR5cGUgYnkgcmVnZXhpbmcgdGhlIHN5bnRheCBuYW1lIGFuZFxuLy8gZXhwZWN0aW5nIGEgcGF0dGVybi5cbmNvbnN0IGhhc0FsbG93ZWRGaWxlU3ludGF4ID0gKGV4cGVjdGVkVHlwZSwgZmlsZVN5bnRheCkgPT4ge1xuICBmb3IgKGNvbnN0IHBhdHRlcm4gb2YgKEdMT0JBTF9GSUxFX1JVTEVTW2V4cGVjdGVkVHlwZV0gfHwge30pLmFsbG93ZWRfZmlsZV9zeW50YXhlcyB8fCBbXSkge1xuICAgIGlmIChmaWxlU3ludGF4LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocGF0dGVybikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnQgY29uc3QgaXNDU1MgPSAoKSA9PiB7XG4gIGNvbnN0IGlzU2F2ZWRGaWxlID0gT1JJR0lOQUxfRklMRV9QQVRIICE9PSAnPyc7XG4gIGNvbnN0IHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlID0gRURJVE9SX0ZJTEVfU1lOVEFYICE9PSAnPyc7XG5cbiAgY29uc3QgaXNBbGxvd2VkRXh0ZW5zaW9uID0gaGFzQWxsb3dlZEZpbGVFeHRlbnNpb24oJ2NzcycsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XG4gIGNvbnN0IGlzQWxsb3dlZFN5bnRheCA9IGhhc0FsbG93ZWRGaWxlU3ludGF4KCdjc3MnLCBFRElUT1JfRklMRV9TWU5UQVgpO1xuICBjb25zdCBpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybiA9IGhhc0Rpc2FsbG93ZWRGaWxlUGF0aFBhdHRlcm4oJ2NzcycsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XG5cbiAgaWYgKCFpc1NhdmVkRmlsZSkge1xuICAgIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxuICAgICAgPyBpc0FsbG93ZWRTeW50YXhcbiAgICAgIDogZmFsc2U7XG4gIH1cblxuICBpZiAoaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcbiAgICA/IGlzQWxsb3dlZFN5bnRheCB8fCBpc0FsbG93ZWRFeHRlbnNpb25cbiAgICA6IGlzQWxsb3dlZEV4dGVuc2lvbjtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0hUTUwgPSAoYnVmZmVyQ29udGVudHMpID0+IHtcbiAgY29uc3QgaXNTYXZlZEZpbGUgPSBPUklHSU5BTF9GSUxFX1BBVEggIT09ICc/JztcbiAgY29uc3QgdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGUgPSBFRElUT1JfRklMRV9TWU5UQVggIT09ICc/JztcblxuICBjb25zdCBpc0FsbG93ZWRFeHRlbnNpb24gPSBoYXNBbGxvd2VkRmlsZUV4dGVuc2lvbignaHRtbCcsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XG4gIGNvbnN0IGlzQWxsb3dlZFN5bnRheCA9IGhhc0FsbG93ZWRGaWxlU3ludGF4KCdodG1sJywgRURJVE9SX0ZJTEVfU1lOVEFYKTtcbiAgY29uc3QgaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4gPSBoYXNEaXNhbGxvd2VkRmlsZVBhdGhQYXR0ZXJuKCdodG1sJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcbiAgY29uc3QgaXNNYXliZUh0bWwgPSBidWZmZXJDb250ZW50cy5tYXRjaCgvXlxccyo8Lyk7XG5cbiAgaWYgKCFpc1NhdmVkRmlsZSkge1xuICAgIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxuICAgICAgPyBpc0FsbG93ZWRTeW50YXggfHwgaXNNYXliZUh0bWxcbiAgICAgIDogaXNNYXliZUh0bWw7XG4gIH1cblxuICBpZiAoaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcbiAgICA/IGlzQWxsb3dlZFN5bnRheCB8fCBpc0FsbG93ZWRFeHRlbnNpb25cbiAgICA6IGlzQWxsb3dlZEV4dGVuc2lvbjtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0pTT04gPSAoYnVmZmVyQ29udGVudHMpID0+IHtcbiAgY29uc3QgaXNTYXZlZEZpbGUgPSBPUklHSU5BTF9GSUxFX1BBVEggIT09ICc/JztcbiAgY29uc3QgdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGUgPSBFRElUT1JfRklMRV9TWU5UQVggIT09ICc/JztcblxuICBjb25zdCBpc0FsbG93ZWRFeHRlbnNpb24gPSBoYXNBbGxvd2VkRmlsZUV4dGVuc2lvbignanNvbicsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XG4gIGNvbnN0IGlzQWxsb3dlZFN5bnRheCA9IGhhc0FsbG93ZWRGaWxlU3ludGF4KCdqc29uJywgRURJVE9SX0ZJTEVfU1lOVEFYKTtcbiAgY29uc3QgaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4gPSBoYXNEaXNhbGxvd2VkRmlsZVBhdGhQYXR0ZXJuKCdqc29uJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcbiAgY29uc3QgaXNNYXliZUpzb24gPSBidWZmZXJDb250ZW50cy5tYXRjaCgvXlxccypbe1tdLyk7XG5cbiAgaWYgKCFpc1NhdmVkRmlsZSkge1xuICAgIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxuICAgICAgPyBpc0FsbG93ZWRTeW50YXggfHwgaXNNYXliZUpzb25cbiAgICAgIDogaXNNYXliZUpzb247XG4gIH1cblxuICBpZiAoaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcbiAgICA/IGlzQWxsb3dlZFN5bnRheCB8fCBpc0FsbG93ZWRFeHRlbnNpb25cbiAgICA6IGlzQWxsb3dlZEV4dGVuc2lvbjtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0pTID0gKGJ1ZmZlckNvbnRlbnRzKSA9PiB7XG4gIGNvbnN0IGlzU2F2ZWRGaWxlID0gT1JJR0lOQUxfRklMRV9QQVRIICE9PSAnPyc7XG4gIGNvbnN0IHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlID0gRURJVE9SX0ZJTEVfU1lOVEFYICE9PSAnPyc7XG5cbiAgY29uc3QgaXNBbGxvd2VkRXh0ZW5zaW9uID0gaGFzQWxsb3dlZEZpbGVFeHRlbnNpb24oJ2pzJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcbiAgY29uc3QgaXNBbGxvd2VkU3ludGF4ID0gaGFzQWxsb3dlZEZpbGVTeW50YXgoJ2pzJywgRURJVE9SX0ZJTEVfU1lOVEFYKTtcbiAgY29uc3QgaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4gPSBoYXNEaXNhbGxvd2VkRmlsZVBhdGhQYXR0ZXJuKCdqcycsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XG4gIGNvbnN0IGlzTWF5YmVKcyA9ICFidWZmZXJDb250ZW50cy5tYXRjaCgvXlxccyo8Lyk7XG5cbiAgaWYgKCFpc1NhdmVkRmlsZSkge1xuICAgIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxuICAgICAgPyBpc0FsbG93ZWRTeW50YXggfHwgaXNNYXliZUpzXG4gICAgICA6IGlzTWF5YmVKcztcbiAgfVxuXG4gIGlmIChpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxuICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzQWxsb3dlZEV4dGVuc2lvblxuICAgIDogaXNBbGxvd2VkRXh0ZW5zaW9uO1xufTtcblxuLy8gQ2hlY2tzIGlmIGEgZmlsZSBwYXRoIG1hdGNoZXMgYSBwYXJ0aWN1bGFyIGdsb2Igc3RyaW5nLlxuZXhwb3J0IGNvbnN0IGlzTWF0Y2hpbmdHbG9iID0gKGdsb2JTdHJpbmcpID0+IHtcbiAgLy8gSWYgZmlsZSB1bnNhdmVkLCByZWplY3QgZ2xvYiBtYXRjaGluZztcbiAgaWYgKE9SSUdJTkFMX0ZJTEVfUEFUSCA9PT0gJz8nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgbWluaW1hdGNoKE9SSUdJTkFMX0ZJTEVfUEFUSCwgZ2xvYlN0cmluZylcbiAgICB8fCBtaW5pbWF0Y2goYmFzZW5hbWUoT1JJR0lOQUxfRklMRV9QQVRIKSwgZ2xvYlN0cmluZylcbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBO0FBRUE7QUFFQTtBQUNBO0FBQXlDO0FBQUE7QUFBQTtBQUV6QyxJQUFNQSxpQkFBaUIsR0FBRyxJQUFBQyxxQkFBVSxFQUFDQyxpQ0FBc0IsQ0FBQzs7QUFFNUQ7QUFDQTtBQUNBLElBQU1DLDRCQUE0QixHQUFHLFNBQS9CQSw0QkFBNEIsQ0FBSUMsUUFBUSxFQUFFQyxRQUFRLEVBQUs7RUFBQSwyQ0FDckMsQ0FBQ0wsaUJBQWlCLENBQUNJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFRSx3QkFBd0IsSUFBSSxFQUFFO0lBQUE7RUFBQTtJQUF4RixvREFBMEY7TUFBQSxJQUEvRUMsT0FBTztNQUNoQixJQUFJRixRQUFRLENBQUNHLEtBQUssQ0FBQyxJQUFJQyxNQUFNLENBQUNGLE9BQU8sRUFBRSxHQUFHLENB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
