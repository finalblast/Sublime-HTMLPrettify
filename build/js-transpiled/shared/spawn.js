"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("core-js/modules/es7.object.get-own-property-descriptors");
require("core-js/modules/es6.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
require("core-js/modules/es6.promise");
var _child_process = _interopRequireDefault(require("child_process"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = function _default(command, args) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve, reject) {
    var stdio = process.platform === 'win32' ? 'ignore' : 'inherit';
    var child = _child_process.default.spawn(command, args, _objectSpread({
      stdio: stdio
    }, options));
    child.on('error', function (err) {
      reject(err);
    });
    child.on('exit', function (code) {
      resolve(code);
    });
    return child;
  });
};
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkL3NwYXduLmpzIiwibmFtZXMiOlsiY29tbWFuZCIsImFyZ3MiLCJvcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdGRpbyIsInByb2Nlc3MiLCJwbGF0Zm9ybSIsImNoaWxkIiwiY3AiLCJzcGF3biIsIm9uIiwiZXJyIiwiY29kZSJdLCJzb3VyY2VzIjpbInNoYXJlZC9zcGF3bi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IDIwMTYgTW96aWxsYVxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZFxudW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1JcbkNPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG5zcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IGNwIGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuXG5leHBvcnQgZGVmYXVsdCAoY29tbWFuZCwgYXJncywgb3B0aW9ucyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGNvbnN0IHN0ZGlvID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJ1xuICAgID8gJ2lnbm9yZSdcbiAgICA6ICdpbmhlcml0JztcblxuICBjb25zdCBjaGlsZCA9IGNwLnNwYXduKGNvbW1hbmQsIGFyZ3MsIHsgc3RkaW8sIC4uLm9wdGlvbnMgfSk7XG5cbiAgY2hpbGQub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgIHJlamVjdChlcnIpO1xuICB9KTtcblxuICBjaGlsZC5vbignZXhpdCcsIChjb2RlKSA9PiB7XG4gICAgcmVzb2x2ZShjb2RlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoaWxkO1xufSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBWUE7QUFBK0I7QUFBQTtBQUFBLGVBRWhCLGtCQUFDQSxPQUFPLEVBQUVDLElBQUk7RUFBQSxJQUFFQyxPQUFPLHVFQUFHLENBQUMsQ0FBQztFQUFBLE9BQUssSUFBSUMsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBRUMsTUFBTSxFQUFLO0lBQy9FLElBQU1DLEtBQUssR0FBR0MsT0FBTyxDQUFDQyxRQUFRLEtBQUssT0FBTyxHQUN0QyxRQUFRLEdBQ1IsU0FBUztJQUViLElBQU1DLEtBQUssR0FBR0Msc0JBQUUsQ0FBQ0MsS0FBSyxDQUFDWCxPQUFPLEVBQUVDLElBQUk7TUFBSUssS0FBSyxFQUFMQTtJQUFLLEdBQUtKLE9BQU8sRUFBRztJQUU1RE8sS0FBSyxDQUFDRyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUNDLEdBQUcsRUFBSztNQUN6QlIsTUFBTSxDQUFDUSxHQUFHLENBQUM7SUFDYixDQUFDLENBQUM7SUFFRkosS0FBSyxDQUFDRyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUNFLElBQUksRUFBSztNQUN6QlYsT0FBTyxDQUFDVSxJQUFJLENBQUM7SUFDZixDQUFDLENBQUM7SUFFRixPQUFPTCxLQUFLO0VBQ2QsQ0FBQyxDQUFDO0FBQUE7QUFBQSJ9
