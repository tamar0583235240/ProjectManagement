import {
  setRef
} from "./chunk-JHOR3USZ.js";
import {
  useForkRef
} from "./chunk-CK54PO6X.js";
import {
  chainPropTypes
} from "./chunk-JX37XSKT.js";
import {
  exactProp,
  useEnhancedEffect_default
} from "./chunk-QXUP3EZK.js";
import {
  require_prop_types
} from "./chunk-LQLVYY33.js";
import {
  require_react_dom
} from "./chunk-OAZAAUMI.js";
import {
  require_react
} from "./chunk-6GAV2S6I.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@mui/material/esm/Portal/Portal.js
var React2 = __toESM(require_react(), 1);
var ReactDOM = __toESM(require_react_dom(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/utils/esm/getReactElementRef/getReactElementRef.js
var React = __toESM(require_react(), 1);
function getReactElementRef(element) {
  var _a;
  if (parseInt(React.version, 10) >= 19) {
    return ((_a = element == null ? void 0 : element.props) == null ? void 0 : _a.ref) || null;
  }
  return (element == null ? void 0 : element.ref) || null;
}

// node_modules/@mui/utils/esm/HTMLElementType/HTMLElementType.js
function HTMLElementType(props, propName, componentName, location, propFullName) {
  if (false) {
    return null;
  }
  const propValue = props[propName];
  const safePropName = propFullName || propName;
  if (propValue == null) {
    return null;
  }
  if (propValue && propValue.nodeType !== 1) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an HTMLElement.`);
  }
  return null;
}

// node_modules/@mui/material/esm/Portal/Portal.js
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
var Portal = React2.forwardRef(function Portal2(props, forwardedRef) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = React2.useState(null);
  const handleRef = useForkRef(React2.isValidElement(children) ? getReactElementRef(children) : null, forwardedRef);
  useEnhancedEffect_default(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);
  useEnhancedEffect_default(() => {
    if (mountNode && !disablePortal) {
      setRef(forwardedRef, mountNode);
      return () => {
        setRef(forwardedRef, null);
      };
    }
    return void 0;
  }, [forwardedRef, mountNode, disablePortal]);
  if (disablePortal) {
    if (React2.isValidElement(children)) {
      const newProps = {
        ref: handleRef
      };
      return React2.cloneElement(children, newProps);
    }
    return children;
  }
  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
});
true ? Portal.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: import_prop_types.default.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types.default.bool
} : void 0;
if (true) {
  Portal["propTypes"] = exactProp(Portal.propTypes);
}
var Portal_default = Portal;

// node_modules/@mui/material/esm/transitions/utils.js
var reflow = (node) => node.scrollTop;
function getTransitionProps(props, options) {
  const {
    timeout,
    easing,
    style = {}
  } = props;
  return {
    duration: style.transitionDuration ?? (typeof timeout === "number" ? timeout : timeout[options.mode] || 0),
    easing: style.transitionTimingFunction ?? (typeof easing === "object" ? easing[options.mode] : easing),
    delay: style.transitionDelay
  };
}

// node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js
var import_prop_types2 = __toESM(require_prop_types(), 1);
function isClassComponent(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function acceptingRef(props, propName, componentName, location, propFullName) {
  const element = props[propName];
  const safePropName = propFullName || propName;
  if (element == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === "undefined") {
    return null;
  }
  let warningHint;
  const elementType = element.type;
  if (typeof elementType === "function" && !isClassComponent(elementType)) {
    warningHint = "Did you accidentally use a plain function component for an element instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
var elementAcceptingRef = chainPropTypes(import_prop_types2.default.element, acceptingRef);
elementAcceptingRef.isRequired = chainPropTypes(import_prop_types2.default.element.isRequired, acceptingRef);
var elementAcceptingRef_default = elementAcceptingRef;

export {
  reflow,
  getTransitionProps,
  HTMLElementType,
  getReactElementRef,
  Portal_default,
  elementAcceptingRef_default
};
//# sourceMappingURL=chunk-UOUMMSLH.js.map
