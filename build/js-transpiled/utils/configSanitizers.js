"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateEditorConfigToJsbeautifyConfig = exports.sanitizeJsbeautifyConfig = exports.sanitizeCharishValues = exports.sanitizeBooleanishValues = void 0;
var _pick = _interopRequireDefault(require("lodash/pick"));
var _isObject = _interopRequireDefault(require("lodash/isObject"));
var _pickBy = _interopRequireDefault(require("lodash/pickBy"));
var _mapObj = _interopRequireDefault(require("map-obj"));
var _isGlob = _interopRequireDefault(require("is-glob"));
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var VALID_JSBEAUTIFY_CONFIG_KEYS = ['all', 'html', 'css', 'js', 'json', 'custom'];

// Utility function special casing "true" and "false" values as being
// actually booleans. This avoids common accidents in json files.
var sanitizeBooleanishValues = function sanitizeBooleanishValues(prefValue) {
  switch (prefValue) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return prefValue;
  }
};

// Utility function special casing "tab" and "space" values as being
// actually \t and \s.
exports.sanitizeBooleanishValues = sanitizeBooleanishValues;
var sanitizeCharishValues = function sanitizeCharishValues(prefValue) {
  switch (prefValue) {
    case 'tab':
      return '\t';
    case 'space':
      return ' ';
    default:
      return prefValue;
  }
};

