"use strict";

require("core-js/modules/es6.weak-map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.out = exports.info = exports.err = exports.endPrettifiedCode = exports.endDiagnostics = exports.beginPrettifiedCode = exports.beginDiagnostics = void 0;
var constants = _interopRequireWildcard(require("./constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var beginDiagnostics = function beginDiagnostics() {
  console.log(constants.DIAGNOSTICS_MARKER_BEGIN);
};
exports.beginDiagnostics = beginDiagnostics;
var endDiagnostics = function endDiagnostics() {
  console.log(constants.DIAGNOSTICS_MARKER_END);
};
exports.endDiagnostics = endDiagnostics;
var beginPrettifiedCode = function beginPrettifiedCode() {
  console.log(constants.PRETTIFIED_CODE_MARKER_BEGIN);
};
exports.beginPrettifiedCode = beginPrettifiedCode;
var endPrettifiedCode = function endPrettifiedCode() {
  console.log(constants.PRETTIFIED_CODE_MARKER_END);
};
exports.endPrettifiedCode = endPrettifiedCode;
var info = function info() {
  var _console;
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return (_console = console).log.apply(_console, ['[HTMLPrettify]'].concat(args));
};
exports.info = info;
var out = console.log;
exports.out = out;
var err = console.error;
exports.err = err;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMvc3RkaW9VdGlscy5qcyIsIm5hbWVzIjpbImJlZ2luRGlhZ25vc3RpY3MiLCJjb25zb2xlIiwibG9nIiwiY29uc3RhbnRzIiwiRElBR05PU1RJQ1NfTUFSS0VSX0JFR0lOIiwiZW5kRGlhZ25vc3RpY3MiLCJESUFHTk9TVElDU19NQVJLRVJfRU5EIiwiYmVnaW5QcmV0dGlmaWVkQ29kZSIsIlBSRVRUSUZJRURfQ09ERV9NQVJLRVJfQkVHSU4iLCJlbmRQcmV0dGlmaWVkQ29kZSIsIlBSRVRUSUZJRURfQ09ERV9NQVJLRVJfRU5EIiwiaW5mbyIsImFyZ3MiLCJvdXQiLCJlcnIiLCJlcnJvciJdLCJzb3VyY2VzIjpbInV0aWxzL3N0ZGlvVXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxuaW1wb3J0ICogYXMgY29uc3RhbnRzIGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IGJlZ2luRGlhZ25vc3RpY3MgPSAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGNvbnN0YW50cy5ESUFHTk9TVElDU19NQVJLRVJfQkVHSU4pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVuZERpYWdub3N0aWNzID0gKCkgPT4ge1xuICBjb25zb2xlLmxvZyhjb25zdGFudHMuRElBR05PU1RJQ1NfTUFSS0VSX0VORCk7XG59O1xuXG5leHBvcnQgY29uc3QgYmVnaW5QcmV0dGlmaWVkQ29kZSA9ICgpID0+IHtcbiAgY29uc29sZS5sb2coY29uc3RhbnRzLlBSRVRUSUZJRURfQ09ERV9NQVJLRVJfQkVHSU4pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVuZFByZXR0aWZpZWRDb2RlID0gKCkgPT4ge1xuICBjb25zb2xlLmxvZyhjb25zdGFudHMuUFJFVFRJRklFRF9DT0RFX01BUktFUl9FTkQpO1xufTtcblxuZXhwb3J0IGNvbnN0IGluZm8gPSAoLi4uYXJncykgPT4gY29uc29sZS5sb2coJ1tIVE1MUHJldHRpZnldJywgLi4uYXJncyk7XG5leHBvcnQgY29uc3Qgb3V0ID0gY29uc29sZS5sb2c7XG5leHBvcnQgY29uc3QgZXJyID0gY29uc29sZS5lcnJvcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBO0FBQXlDO0FBQUE7QUFKekM7QUFDQTtBQUNBOztBQUlPLElBQU1BLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0IsR0FBUztFQUNwQ0MsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFNBQVMsQ0FBQ0Msd0JBQXdCLENBQUM7QUFDakQsQ0FBQztBQUFDO0FBRUssSUFBTUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFjLEdBQVM7RUFDbENKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxTQUFTLENBQUNHLHNCQUFzQixDQUFDO0FBQy9DLENBQUM7QUFBQztBQUVLLElBQU1DLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBbUIsR0FBUztFQUN2Q04sT0FBTyxDQUFDQyxHQUFHLENBQUNDLFNBQVMsQ0FBQ0ssNEJBQTRCLENBQUM7QUFDckQsQ0FBQztBQUFDO0FBRUssSUFBTUMsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFpQixHQUFTO0VBQ3JDUixPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsU0FBUyxDQUFDTywwQkFBMEIsQ0FBQztBQUNuRCxDQUFDO0FBQUM7QUFFSyxJQUFNQyxJQUFJLEdBQUcsU0FBUEEsSUFBSTtFQUFBO0VBQUEsa0NBQU9DLElBQUk7SUFBSkEsSUFBSTtFQUFBO0VBQUEsT0FBSyxZQUFBWCxPQUFPLEVBQUNDLEdBQUcsa0JBQUMsZ0JBQWdCLFNBQUtVLElBQUksRUFBQztBQUFBO0FBQUM7QUFDakUsSUFBTUMsR0FBRyxHQUFHWixPQUFPLENBQUNDLEdBQUc7QUFBQztBQUN4QixJQUFNWSxHQUFHLEdBQUdiLE9BQU8sQ0FBQ2MsS0FBSztBQUFDIn0=
