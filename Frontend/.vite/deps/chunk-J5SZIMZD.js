import {
  require_prop_types
} from "./chunk-LQLVYY33.js";
import {
  require_react
} from "./chunk-6GAV2S6I.js";
import {
  __publicField,
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js
var React = __toESM(require_react(), 1);
var UNINITIALIZED = {};
function useLazyRef(init, initArg) {
  const ref = React.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }
  return ref;
}

// node_modules/@mui/utils/esm/useOnMount/useOnMount.js
var React2 = __toESM(require_react(), 1);
var EMPTY = [];
function useOnMount(fn) {
  React2.useEffect(fn, EMPTY);
}

// node_modules/@mui/utils/esm/useTimeout/useTimeout.js
var Timeout = class _Timeout {
  constructor() {
    __publicField(this, "currentId", null);
    __publicField(this, "clear", () => {
      if (this.currentId !== null) {
        clearTimeout(this.currentId);
        this.currentId = null;
      }
    });
    __publicField(this, "disposeEffect", () => {
      return this.clear;
    });
  }
  static create() {
    return new _Timeout();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(delay, fn) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = null;
      fn();
    }, delay);
  }
};
function useTimeout() {
  const timeout = useLazyRef(Timeout.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}

// node_modules/@mui/utils/esm/refType/refType.js
var import_prop_types = __toESM(require_prop_types(), 1);
var refType = import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]);
var refType_default = refType;

export {
  useLazyRef,
  Timeout,
  useTimeout,
  refType_default
};
//# sourceMappingURL=chunk-J5SZIMZD.js.map