// Utility function massaging .jsbeautifyrc objects into a consistent and
// expected format, discarding unknown keys and sanitizing values.
exports.sanitizeCharishValues = sanitizeCharishValues;
var sanitizeJsbeautifyConfig = function sanitizeJsbeautifyConfig(jsbeautifyConfig) {
  return (0, _mapObj.default)((0, _pick.default)(jsbeautifyConfig, VALID_JSBEAUTIFY_CONFIG_KEYS), function (fileType, fileSettings) {
    switch (fileType) {
      case 'all':
      case 'html':
      case 'css':
      case 'js':
      case 'json':
        return [fileType, (0, _mapObj.default)(fileSettings, function (prefName, prefValue) {
          return [prefName, sanitizeBooleanishValues(prefValue)];
        })];
      case 'custom':
        return [fileType, (0, _mapObj.default)(fileSettings, function (globString, globConfig) {
          return [globString, (0, _mapObj.default)(globConfig, function (prefName, prefValue) {
            return [prefName, sanitizeBooleanishValues(prefValue)];
          })];
        })];
      default:
        throw new Error("Unknown .jsbeautifyrc file type: ".concat(fileType));
    }
  });
};
exports.sanitizeJsbeautifyConfig = sanitizeJsbeautifyConfig;
var translateEditorConfigToJsbeautifyConfig = function translateEditorConfigToJsbeautifyConfig(editorConfig) {
  return {
    custom: (0, _mapObj.default)((0, _pickBy.default)(editorConfig, function (v, k) {
      return (0, _isGlob.default)(k) && (0, _isObject.default)(v);
    }), function (globString, globConfig) {
      return [globString, (0, _mapObj.default)(globConfig, function (prefName, prefValue) {
        switch (prefName) {
          case 'indent_style':
            return ['indent_char', sanitizeCharishValues(prefValue)];
          case 'insert_final_newline':
            return ['end_with_newline', prefValue];
          default:
            return [prefName, prefValue];
        }
      })];
    })
  };
};
exports.translateEditorConfigToJsbeautifyConfig = translateEditorConfigToJsbeautifyConfig;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMvY29uZmlnU2FuaXRpemVycy5qcyIsIm5hbWVzIjpbIlZBTElEX0pTQkVBVVRJRllfQ09ORklHX0tFWVMiLCJzYW5pdGl6ZUJvb2xlYW5pc2hWYWx1ZXMiLCJwcmVmVmFsdWUiLCJzYW5pdGl6ZUNoYXJpc2hWYWx1ZXMiLCJzYW5pdGl6ZUpzYmVhdXRpZnlDb25maWciLCJqc2JlYXV0aWZ5Q29uZmlnIiwibWFwT2JqIiwicGljayIsImZpbGVUeXBlIiwiZmlsZVNldHRpbmdzIiwicHJlZk5hbWUiLCJnbG9iU3RyaW5nIiwiZ2xvYkNvbmZpZyIsIkVycm9yIiwidHJhbnNsYXRlRWRpdG9yQ29uZmlnVG9Kc2JlYXV0aWZ5Q29uZmlnIiwiZWRpdG9yQ29uZmlnIiwiY3VzdG9tIiwicGlja0J5IiwidiIsImsiLCJpc0dsb2IiLCJpc09iamVjdCJdLCJzb3VyY2VzIjpbInV0aWxzL2NvbmZpZ1Nhbml0aXplcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxuaW1wb3J0IHBpY2sgZnJvbSAnbG9kYXNoL3BpY2snO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC9pc09iamVjdCc7XG5pbXBvcnQgcGlja0J5IGZyb20gJ2xvZGFzaC9waWNrQnknO1xuaW1wb3J0IG1hcE9iaiBmcm9tICdtYXAtb2JqJztcbmltcG9ydCBpc0dsb2IgZnJvbSAnaXMtZ2xvYic7XG5cbmNvbnN0IFZBTElEX0pTQkVBVVRJRllfQ09ORklHX0tFWVMgPSBbXG4gICdhbGwnLFxuICAnaHRtbCcsXG4gICdjc3MnLFxuICAnanMnLFxuICAnanNvbicsXG4gICdjdXN0b20nLFxuXTtcblxuLy8gVXRpbGl0eSBmdW5jdGlvbiBzcGVjaWFsIGNhc2luZyBcInRydWVcIiBhbmQgXCJmYWxzZVwiIHZhbHVlcyBhcyBiZWluZ1xuLy8gYWN0dWFsbHkgYm9vbGVhbnMuIFRoaXMgYXZvaWRzIGNvbW1vbiBhY2NpZGVudHMgaW4ganNvbiBmaWxlcy5cbmV4cG9ydCBjb25zdCBzYW5pdGl6ZUJvb2xlYW5pc2hWYWx1ZXMgPSAocHJlZlZhbHVlKSA9PiB7XG4gIHN3aXRjaCAocHJlZlZhbHVlKSB7XG4gICAgY2FzZSAndHJ1ZSc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlICdmYWxzZSc6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBwcmVmVmFsdWU7XG4gIH1cbn07XG5cbi8vIFV0aWxpdHkgZnVuY3Rpb24gc3BlY2lhbCBjYXNpbmcgXCJ0YWJcIiBhbmQgXCJzcGFjZVwiIHZhbHVlcyBhcyBiZWluZ1xuLy8gYWN0dWFsbHkgXFx0IGFuZCBcXHMuXG5leHBvcnQgY29uc3Qgc2FuaXRpemVDaGFyaXNoVmFsdWVzID0gKHByZWZWYWx1ZSkgPT4ge1xuICBzd2l0Y2ggKHByZWZWYWx1ZSkge1xuICAgIGNhc2UgJ3RhYic6XG4gICAgICByZXR1cm4gJ1xcdCc7XG4gICAgY2FzZSAnc3BhY2UnOlxuICAgICAgcmV0dXJuICcgJztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHByZWZWYWx1ZTtcbiAgfVxufTtcblxuLy8gVXRpbGl0eSBmdW5jdGlvbiBtYXNzYWdpbmcgLmpzYmVhdXRpZnlyYyBvYmplY3RzIGludG8gYSBjb25zaXN0ZW50IGFuZFxuLy8gZXhwZWN0ZWQgZm9ybWF0LCBkaXNjYXJkaW5nIHVua25vd24ga2V5cyBhbmQgc2FuaXRpemluZyB2YWx1ZXMuXG5leHBvcnQgY29uc3Qgc2FuaXRpemVKc2JlYXV0aWZ5Q29uZmlnID0ganNiZWF1dGlmeUNvbmZpZyA9PiBtYXBPYmoocGljayhqc2JlYXV0aWZ5Q29uZmlnLCBWQUxJRF9KU0JFQVVUSUZZX0NPTkZJR19LRVlTKSwgKGZpbGVUeXBlLCBmaWxlU2V0dGluZ3MpID0+IHtcbiAgc3dpdGNoIChmaWxlVHlwZSkge1xuICAgIGNhc2UgJ2FsbCc6XG4gICAgY2FzZSAnaHRtbCc6XG4gICAgY2FzZSAnY3NzJzpcbiAgICBjYXNlICdqcyc6XG4gICAgY2FzZSAnanNvbic6XG4gICAgICByZXR1cm4gW1xuICAgICAgICBmaWxlVHlwZSwgbWFwT2JqKGZpbGVTZXR0aW5ncywgKHByZWZOYW1lLCBwcmVmVmFsdWUpID0+IFtcbiAgICAgICAgICBwcmVmTmFtZSwgc2FuaXRpemVCb29sZWFuaXNoVmFsdWVzKHByZWZWYWx1ZSksXG4gICAgICAgIF0pLFxuICAgICAgXTtcbiAgICBjYXNlICdjdXN0b20nOlxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgZmlsZVR5cGUsIG1hcE9iaihmaWxlU2V0dGluZ3MsIChnbG9iU3RyaW5nLCBnbG9iQ29uZmlnKSA9PiBbXG4gICAgICAgICAgZ2xvYlN0cmluZywgbWFwT2JqKGdsb2JDb25maWcsIChwcmVmTmFtZSwgcHJlZlZhbHVlKSA9PiBbXG4gICAgICAgICAgICBwcmVmTmFtZSwgc2FuaXRpemVCb29sZWFuaXNoVmFsdWVzKHByZWZWYWx1ZSksXG4gICAgICAgICAgXSksXG4gICAgICAgIF0pLFxuICAgICAgXTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIC5qc2JlYXV0aWZ5cmMgZmlsZSB0eXBlOiAke2ZpbGVUeXBlfWApO1xuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IHRyYW5zbGF0ZUVkaXRvckNvbmZpZ1RvSnNiZWF1dGlmeUNvbmZpZyA9IGVkaXRvckNvbmZpZyA9PiAoe1xuICBjdXN0b206IG1hcE9iaihwaWNrQnkoZWRpdG9yQ29uZmlnLCAodiwgaykgPT4gaXNHbG9iKGspICYmIGlzT2JqZWN0KHYpKSwgKGdsb2JTdHJpbmcsIGdsb2JDb25maWcpID0+IFtcbiAgICBnbG9iU3RyaW5nLCBtYXBPYmooZ2xvYkNvbmZpZywgKHByZWZOYW1lLCBwcmVmVmFsdWUpID0+IHtcbiAgICAgIHN3aXRjaCAocHJlZk5hbWUpIHtcbiAgICAgICAgY2FzZSAnaW5kZW50X3N0eWxlJzpcbiAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgJ2luZGVudF9jaGFyJywgc2FuaXRpemVDaGFyaXNoVmFsdWVzKHByZWZWYWx1ZSksXG4gICAgICAgICAgXTtcbiAgICAgICAgY2FzZSAnaW5zZXJ0X2ZpbmFsX25ld2xpbmUnOlxuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAnZW5kX3dpdGhfbmV3bGluZScsIHByZWZWYWx1ZSxcbiAgICAgICAgICBdO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBwcmVmTmFtZSwgcHJlZlZhbHVlLFxuICAgICAgICAgIF07XG4gICAgICB9XG4gICAgfSksXG4gIF0pLFxufSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQUNBOztBQVFBLElBQU1BLDRCQUE0QixHQUFHLENBQ25DLEtBQUssRUFDTCxNQUFNLEVBQ04sS0FBSyxFQUNMLElBQUksRUFDSixNQUFNLEVBQ04sUUFBUSxDQUNUOztBQUVEO0FBQ0E7QUFDTyxJQUFNQyx3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQXdCLENBQUlDLFNBQVMsRUFBSztFQUNyRCxRQUFRQSxTQUFTO0lBQ2YsS0FBSyxNQUFNO01BQ1QsT0FBTyxJQUFJO0lBQ2IsS0FBSyxPQUFPO01BQ1YsT0FBTyxLQUFLO0lBQ2Q7TUFDRSxPQUFPQSxTQUFTO0VBQUM7QUFFdkIsQ0FBQzs7QUFFRDtBQUNBO0FBQUE7QUFDTyxJQUFNQyxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXFCLENBQUlELFNBQVMsRUFBSztFQUNsRCxRQUFRQSxTQUFTO0lBQ2YsS0FBSyxLQUFLO01BQ1IsT0FBTyxJQUFJO0lBQ2IsS0FBSyxPQUFPO01BQ1YsT0FBTyxHQUFHO0lBQ1o7TUFDRSxPQUFPQSxTQUFTO0VBQUM7QUFFdkIsQ0FBQzs7QUFFRDtBQUNBO0FBQUE7QUFDTyxJQUFNRSx3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQXdCLENBQUdDLGdCQUFnQjtFQUFBLE9BQUksSUFBQUMsZUFBTSxFQUFDLElBQUFDLGFBQUksRUFBQ0YsZ0JBQWdCLEVBQUVMLDRCQUE0QixDQUFDLEVBQUUsVUFBQ1EsUUFBUSxFQUFFQyxZQUFZLEVBQUs7SUFDbkosUUFBUUQsUUFBUTtNQUNkLEtBQUssS0FBSztNQUNWLEtBQUssTUFBTTtNQUNYLEtBQUssS0FBSztNQUNWLEtBQUssSUFBSTtNQUNULEtBQUssTUFBTTtRQUNULE9BQU8sQ0FDTEEsUUFBUSxFQUFFLElBQUFGLGVBQU0sRUFBQ0csWUFBWSxFQUFFLFVBQUNDLFFBQVEsRUFBRVIsU0FBUztVQUFBLE9BQUssQ0FDdERRLFFBQVEsRUFBRVQsd0JBQXdCLENBQUNDLFNBQVMsQ0FBQyxDQUM5QztRQUFBLEVBQUMsQ0FDSDtNQUNILEtBQUssUUFBUTtRQUNYLE9BQU8sQ0FDTE0sUUFBUSxFQUFFLElBQUFGLGVBQU0sRUFBQ0csWUFBWSxFQUFFLFVBQUNFLFVBQVUsRUFBRUMsVUFBVTtVQUFBLE9BQUssQ0FDekRELFVBQVUsRUFBRSxJQUFBTCxlQUFNLEVBQUNNLFVBQVUsRUFBRSxVQUFDRixRQUFRLEVBQUVSLFNBQVM7WUFBQSxPQUFLLENBQ3REUSxRQUFRLEVBQUVULHdCQUF3QixDQUFDQyxTQUFTLENBQUMsQ0FDOUM7VUFBQSxFQUFDLENBQ0g7UUFBQSxFQUFDLENBQ0g7TUFDSDtRQUNFLE1BQU0sSUFBSVcsS0FBSyw0Q0FBcUNMLFFBQVEsRUFBRztJQUFDO0VBRXRFLENBQUMsQ0FBQztBQUFBO0FBQUM7QUFFSSxJQUFNTSx1Q0FBdUMsR0FBRyxTQUExQ0EsdUNBQXVDLENBQUdDLFlBQVk7RUFBQSxPQUFLO0lBQ3RFQyxNQUFNLEVBQUUsSUFBQVYsZUFBTSxFQUFDLElBQUFXLGVBQU0sRUFBQ0YsWUFBWSxFQUFFLFVBQUNHLENBQUMsRUFBRUMsQ0FBQztNQUFBLE9BQUssSUFBQUMsZUFBTSxFQUFDRCxDQUFDLENBQUMsSUFBSSxJQUFBRSxpQkFBUSxFQUFDSCxDQUFDLENBQUM7SUFBQSxFQUFDLEVBQUUsVUFBQ1AsVUFBVSxFQUFFQyxVQUFVO01BQUEsT0FBSyxDQUNuR0QsVUFBVSxFQUFFLElBQUFMLGVBQU0sRUFBQ00sVUFBVSxFQUFFLFVBQUNGLFFBQVEsRUFBRVIsU0FBUyxFQUFLO1FBQ3RELFFBQVFRLFFBQVE7VUFDZCxLQUFLLGNBQWM7WUFDakIsT0FBTyxDQUNMLGFBQWEsRUFBRVAscUJBQXFCLENBQUNELFNBQVMsQ0FBQyxDQUNoRDtVQUNILEtBQUssc0JBQXNCO1lBQ3pCLE9BQU8sQ0FDTCxrQkFBa0IsRUFBRUEsU0FBUyxDQUM5QjtVQUNIO1lBQ0UsT0FBTyxDQUNMUSxRQUFRLEVBQUVSLFNBQVMsQ0FDcEI7UUFBQztNQUVSLENBQUMsQ0FBQyxDQUNIO0lBQUE7RUFDSCxDQUFDO0FBQUEsQ0FBQztBQUFDIn0=
