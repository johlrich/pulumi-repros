exports.handler = __f0;

var __ServiceStateProvider_instance_proto = {};
Object.defineProperty(__ServiceStateProvider_instance_proto, "constructor", { configurable: true, writable: true, value: __ServiceStateProvider });
var __ServiceStateProvider_instance = Object.create(__ServiceStateProvider_instance_proto);
__ServiceStateProvider_instance.create = __f1;
__ServiceStateProvider.instance = __ServiceStateProvider_instance;

function __ServiceStateProvider() {
  return (function() {
    with({ ServiceStateProvider: __ServiceStateProvider }) {

return function /*ServiceStateProvider*/() {
        var _this = this;
        this.create = function (props) { return __awaiter(_this, void 0, void 0, function () {
            var axios, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require("axios"); })];
                    case 1:
                        axios = (_a.sent())["default"];
                        return [4 /*yield*/, axios.get("https://postman-echo.com/get?foo1=bar1&foo2=bar2")];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                id: "0",
                                outs: { response: response.data }
                            }];
                }
            });
        }); };
    };

    }
  }).apply(undefined, undefined).apply(this, arguments);
}

function __f1() {
  return (function() {
    with({ _this: __ServiceStateProvider_instance }) {

return function (props) { return __awaiter(_this, void 0, void 0, function () {
            var axios, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require("axios"); })];
                    case 1:
                        axios = (_a.sent())["default"];
                        return [4 /*yield*/, axios.get("https://postman-echo.com/get?foo1=bar1&foo2=bar2")];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                id: "0",
                                outs: { response: response.data }
                            }];
                }
            });
        }); };

    }
  }).apply(undefined, undefined).apply(this, arguments);
}

function __f0() {
  return (function() {
    with({ ServiceStateProvider: __ServiceStateProvider }) {

return function () { return ServiceStateProvider.instance; };

    }
  }).apply(undefined, undefined).apply(this, arguments);
}

