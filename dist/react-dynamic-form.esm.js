import React, { useState, useEffect, useMemo, useContext, createContext, useCallback, useRef } from 'react';
import { get, useForm, useWatch, FormProvider, useFormContext, useController } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, boolean, date, number, object, mixed } from 'yup';
import styled, { css, ThemeProvider as ThemeProvider$1 } from 'styled-components';

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}

/**
 * Flattens a nested object into a single-level object.
 *
 * @param obj - The object to flatten.
 * @param parentKey - The parent key (used for recursion).
 * @param result - The resulting flattened object.
 * @returns The flattened object.
 */
var _flattenObject = function flattenObject(obj, parentKey, result) {
  if (parentKey === void 0) {
    parentKey = '';
  }
  if (result === void 0) {
    result = {};
  }
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var newKey = parentKey ? parentKey + "." + key : key;
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        _flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
};
var _flattenConfig = function flattenConfig(config, parentKey, result) {
  if (parentKey === void 0) {
    parentKey = '';
  }
  if (result === void 0) {
    result = {};
  }
  for (var key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      var newKey = parentKey ? parentKey + "." + key : key;
      var fieldConfig = config[key];
      if (fieldConfig.fields) {
        _flattenConfig(fieldConfig.fields, newKey, result);
      } else {
        result[newKey] = fieldConfig;
      }
    }
  }
  return result;
};
var debounce = function debounce(func, wait) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var later = function later() {
      timeout = null;
      func.apply(void 0, args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
/**
 * Saves data to localStorage.
 *
 * @param key - The key to store the data under.
 * @param data - The data to store.
 */
var saveToLocalStorage = function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
};
/**
 * Loads data from localStorage.
 *
 * @param key - The key to load the data from.
 * @returns The loaded data, or null if no data is found.
 */
var loadFromLocalStorage = function loadFromLocalStorage(key) {
  var data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

/**
 * Retrieves the error message for a field based on its validation messages and error type.
 *
 * @param fieldConfig - The field configuration.
 * @param fieldError - The field error object.
 * @param values - form values
 * @returns The error message string or undefined if no error message is found.
 */
var getErrorMessage = function getErrorMessage(fieldConfig, fieldError, values) {
  if (!fieldError) {
    return undefined;
  }
  var type = fieldError.type;
  var validationMessages = fieldConfig.validationMessages;
  if (validationMessages && validationMessages[type]) {
    var template = validationMessages[type];
    return typeof template === 'function' ? template(_extends({}, values, {
      error: fieldError,
      config: fieldConfig
    })) : template;
  }
  return fieldError.message;
};

/**
 * Maps a value to an InputType.
 *
 * @param value - The value to map.
 * @returns The corresponding InputType.
 */
var getInputTypeFromValue = function getInputTypeFromValue(value) {
  if (typeof value === 'string') {
    return 'text';
  }
  if (typeof value === 'number') {
    return 'number';
  }
  if (typeof value === 'boolean') {
    return 'checkbox';
  }
  if (Array.isArray(value)) {
    return 'select'; // TODO: Handle array input type
  }
  return 'text'; // Default
};

/**
 * Generates the form fields array based on the flattened config and form state.
 *
 * @param flattenedConfig - The flattened form configuration.
 * @param formState - The `react-hook-form` form state.
 * @returns The form fields array.
 */
var getFields = function getFields(flattenedConfig, formState) {
  return Object.entries(flattenedConfig).map(function (_ref) {
    var key = _ref[0],
      fieldConfig = _ref[1];
    // Retrieve the default value from fieldConfig
    var defaultValue = fieldConfig.defaultValue;
    var inputType = fieldConfig.type || getInputTypeFromValue(defaultValue);
    var fieldError = get(formState.errors, key);
    var errorMessage = getErrorMessage(fieldConfig, fieldError, {});
    return {
      label: fieldConfig.label,
      id: key,
      type: inputType,
      error: errorMessage ? _extends({}, fieldError, {
        message: errorMessage,
        type: (fieldError == null ? void 0 : fieldError.type) || ''
      }) // Merge errorMessage into fieldError and ensure type is always defined
      : fieldError // Use the unwrapped fieldError
    };
  });
};

/**
 * Determines if a field should be rendered based on the conditional logic.
 *
 * @param fieldId - The ID of the field to check.
 * @param conditionalFieldsConfig - The conditional fields configuration.
 * @param watchedValues - The watched values from useWatch.
 * @returns True if the field should be rendered, false otherwise.
 */
var shouldRenderField = function shouldRenderField(fieldId, conditionalFieldsConfig, watchedValues) {
  var isConditionalField = conditionalFieldsConfig.some(function (condition) {
    return condition.fields.includes(fieldId);
  });
  if (!isConditionalField) {
    return true;
  }
  return conditionalFieldsConfig.some(function (condition) {
    var conditionIndex = conditionalFieldsConfig.indexOf(condition);
    var watchedValue = watchedValues[conditionIndex];
    var conditionMet = false;
    switch (condition.operator) {
      case 'is':
        conditionMet = watchedValue === condition.value;
        break;
      case 'isNot':
        conditionMet = watchedValue !== condition.value;
        break;
      case 'greaterThan':
        conditionMet = watchedValue > condition.value;
        break;
      case 'lessThan':
        conditionMet = watchedValue < condition.value;
        break;
      case 'greaterThanOrEqual':
        conditionMet = watchedValue >= condition.value;
        break;
      case 'lessThanOrEqual':
        conditionMet = watchedValue <= condition.value;
        break;
      case 'contains':
        conditionMet = typeof watchedValue === 'string' && typeof condition.value === 'string' && watchedValue.includes(condition.value);
        break;
      case 'startsWith':
        conditionMet = typeof watchedValue === 'string' && typeof condition.value === 'string' && watchedValue.startsWith(condition.value);
        break;
      case 'endsWith':
        conditionMet = typeof watchedValue === 'string' && typeof condition.value === 'string' && watchedValue.endsWith(condition.value);
        break;
      case 'custom':
        conditionMet = condition.comparator ? condition.comparator(watchedValue) : false;
        break;
      default:
        console.warn("Unknown operator: " + condition.operator);
        conditionMet = false;
    }
    return condition.fields.includes(fieldId) && conditionMet;
  });
};

/**
 * Custom hook to manage form state and behavior.
 *
 * @param props - The hook props.
 * @returns The `react-hook-form` instance.
 */
var useDynamicForm = function useDynamicForm(props) {
  var formOptions = props.formOptions,
    autoSave = props.autoSave,
    enableLocalStorage = props.enableLocalStorage,
    resetOnSubmit = props.resetOnSubmit,
    focusFirstError = props.focusFirstError,
    debounceOnChange = props.debounceOnChange,
    onChange = props.onChange,
    onFormReady = props.onFormReady,
    config = props.config;
  // Flatten the config to access default values and types easily
  var flattenedConfig = _flattenConfig(config);
  // Create defaultValues object from flattened config
  var defaultValues = Object.keys(flattenedConfig).reduce(function (acc, key) {
    if (flattenedConfig[key].defaultValue !== undefined) {
      acc[key] = flattenedConfig[key].defaultValue;
    }
    return acc;
  }, {});
  var form = useForm(_extends({}, formOptions, {
    defaultValues: defaultValues
  }));
  var formState = form.formState,
    reset = form.reset,
    setFocus = form.setFocus,
    watch = form.watch,
    control = form.control;
  var isSubmitSuccessful = formState.isSubmitSuccessful,
    errors = formState.errors;
  // @ts-expect-error
  var _useState = useState(false),
    setIsLocalStorageLoaded = _useState[1];
  // Auto-save
  useEffect(function () {
    var intervalId = null;
    if (autoSave) {
      intervalId = setInterval(function () {
        autoSave.save(watch());
      }, autoSave.interval);
    }
    return function () {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoSave, watch]);
  // LocalStorage - Save data
  // @ts-expect-error
  useEffect(function () {
    if (enableLocalStorage) {
      var subscription = watch(function (data) {
        return saveToLocalStorage('form-data', data);
      });
      return function () {
        return subscription.unsubscribe();
      };
    }
  }, [enableLocalStorage, watch]);
  // LocalStorage - Load data
  useEffect(function () {
    if (enableLocalStorage) {
      var loadedData = loadFromLocalStorage('form-data');
      if (loadedData) {
        var resetData = {};
        for (var key in flattenedConfig) {
          var fieldConfig = flattenedConfig[key];
          if (loadedData[key] !== undefined) {
            if (fieldConfig.type === 'radio' || fieldConfig.type === 'checkbox' || fieldConfig.type === 'switch') {
              // Convert string to boolean for radio, checkbox, and switch types
              resetData[key] = loadedData[key] === 'true' ? true : loadedData[key] === 'false' ? false : loadedData[key];
              if (resetData[key] === undefined) {
                resetData[key] = fieldConfig.defaultValue;
              }
            } else if (fieldConfig.type === 'number') {
              // Convert string to number
              resetData[key] = loadedData[key] !== '' ? parseFloat(loadedData[key]) : fieldConfig.defaultValue;
            } else {
              resetData[key] = loadedData[key];
            }
          }
        }
        reset(resetData);
      }
      setIsLocalStorageLoaded(true);
    }
  }, [enableLocalStorage, reset]);
  // Reset on submit
  useEffect(function () {
    if (resetOnSubmit && isSubmitSuccessful) {
      reset();
    }
  }, [resetOnSubmit, isSubmitSuccessful, reset]);
  // Focus first error
  useEffect(function () {
    if (focusFirstError) {
      var firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        setFocus(firstErrorKey);
      }
    }
  }, [errors, focusFirstError, setFocus]);
  // Debounce on change
  // @ts-expect-error
  useEffect(function () {
    if (onChange) {
      var debouncedOnChange = debounce(onChange, debounceOnChange || 0);
      var subscription = watch(function (data) {
        return debouncedOnChange(data);
      });
      return function () {
        return subscription.unsubscribe();
      };
    }
  }, [watch, onChange, debounceOnChange]);
  // onFormReady callback
  useEffect(function () {
    if (onFormReady) {
      onFormReady(form);
    }
  }, [form, onFormReady]);
  return _extends({}, form, {
    control: control
  });
};

// Filepath: /src/features/dynamic-form/hooks/useFormFields.ts
/**
 * Custom hook to generate form fields from data and config.
 *
 * @param config - The form configuration.
 * @param formState - The `react-hook-form` form state.
 * @param control - The `react-hook-form` control object.
 * @returns An object containing the form fields and the fields to render.
 */
function useFormFields(config, formState, control) {
  // @ts-expect-error
  var _useState = useState(false),
    setUpdate = _useState[1];
  // Thêm useEffect để force re-render khi config thay đổi
  useEffect(function () {
    setUpdate(function (prev) {
      return !prev;
    });
  }, [config]);
  var flattenedConfig = useMemo(function () {
    return _flattenConfig(config);
  }, [config]);
  var conditionalFieldsConfig = useMemo(function () {
    return Object.keys(config).filter(function (fieldId) {
      var _config$fieldId$condi;
      return config[fieldId].conditional && typeof ((_config$fieldId$condi = config[fieldId].conditional) == null ? void 0 : _config$fieldId$condi.when) === 'string';
    }).map(function (fieldId) {
      var _config$fieldId$condi2, _config$fieldId$condi3;
      return {
        when: config[fieldId].conditional.when,
        operator: config[fieldId].conditional.operator || 'is',
        value: (_config$fieldId$condi2 = config[fieldId].conditional) == null ? void 0 : _config$fieldId$condi2.value,
        comparator: (_config$fieldId$condi3 = config[fieldId].conditional) == null ? void 0 : _config$fieldId$condi3.comparator,
        fields: config[fieldId].conditional.fields || []
      };
    });
  }, [config]);
  var watchedValues = useWatch({
    control: control,
    name: conditionalFieldsConfig.map(function (condition) {
      return condition.when;
    })
  });
  var fieldsToRender = useMemo(function () {
    return Object.keys(config).filter(function (fieldId) {
      return shouldRenderField(fieldId, conditionalFieldsConfig, watchedValues);
    });
  }, [config, conditionalFieldsConfig, watchedValues]);
  var fields = useMemo(function () {
    return getFields(flattenedConfig, formState);
  }, [flattenedConfig, formState]);
  return {
    fields: fields,
    fieldsToRender: fieldsToRender,
    conditionalFieldsConfig: conditionalFieldsConfig
  };
}

// Filepath: /src/features/validation/ValidationSchemaRegistry.ts
// Create a map of input types to Yup schema
// @ts-expect-error
var validationSchemaRegistry = {
  text: /*#__PURE__*/string(),
  email: /*#__PURE__*/string().email('Invalid email format'),
  password: /*#__PURE__*/string(),
  tel: /*#__PURE__*/string(),
  url: /*#__PURE__*/string().url('Invalid URL format'),
  checkbox: /*#__PURE__*/boolean(),
  textarea: /*#__PURE__*/string(),
  select: /*#__PURE__*/string(),
  radio: /*#__PURE__*/boolean(),
  date: /*#__PURE__*/date(),
  number: /*#__PURE__*/number(),
  "switch": /*#__PURE__*/boolean(),
  time: /*#__PURE__*/string(),
  'datetime-local': /*#__PURE__*/string(),
  combobox: /*#__PURE__*/string()
};
/**
 * Retrieves the validation schema registered for a given input type.
 *
 * @param type - The input type to retrieve the schema for.
 * @returns The registered schema, or undefined if no schema is registered for the type.
 */
var getValidationSchema = function getValidationSchema(type) {
  return validationSchemaRegistry[type];
};

var _excluded = ["validate"];
/**
 * Handles the 'required' validation rule.
 *
 * @param fieldSchema - The current field schema.
 * @param ruleValue - The value of the 'required' rule.
 * @param validationMessages - The validation messages.
 * @returns The updated field schema.
 */
var handleRequired = function handleRequired(fieldSchema, ruleValue, validationMessages) {
  var requiredMessage = typeof ruleValue === 'object' ? ruleValue.message : (validationMessages == null ? void 0 : validationMessages.required) || 'This field is required';
  return fieldSchema.required(requiredMessage);
};
/**
 * Handles the 'minLength' validation rule.
 *
 * @param fieldSchema - The current field schema.
 * @param ruleValue - The value of the 'minLength' rule.
 * @param validationMessages - The validation messages.
 * @returns The updated field schema.
 */
var handleMinLength = function handleMinLength(fieldSchema, ruleValue, validationMessages) {
  if (typeof ruleValue === 'number' || typeof ruleValue === 'string' || typeof (ruleValue == null ? void 0 : ruleValue.value) === 'number' || typeof (ruleValue == null ? void 0 : ruleValue.value) === 'string') {
    var _validationMessages$m;
    var value = typeof ruleValue === 'number' || typeof ruleValue === 'string' ? ruleValue : ruleValue.value;
    var message = ruleValue.message || (validationMessages == null || (_validationMessages$m = validationMessages.minLength) == null ? void 0 : _validationMessages$m.replace('{value}', value.toString())) || "minLength should be " + value;
    return fieldSchema.min(value, message);
  }
  return fieldSchema;
};
/**
 * Handles the 'maxLength' validation rule.
 *
 * @param fieldSchema - The current field schema.
 * @param ruleValue - The value of the 'maxLength' rule.
 * @param validationMessages - The validation messages.
 * @returns The updated field schema.
 */
var handleMaxLength = function handleMaxLength(fieldSchema, ruleValue, validationMessages) {
  if (typeof ruleValue === 'number' || typeof ruleValue === 'string' || typeof (ruleValue == null ? void 0 : ruleValue.value) === 'number' || typeof (ruleValue == null ? void 0 : ruleValue.value) === 'string') {
    var _validationMessages$m2;
    var value = typeof ruleValue === 'number' || typeof ruleValue === 'string' ? ruleValue : ruleValue.value;
    var message = ruleValue.message || (validationMessages == null || (_validationMessages$m2 = validationMessages.maxLength) == null ? void 0 : _validationMessages$m2.replace('{value}', value.toString())) || "maxLength should be " + value;
    return fieldSchema.max(value, message);
  }
  return fieldSchema;
};
/**
 * Handles the 'min' validation rule.
 *
 * @param fieldSchema - The current field schema.
 * @param ruleValue - The value of the 'min' rule.
 * @param validationMessages - The validation messages.
 * @returns The updated field schema.
 */
var handleMin = function handleMin(fieldSchema, ruleValue, validationMessages) {
  if (typeof ruleValue === 'number' || typeof ruleValue === 'string' || typeof (ruleValue == null ? void 0 : ruleValue.value) === 'number' || typeof (ruleValue == null ? void 0 : ruleValue.value) === 'string') {
    var _validationMessages$m3;
    var value = typeof ruleValue === 'number' || typeof ruleValue === 'string' ? ruleValue : ruleValue.value;
    var message = ruleValue.message || (validationMessages == null || (_validationMessages$m3 = validationMessages.min) == null ? void 0 : _validationMessages$m3.replace('{value}', value.toString())) || "min should be " + value;
    return fieldSchema.min(value, message);
  }
  return fieldSchema;
};
/**
 * Handles the 'max' validation rule.
 *
 * @param fieldSchema - The current field schema.
 * @param ruleValue - The value of the 'max' rule.
 * @param validationMessages - The validation messages.
 * @returns The updated field schema.
 */
var handleMax = function handleMax(fieldSchema, ruleValue, validationMessages) {
  if (typeof ruleValue === 'number' || typeof ruleValue === 'string' || typeof (ruleValue == null ? void 0 : ruleValue.value) === 'number' || typeof (ruleValue == null ? void 0 : ruleValue.value) === 'string') {
    var _validationMessages$m4;
    var value = typeof ruleValue === 'number' || typeof ruleValue === 'string' ? ruleValue : ruleValue.value;
    var message = ruleValue.message || (validationMessages == null || (_validationMessages$m4 = validationMessages.max) == null ? void 0 : _validationMessages$m4.replace('{value}', value.toString())) || "max should be " + value;
    return fieldSchema.max(value, message);
  }
  return fieldSchema;
};
/**
 * Handles the 'pattern' validation rule.
 *
 * @param fieldSchema - The current field schema.
 * @param ruleValue - The value of the 'pattern' rule.
 * @param validationMessages - The validation messages.
 * @returns The updated field schema.
 */
var handlePattern = function handlePattern(fieldSchema, ruleValue, validationMessages) {
  var regex = ruleValue instanceof RegExp ? ruleValue : new RegExp(ruleValue.value);
  var message = ruleValue.message || (validationMessages == null ? void 0 : validationMessages.pattern) || 'Invalid format';
  return fieldSchema.matches(regex, {
    message: message,
    excludeEmptyString: true
  });
};
/**
 * Applies a custom validation function to the field schema.
 *
 * @param fieldSchema - The current field schema.
 * @param validate - The custom validation function.
 * @returns The updated field schema.
 */
var applyCustomValidation = function applyCustomValidation(fieldSchema, validate) {
  return fieldSchema.test('custom-validation', 'Custom validation failed', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(value, context) {
      var result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return validate(value, context.parent);
          case 2:
            result = _context.sent;
            if (!(typeof result === 'string')) {
              _context.next = 5;
              break;
            }
            return _context.abrupt("return", context.createError({
              path: context.path,
              message: result
            }));
          case 5:
            return _context.abrupt("return", result !== false);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
/**
 * Creates a Yup validation schema based on the provided form configuration.
 *
 * @param config - The form configuration.
 * @returns The Yup schema.
 */
var createValidationSchema = function createValidationSchema(config) {
  var shape = {};
  var validationHandlers = {
    required: handleRequired,
    minLength: function minLength(fieldSchema, ruleValue, validationMessages) {
      return handleMinLength(fieldSchema, ruleValue, validationMessages);
    },
    maxLength: function maxLength(fieldSchema, ruleValue, validationMessages) {
      return handleMaxLength(fieldSchema, ruleValue, validationMessages);
    },
    min: function min(fieldSchema, ruleValue, validationMessages) {
      return handleMin(fieldSchema, ruleValue, validationMessages);
    },
    max: function max(fieldSchema, ruleValue, validationMessages) {
      return handleMax(fieldSchema, ruleValue, validationMessages);
    },
    pattern: function pattern(fieldSchema, ruleValue, validationMessages) {
      return handlePattern(fieldSchema, ruleValue, validationMessages);
    }
  };
  for (var fieldId in config) {
    var fieldConfig = config[fieldId];
    var validation = fieldConfig.validation,
      type = fieldConfig.type,
      validationMessages = fieldConfig.validationMessages;
    if (type === undefined) {
      console.warn("Field type is undefined for field: " + fieldId);
    }
    var fieldSchema = getValidationSchema(type) || mixed();
    if (validation) {
      var validate = validation.validate,
        otherValidations = _objectWithoutPropertiesLoose(validation, _excluded);
      for (var rule in otherValidations) {
        if (otherValidations.hasOwnProperty(rule)) {
          var ruleValue = validation[rule];
          var handler = validationHandlers[rule];
          if (handler) {
            fieldSchema = handler(fieldSchema, ruleValue, validationMessages);
          }
        }
      }
      if (typeof validate === 'function') {
        fieldSchema = applyCustomValidation(fieldSchema, validate);
      }
    }
    shape[fieldId] = fieldSchema;
  }
  return object().shape(shape);
};

var useRHFOptions = function useRHFOptions(config, formOptions, validateOnSubmit, validateOnChange, validateOnBlur) {
  // Specify the generic type here
  return useMemo(function () {
    var schema = createValidationSchema(config);
    var resolver = yupResolver(schema);
    return _extends({}, formOptions, {
      mode: validateOnSubmit ? 'onSubmit' : validateOnChange ? 'onChange' : validateOnBlur ? 'onBlur' : 'onSubmit',
      criteriaMode: 'all',
      resolver: resolver
    });
  }, [config, formOptions, validateOnSubmit, validateOnChange, validateOnBlur]);
};

var DynamicFormProvider = function DynamicFormProvider(_ref) {
  var form = _ref.form,
    children = _ref.children;
  return React.createElement(FormProvider, _extends({}, form), children);
};

/**
 * Default theme for the form.
 */
var defaultTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    text: '#212529',
    background: '#ffffff',
    border: '#ced4da',
    error: '#dc3545'
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  fontSizes: {
    small: '12px',
    medium: '14px',
    large: '16px'
  },
  fontWeights: {
    normal: 400,
    bold: 700
  },
  radii: {
    sm: '2px',
    md: '4px',
    lg: '8px'
  }
};
/**
 * Create a custom theme by extending the default theme.
 *
 * @param customTheme - The custom theme object.
 * @returns The merged theme object.
 */
var createTheme = function createTheme(customTheme) {
  return _extends({}, defaultTheme, customTheme, {
    colors: _extends({}, defaultTheme.colors, customTheme.colors || {}),
    space: _extends({}, defaultTheme.space, customTheme.space || {}),
    fontSizes: _extends({}, defaultTheme.fontSizes, customTheme.fontSizes || {}),
    fontWeights: _extends({}, defaultTheme.fontWeights, customTheme.fontWeights || {}),
    radii: _extends({}, defaultTheme.radii, customTheme.radii || {})
  });
};

// styles.ts
/**
 * Base styles for form elements.
 */
var baseFormElementStyles = /*#__PURE__*/css(["border:1px solid ", ";padding:", ";border-radius:", ";font-size:", ";&:focus{outline:none;box-shadow:0 0 0 2px ", ";}&::placeholder{color:", ";opacity:0.6;}"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.border;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.space.sm;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.radii.md;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.fontSizes.medium;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.colors.primary;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.colors.text;
});
/**
 * Styled form container.
 */
var FormContainer = /*#__PURE__*/styled.form.withConfig({
  displayName: "styles__FormContainer"
})(["display:", ";flex-direction:", ";gap:", ";", " padding:", ";background-color:", ";border:1px solid ", ";border-radius:", ";"], function (_ref7) {
  var $layout = _ref7.$layout;
  return $layout === 'grid' ? 'grid' : 'flex';
}, function (_ref8) {
  var $layout = _ref8.$layout,
    $horizontalLabel = _ref8.$horizontalLabel;
  return $layout === 'grid' || $horizontalLabel ? 'row' : 'column';
}, function (_ref9) {
  var $layoutConfig = _ref9.$layoutConfig,
    theme = _ref9.theme;
  return ($layoutConfig == null ? void 0 : $layoutConfig.gap) || theme.space.md;
}, function (_ref10) {
  var $layout = _ref10.$layout,
    $layoutConfig = _ref10.$layoutConfig;
  return $layout === 'grid' && css(["grid-template-columns:repeat(", ",1fr);"], ($layoutConfig == null ? void 0 : $layoutConfig.columns) || 12);
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.space.lg;
}, function (_ref12) {
  var theme = _ref12.theme;
  return theme.colors.background;
}, function (_ref13) {
  var theme = _ref13.theme;
  return theme.colors.border;
}, function (_ref14) {
  var theme = _ref14.theme;
  return theme.radii.md;
});
/**
 * Common styles for labels.
 */
var labelCommonStyles = /*#__PURE__*/css(["margin-bottom:", ";margin-right:", ";color:", ";font-weight:", ";width:", ";flex-shrink:0;"], function (_ref15) {
  var theme = _ref15.theme,
    $horizontalLabel = _ref15.$horizontalLabel;
  return $horizontalLabel ? '0' : theme.space.sm;
}, function (_ref16) {
  var theme = _ref16.theme,
    $horizontalLabel = _ref16.$horizontalLabel;
  return $horizontalLabel ? theme.space.md : '0';
}, function (_ref17) {
  var theme = _ref17.theme;
  return theme.colors.text;
}, function (_ref18) {
  var theme = _ref18.theme;
  return theme.fontWeights.bold;
}, function (_ref19) {
  var $labelWidth = _ref19.$labelWidth;
  return $labelWidth ? typeof $labelWidth === 'number' ? $labelWidth + "px" : $labelWidth : 'auto';
});
/**
 * Styled label.
 */
var Label = /*#__PURE__*/styled.label.withConfig({
  displayName: "styles__Label"
})(["", ""], labelCommonStyles);
/**
 * Styled input wrapper.
 */
var InputWrapper = /*#__PURE__*/styled.div.withConfig({
  displayName: "styles__InputWrapper"
})(["display:flex;margin-bottom:", ";align-items:", ";flex-direction:", ";label{", "}> :first-child{margin-right:", ";}"], function (_ref20) {
  var theme = _ref20.theme;
  return theme.space.md;
}, function (_ref21) {
  var $horizontalLabel = _ref21.$horizontalLabel;
  return $horizontalLabel ? 'center' : 'flex-start';
}, function (_ref22) {
  var $horizontalLabel = _ref22.$horizontalLabel;
  return $horizontalLabel ? 'row' : 'column';
}, labelCommonStyles, function (_ref23) {
  var $horizontalLabel = _ref23.$horizontalLabel;
  return $horizontalLabel ? '0.5em' : '0';
});
/**
 * Styled input.
 */
var Input = /*#__PURE__*/styled.input.withConfig({
  displayName: "styles__Input"
})(["", " &[type='number']{-moz-appearance:textfield;}&::-webkit-outer-spin-button,&::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}"], baseFormElementStyles);
/**
 * Styled submit button.
 */
var SubmitButton = /*#__PURE__*/styled.button.withConfig({
  displayName: "styles__SubmitButton"
})(["background-color:", ";color:", ";border:none;padding:", " ", ";border-radius:", ";font-weight:", ";cursor:pointer;transition:background-color 0.2s ease-in-out;&:hover{background-color:", ";}&:disabled{opacity:0.6;cursor:not-allowed;}"], function (_ref24) {
  var theme = _ref24.theme;
  return theme.colors.primary;
}, function (_ref25) {
  var theme = _ref25.theme;
  return theme.colors.light;
}, function (_ref26) {
  var theme = _ref26.theme;
  return theme.space.sm;
}, function (_ref27) {
  var theme = _ref27.theme;
  return theme.space.md;
}, function (_ref28) {
  var theme = _ref28.theme;
  return theme.radii.md;
}, function (_ref29) {
  var theme = _ref29.theme;
  return theme.fontWeights.bold;
}, function (_ref30) {
  var theme = _ref30.theme;
  return theme.colors.primary;
});
/**
 * Styled error message.
 */
var ErrorMessage = /*#__PURE__*/styled.div.withConfig({
  displayName: "styles__ErrorMessage"
})(["color:", ";font-size:", ";margin-top:", ";"], function (_ref31) {
  var theme = _ref31.theme;
  return theme.colors.error;
}, function (_ref32) {
  var theme = _ref32.theme;
  return theme.fontSizes.small;
}, function (_ref33) {
  var theme = _ref33.theme;
  return theme.space.xs;
});

// Filepath: /src/features/core/components/FlexLayout.tsx
var FlexLayout = function FlexLayout(_ref) {
  var onSubmit = _ref.onSubmit,
    children = _ref.children,
    className = _ref.className,
    formClassNameConfig = _ref.formClassNameConfig,
    style = _ref.style,
    layoutConfig = _ref.layoutConfig,
    horizontalLabel = _ref.horizontalLabel;
  return React.createElement(FormContainer, {
    onSubmit: onSubmit,
    className: (className || '') + " " + ((formClassNameConfig == null ? void 0 : formClassNameConfig.formContainer) || ''),
    "$layout": "flex",
    "$layoutConfig": layoutConfig,
    "$horizontalLabel": horizontalLabel,
    "data-layoutconfig": JSON.stringify(layoutConfig),
    "data-horizontallabel": horizontalLabel ? 'true' : 'false',
    style: style
  }, children);
};

// Filepath: /src/features/core/components/GridLayout.tsx
var GridLayout = function GridLayout(_ref) {
  var onSubmit = _ref.onSubmit,
    children = _ref.children,
    className = _ref.className,
    formClassNameConfig = _ref.formClassNameConfig,
    style = _ref.style,
    layoutConfig = _ref.layoutConfig,
    horizontalLabel = _ref.horizontalLabel;
  return React.createElement(FormContainer, {
    onSubmit: onSubmit,
    className: (className || '') + " " + ((formClassNameConfig == null ? void 0 : formClassNameConfig.formContainer) || ''),
    "$layout": "grid",
    "$layoutConfig": layoutConfig,
    "$horizontalLabel": horizontalLabel,
    "data-layoutconfig": JSON.stringify(layoutConfig),
    "data-horizontallabel": horizontalLabel ? 'true' : 'false',
    style: style
  }, children);
};

// Filepath: /src/features/core/LayoutRegistry.ts
// Create a map of layout types to components
var layoutRegistry = {
  flex: FlexLayout,
  grid: GridLayout
};
/**
 * Registers a new layout component for a given type.
 *
 * @param type - The layout type to register.
 * @param component - The component to register.
 */
var registerLayout = function registerLayout(type, component) {
  layoutRegistry[type] = component;
};
/**
 * Retrieves the component registered for a given layout type.
 *
 * @param type - The layout type to retrieve the component for.
 * @returns The registered component, or undefined if no component is registered for the type.
 */
var getLayoutComponent = function getLayoutComponent(type) {
  return layoutRegistry[type];
};

var FormLayout = function FormLayout(_ref) {
  var onSubmit = _ref.onSubmit,
    children = _ref.children,
    className = _ref.className,
    formClassNameConfig = _ref.formClassNameConfig,
    style = _ref.style,
    layout = _ref.layout,
    layoutConfig = _ref.layoutConfig,
    horizontalLabel = _ref.horizontalLabel,
    theme = _ref.theme;
  var mergedTheme = useMemo(function () {
    return theme ? _extends({}, defaultTheme, theme) : defaultTheme;
  }, [theme]);
  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    onSubmit(event);
  };
  // Get the layout component from the registry
  var LayoutComponent = getLayoutComponent(layout);
  if (!LayoutComponent) {
    console.warn("No layout component found for type: " + layout);
    return null; // Or return a default layout component
  }
  return React.createElement(ThemeProvider$1, {
    theme: mergedTheme
  }, React.createElement(LayoutComponent, {
    onSubmit: handleSubmit,
    className: className,
    formClassNameConfig: formClassNameConfig,
    style: style,
    layoutConfig: layoutConfig,
    horizontalLabel: horizontalLabel
  }, children));
};

/**
 * The theme context.
 */
var AppThemeContext = /*#__PURE__*/createContext(defaultTheme);
/**
 * Custom hook to access the theme context.
 *
 * @returns The theme object.
 */
var useTheme = function useTheme() {
  return useContext(AppThemeContext);
};
var ThemeProvider = function ThemeProvider(_ref) {
  var children = _ref.children,
    theme = _ref.theme;
  var mergedTheme = theme ? _extends({}, defaultTheme, theme) : defaultTheme;
  return React.createElement(AppThemeContext.Provider, {
    value: mergedTheme
  }, React.createElement(ThemeProvider$1, {
    theme: mergedTheme
  }, children));
};

var TextInput = function TextInput(_ref) {
  var _fieldConfig$validati;
  var id = _ref.id,
    fieldConfig = _ref.fieldConfig,
    formClassNameConfig = _ref.formClassNameConfig,
    disableAutocomplete = _ref.disableAutocomplete,
    horizontalLabel = _ref.horizontalLabel,
    labelWidth = _ref.labelWidth;
  var theme = useTheme();
  var label = fieldConfig.label;
  var fieldClassNameConfig = fieldConfig.classNameConfig || {};
  var formClassName = formClassNameConfig || {};
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      name: id,
      control: control,
      rules: fieldConfig.validation,
      defaultValue: fieldConfig.defaultValue
    }),
    field = _useController.field;
  return React.createElement(InputWrapper, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
  }, label && React.createElement(Label, {
    htmlFor: id,
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.label || formClassName.label
  }, label, ((_fieldConfig$validati = fieldConfig.validation) == null ? void 0 : _fieldConfig$validati.required) && typeof fieldConfig.validation.required === 'object' && React.createElement("span", {
    style: {
      color: theme.colors.error
    }
  }, "*")), React.createElement(Input, _extends({}, field, {
    className: fieldClassNameConfig.input || formClassName.input,
    id: id,
    autoComplete: disableAutocomplete ? 'off' : undefined
  })));
};

var StyledTextarea = /*#__PURE__*/styled.textarea.withConfig({
  displayName: "TextareaInput__StyledTextarea"
})(["border:1px solid ", ";padding:8px;border-radius:4px;font-size:", ";&:focus{outline:none;box-shadow:0 0 0 2px ", ";}&::placeholder{color:", ";opacity:0.6;}width:100%;min-height:100px;"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.border;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.fontSizes.medium;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.primary;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.colors.text;
});
var TextareaInput = function TextareaInput(_ref5) {
  var _fieldConfig$validati;
  var id = _ref5.id,
    fieldConfig = _ref5.fieldConfig,
    formClassNameConfig = _ref5.formClassNameConfig,
    disableAutocomplete = _ref5.disableAutocomplete,
    showInlineError = _ref5.showInlineError,
    horizontalLabel = _ref5.horizontalLabel,
    labelWidth = _ref5.labelWidth,
    error = _ref5.error;
  var label = fieldConfig.label;
  var fieldClassNameConfig = fieldConfig.classNameConfig || {};
  var formClassName = formClassNameConfig || {};
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      name: id,
      control: control,
      rules: fieldConfig.validation,
      defaultValue: fieldConfig.defaultValue
    }),
    field = _useController.field;
  return React.createElement(InputWrapper, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
  }, label && React.createElement(Label, {
    htmlFor: id,
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.label || formClassName.label
  }, label, ((_fieldConfig$validati = fieldConfig.validation) == null ? void 0 : _fieldConfig$validati.required) && React.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), React.createElement(StyledTextarea, _extends({}, field, {
    className: fieldClassNameConfig.input || formClassName.input,
    id: id,
    autoComplete: disableAutocomplete ? 'off' : undefined
  })), showInlineError && error && React.createElement(ErrorMessage, {
    className: fieldClassNameConfig.errorMessage || formClassName.errorMessage
  }, error.message));
};

var CheckboxInput = function CheckboxInput(_ref) {
  var id = _ref.id,
    fieldConfig = _ref.fieldConfig,
    formClassNameConfig = _ref.formClassNameConfig,
    showInlineError = _ref.showInlineError,
    horizontalLabel = _ref.horizontalLabel,
    labelWidth = _ref.labelWidth,
    error = _ref.error;
  var label = fieldConfig.label;
  var fieldClassNameConfig = fieldConfig.classNameConfig || {};
  var formClassName = formClassNameConfig || {};
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      name: id,
      control: control,
      rules: fieldConfig.validation,
      defaultValue: fieldConfig.defaultValue
    }),
    field = _useController.field;
  return React.createElement(InputWrapper, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
  }, label && React.createElement(Label, {
    htmlFor: id,
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.label || formClassName.label
  }, React.createElement(Input, _extends({}, field, {
    className: fieldClassNameConfig.input || formClassName.input,
    type: "checkbox",
    id: id,
    checked: !!field.value
  })), label), showInlineError && error && React.createElement(ErrorMessage, {
    className: fieldClassNameConfig.errorMessage || formClassName.errorMessage
  }, error.message));
};

var StyledSelect = /*#__PURE__*/styled.select.withConfig({
  displayName: "SelectInput__StyledSelect"
})(["border:1px solid ", ";padding:8px;border-radius:4px;font-size:", ";appearance:auto;&:focus{outline:none;box-shadow:0 0 0 2px ", ";}&::placeholder{color:", ";opacity:0.6;}width:100%;"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.border;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.fontSizes.medium;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.primary;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.colors.text;
});
var SelectInput = function SelectInput(_ref5) {
  var _fieldConfig$validati;
  var id = _ref5.id,
    fieldConfig = _ref5.fieldConfig,
    formClassNameConfig = _ref5.formClassNameConfig,
    showInlineError = _ref5.showInlineError,
    horizontalLabel = _ref5.horizontalLabel,
    labelWidth = _ref5.labelWidth,
    error = _ref5.error;
  var label = fieldConfig.label,
    options = fieldConfig.options;
  var fieldClassNameConfig = fieldConfig.classNameConfig || {};
  var formClassName = formClassNameConfig || {};
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      name: id,
      control: control,
      rules: fieldConfig.validation,
      defaultValue: fieldConfig.defaultValue
    }),
    field = _useController.field;
  return React.createElement(InputWrapper, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
  }, label && React.createElement(Label, {
    htmlFor: id,
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.label || formClassName.label
  }, label, ((_fieldConfig$validati = fieldConfig.validation) == null ? void 0 : _fieldConfig$validati.required) && React.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), React.createElement(StyledSelect, _extends({}, field, {
    className: fieldClassNameConfig.input || formClassName.input,
    id: id
  }), options == null ? void 0 : options.map(function (option) {
    return React.createElement("option", {
      key: option.value,
      value: option.value
    }, option.label);
  })), showInlineError && error && React.createElement(ErrorMessage, {
    className: fieldClassNameConfig.errorMessage || formClassName.errorMessage
  }, error.message));
};

var RadioGroup = /*#__PURE__*/styled.div.withConfig({
  displayName: "RadioInput__RadioGroup"
})(["display:flex;gap:16px;"]);
var RadioLabel = /*#__PURE__*/styled.label.withConfig({
  displayName: "RadioInput__RadioLabel"
})(["display:flex;align-items:center;gap:6px;cursor:pointer;"]);
var RadioInputStyled = /*#__PURE__*/styled.input.withConfig({
  displayName: "RadioInput__RadioInputStyled"
})(["appearance:none;width:16px;height:16px;border:1px solid ", ";border-radius:50%;cursor:pointer;transition:background-color 0.2s,border-color 0.2s;&:checked{background-color:", ";border-color:", ";}&:checked::after{content:'';display:block;width:8px;height:8px;background-color:white;border-radius:50%;margin:3px auto;}&:focus{outline:none;box-shadow:0 0 0 2px ", ";}"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.border;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.primary;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.primary;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.colors.primary;
});
var RadioInput = function RadioInput(_ref5) {
  var _fieldConfig$validati;
  var id = _ref5.id,
    fieldConfig = _ref5.fieldConfig,
    formClassNameConfig = _ref5.formClassNameConfig,
    showInlineError = _ref5.showInlineError,
    horizontalLabel = _ref5.horizontalLabel,
    labelWidth = _ref5.labelWidth,
    error = _ref5.error;
  var label = fieldConfig.label,
    options = fieldConfig.options;
  var fieldClassNameConfig = fieldConfig.classNameConfig || {};
  var formClassName = formClassNameConfig || {};
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      name: id,
      control: control,
      rules: fieldConfig.validation,
      defaultValue: fieldConfig.defaultValue
    }),
    field = _useController.field;
  return React.createElement(InputWrapper, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
  }, label && React.createElement(Label, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.label || formClassName.label
  }, label, ((_fieldConfig$validati = fieldConfig.validation) == null ? void 0 : _fieldConfig$validati.required) && React.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), React.createElement(RadioGroup, null, options == null ? void 0 : options.map(function (option) {
    return React.createElement(RadioLabel, {
      key: option.value,
      htmlFor: id + "-" + option.value
    }, React.createElement(RadioInputStyled, _extends({}, field, {
      type: "radio",
      id: id + "-" + option.value,
      name: id,
      value: option.value,
      checked: field.value === option.value
    })), option.label);
  })), showInlineError && error && React.createElement(ErrorMessage, {
    className: fieldClassNameConfig.errorMessage || formClassName.errorMessage
  }, error.message));
};

var DateInput = function DateInput(_ref) {
  var _fieldConfig$validati;
  var id = _ref.id,
    fieldConfig = _ref.fieldConfig,
    formClassNameConfig = _ref.formClassNameConfig,
    showInlineError = _ref.showInlineError,
    horizontalLabel = _ref.horizontalLabel,
    labelWidth = _ref.labelWidth,
    error = _ref.error;
  var label = fieldConfig.label;
  var fieldClassNameConfig = fieldConfig.classNameConfig || {};
  var formClassName = formClassNameConfig || {};
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      name: id,
      control: control,
      rules: fieldConfig.validation,
      defaultValue: fieldConfig.defaultValue
    }),
    field = _useController.field;
  return React.createElement(InputWrapper, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
  }, label && React.createElement(Label, {
    htmlFor: id,
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.label || formClassName.label
  }, label, ((_fieldConfig$validati = fieldConfig.validation) == null ? void 0 : _fieldConfig$validati.required) && React.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), React.createElement(Input, _extends({}, field, {
    className: fieldClassNameConfig.input || formClassName.input,
    type: "date",
    id: id
  })), showInlineError && error && React.createElement(ErrorMessage, {
    className: fieldClassNameConfig.errorMessage || formClassName.errorMessage
  }, error.message));
};

var NumberInputContainer = /*#__PURE__*/styled.div.withConfig({
  displayName: "NumberInput__NumberInputContainer"
})(["display:flex;align-items:center;width:fit-content;input{text-align:center;padding-right:0;width:100px;}"]);
var SpinButton = /*#__PURE__*/styled.button.withConfig({
  displayName: "NumberInput__SpinButton"
})(["background:none;border:1px solid ", ";padding:0 8px;height:100%;font-size:1rem;line-height:0;color:", ";cursor:pointer;&:hover{background-color:", ";}&:disabled{cursor:default;background-color:#efefef;}&:first-of-type{border-radius:4px 0 0 4px;border-right:none;}&:last-of-type{border-radius:0 4px 4px 0;border-left:none;}"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.border;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.text;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.background;
});
var NumberInput = function NumberInput(_ref4) {
  var _fieldConfig$validati, _fieldConfig$validati2, _fieldConfig$validati3;
  var id = _ref4.id,
    fieldConfig = _ref4.fieldConfig,
    formClassNameConfig = _ref4.formClassNameConfig,
    disableAutocomplete = _ref4.disableAutocomplete,
    showInlineError = _ref4.showInlineError,
    horizontalLabel = _ref4.horizontalLabel,
    labelWidth = _ref4.labelWidth,
    error = _ref4.error;
  var label = fieldConfig.label;
  var fieldClassNameConfig = fieldConfig.classNameConfig || {};
  var formClassName = formClassNameConfig || {};
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      name: id,
      control: control,
      rules: fieldConfig.validation,
      defaultValue: fieldConfig.defaultValue
    }),
    field = _useController.field;
  var _useState = useState(+field.value || 0),
    internalValue = _useState[0],
    setInternalValue = _useState[1];
  var clampValue = useCallback(function (value) {
    var _ref5 = fieldConfig.validation || {},
      min = _ref5.min,
      max = _ref5.max;
    var clampedValue = value;
    if (min !== undefined && typeof min === 'object' && value < +min.value) {
      clampedValue = +min.value;
    }
    if (max !== undefined && typeof max === 'object' && value > +max.value) {
      clampedValue = +max.value;
    }
    return clampedValue;
  }, [fieldConfig.validation]);
  useEffect(function () {
    setInternalValue(+field.value || 0);
  }, [field.value]);
  var handleIncrement = function handleIncrement() {
    var newValue = clampValue(internalValue + 1);
    setInternalValue(newValue);
    field.onChange(newValue);
  };
  var handleDecrement = function handleDecrement() {
    var newValue = clampValue(internalValue - 1);
    setInternalValue(newValue);
    field.onChange(newValue);
  };
  return React.createElement(InputWrapper, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
  }, label && React.createElement(Label, {
    htmlFor: id,
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.label || formClassName.label
  }, label, ((_fieldConfig$validati = fieldConfig.validation) == null ? void 0 : _fieldConfig$validati.required) && React.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), React.createElement(NumberInputContainer, null, React.createElement(SpinButton, {
    type: "button",
    onClick: handleDecrement,
    disabled: ((_fieldConfig$validati2 = fieldConfig.validation) == null ? void 0 : _fieldConfig$validati2.min) !== undefined && typeof fieldConfig.validation.min === 'object' && internalValue <= +fieldConfig.validation.min.value
  }, "-"), React.createElement(Input, _extends({}, field, {
    className: fieldClassNameConfig.input || formClassName.input,
    type: "number",
    id: id,
    onChange: function onChange(e) {
      field.onChange(e);
      setInternalValue(+e.target.value);
    },
    onBlur: function onBlur(e) {
      field.onBlur();
      var clampedValue = clampValue(+e.target.value);
      setInternalValue(clampedValue);
      field.onChange(clampedValue);
    },
    value: internalValue,
    autoComplete: disableAutocomplete ? 'off' : undefined
  })), React.createElement(SpinButton, {
    type: "button",
    onClick: handleIncrement,
    disabled: ((_fieldConfig$validati3 = fieldConfig.validation) == null ? void 0 : _fieldConfig$validati3.max) !== undefined && typeof fieldConfig.validation.max === 'object' && internalValue >= +fieldConfig.validation.max.value
  }, "+")), showInlineError && error && React.createElement(ErrorMessage, {
    className: fieldClassNameConfig.errorMessage || formClassName.errorMessage
  }, error.message));
};

var SwitchContainer = /*#__PURE__*/styled.label.withConfig({
  displayName: "SwitchInput__SwitchContainer"
})(["position:relative;display:inline-block;width:48px;height:24px;cursor:pointer;"]);
var SwitchInputStyled = /*#__PURE__*/styled.input.withConfig({
  displayName: "SwitchInput__SwitchInputStyled"
})(["opacity:0;width:0;height:0;&:checked + .slider{background-color:", ";}&:focus + .slider{box-shadow:0 0 1px ", ";}&:checked + .slider:before{transform:translateX(24px);}"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.primary;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.primary;
});
var Slider = /*#__PURE__*/styled.span.withConfig({
  displayName: "SwitchInput__Slider"
})(["position:absolute;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:0.4s;border-radius:24px;&:before{position:absolute;content:'';height:20px;width:20px;left:2px;bottom:2px;background-color:white;transition:0.4s;border-radius:50%;}"]);
var SwitchInput = function SwitchInput(_ref3) {
  var id = _ref3.id,
    fieldConfig = _ref3.fieldConfig,
    formClassNameConfig = _ref3.formClassNameConfig,
    showInlineError = _ref3.showInlineError,
    horizontalLabel = _ref3.horizontalLabel,
    labelWidth = _ref3.labelWidth,
    error = _ref3.error;
  var label = fieldConfig.label;
  var fieldClassNameConfig = fieldConfig.classNameConfig || {};
  var formClassName = formClassNameConfig || {};
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      name: id,
      control: control,
      rules: fieldConfig.validation,
      defaultValue: fieldConfig.defaultValue
    }),
    field = _useController.field;
  return React.createElement(InputWrapper, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
  }, label && React.createElement(Label, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.label || formClassName.label
  }, label), React.createElement(SwitchContainer, {
    htmlFor: id
  }, React.createElement(SwitchInputStyled, _extends({}, field, {
    type: "checkbox",
    id: id
  })), React.createElement(Slider, {
    className: "slider"
  })), showInlineError && error && React.createElement(ErrorMessage, {
    className: fieldClassNameConfig.errorMessage || formClassName.errorMessage
  }, error.message));
};

var TimePicker = function TimePicker(_ref) {
  var _fieldConfig$validati;
  var id = _ref.id,
    fieldConfig = _ref.fieldConfig,
    formClassNameConfig = _ref.formClassNameConfig,
    showInlineError = _ref.showInlineError,
    horizontalLabel = _ref.horizontalLabel,
    labelWidth = _ref.labelWidth,
    error = _ref.error;
  var label = fieldConfig.label;
  var fieldClassNameConfig = fieldConfig.classNameConfig || {};
  var formClassName = formClassNameConfig || {};
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      name: id,
      control: control,
      rules: fieldConfig.validation,
      defaultValue: fieldConfig.defaultValue
    }),
    field = _useController.field;
  return React.createElement(InputWrapper, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
  }, label && React.createElement(Label, {
    htmlFor: id,
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.label || formClassName.label
  }, label, ((_fieldConfig$validati = fieldConfig.validation) == null ? void 0 : _fieldConfig$validati.required) && React.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), React.createElement(Input, _extends({}, field, {
    className: fieldClassNameConfig.input || formClassName.input,
    type: "time",
    id: id
  })), showInlineError && error && React.createElement(ErrorMessage, {
    className: fieldClassNameConfig.errorMessage || formClassName.errorMessage
  }, error.message));
};

var DateTimePicker = function DateTimePicker(_ref) {
  var _fieldConfig$validati;
  var id = _ref.id,
    fieldConfig = _ref.fieldConfig,
    formClassNameConfig = _ref.formClassNameConfig,
    showInlineError = _ref.showInlineError,
    horizontalLabel = _ref.horizontalLabel,
    labelWidth = _ref.labelWidth,
    error = _ref.error;
  var label = fieldConfig.label;
  var fieldClassNameConfig = fieldConfig.classNameConfig || {};
  var formClassName = formClassNameConfig || {};
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      name: id,
      control: control,
      rules: fieldConfig.validation,
      defaultValue: fieldConfig.defaultValue
    }),
    field = _useController.field;
  return React.createElement(InputWrapper, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
  }, label && React.createElement(Label, {
    htmlFor: id,
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.label || formClassName.label
  }, label, ((_fieldConfig$validati = fieldConfig.validation) == null ? void 0 : _fieldConfig$validati.required) && React.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), React.createElement(Input, _extends({}, field, {
    className: fieldClassNameConfig.input || formClassName.input,
    type: "datetime-local",
    id: id
  })), showInlineError && error && React.createElement(ErrorMessage, {
    className: fieldClassNameConfig.errorMessage || formClassName.errorMessage
  }, error.message));
};

var ComboBoxContainer = /*#__PURE__*/styled.div.withConfig({
  displayName: "ComboBox__ComboBoxContainer"
})(["position:relative;width:100%;"]);
var DropdownList = /*#__PURE__*/styled.ul.withConfig({
  displayName: "ComboBox__DropdownList"
})(["position:absolute;top:100%;left:0;width:100%;border:1px solid ", ";border-radius:4px;background-color:white;z-index:10;list-style:none;padding:0;margin:4px 0 0 0;max-height:200px;overflow-y:auto;"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.border;
});
var DropdownItem = /*#__PURE__*/styled.li.withConfig({
  displayName: "ComboBox__DropdownItem"
})(["padding:8px;cursor:pointer;&:hover{background-color:", ";}&.selected{background-color:", ";color:white;}"], function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.background;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.primary;
});
var ComboBox = function ComboBox(_ref4) {
  var _fieldConfig$validati;
  var id = _ref4.id,
    fieldConfig = _ref4.fieldConfig,
    formClassNameConfig = _ref4.formClassNameConfig,
    showInlineError = _ref4.showInlineError,
    horizontalLabel = _ref4.horizontalLabel,
    labelWidth = _ref4.labelWidth,
    error = _ref4.error;
  var label = fieldConfig.label,
    options = fieldConfig.options;
  var fieldClassNameConfig = fieldConfig.classNameConfig || {};
  var formClassName = formClassNameConfig || {};
  var _useState = useState(false),
    isOpen = _useState[0],
    setIsOpen = _useState[1];
  var _useState2 = useState(''),
    inputValue = _useState2[0],
    setInputValue = _useState2[1];
  var _useState3 = useState(-1),
    highlightedIndex = _useState3[0],
    setHighlightedIndex = _useState3[1];
  var containerRef = useRef(null);
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      name: id,
      control: control,
      rules: fieldConfig.validation
    }),
    field = _useController.field;
  useEffect(function () {
    setInputValue(field.value || '');
  }, [field.value]);
  var filteredOptions = options ? options.filter(function (option) {
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  }) : [];
  var handleInputChange = function handleInputChange(event) {
    var val = event.target.value;
    setInputValue(val);
    field.onChange(event); // Update form state
    if (!isOpen && val) {
      setIsOpen(true);
    } else if (isOpen && !val) {
      setIsOpen(false);
    }
  };
  var handleOptionClick = function handleOptionClick(value) {
    setInputValue(value);
    field.onChange(value); // Update form state
    setIsOpen(false);
  };
  var toggleDropdown = function toggleDropdown() {
    setIsOpen(!isOpen);
  };
  var closeDropdown = useCallback(function () {
    setIsOpen(false);
  }, []);
  useEffect(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      return document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDropdown]);
  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex(function (prevIndex) {
        return filteredOptions.length > 0 ? Math.min(prevIndex + 1, filteredOptions.length - 1) : -1;
      });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex(function (prevIndex) {
        return prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1;
      });
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (highlightedIndex >= 0) {
        var selectedValue = filteredOptions[highlightedIndex].value;
        setInputValue(selectedValue);
        field.onChange(selectedValue); // Update form state
        setIsOpen(false);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
    }
  };
  useEffect(function () {
    if (isOpen && highlightedIndex >= 0 && containerRef.current) {
      var item = containerRef.current.querySelector("li:nth-child(" + (highlightedIndex + 1) + ")");
      if (item) {
        item.scrollIntoView({
          block: 'nearest',
          inline: 'start'
        });
      }
    }
  }, [isOpen, highlightedIndex]);
  return React.createElement(InputWrapper, {
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
  }, label && React.createElement(Label, {
    htmlFor: id,
    "$horizontalLabel": horizontalLabel,
    "$labelWidth": labelWidth,
    className: fieldClassNameConfig.label || formClassName.label
  }, label, ((_fieldConfig$validati = fieldConfig.validation) == null ? void 0 : _fieldConfig$validati.required) && React.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), React.createElement(ComboBoxContainer, {
    ref: containerRef
  }, React.createElement(Input, _extends({}, field, {
    className: fieldClassNameConfig.input || formClassName.input,
    id: id,
    value: inputValue,
    onChange: handleInputChange,
    onClick: toggleDropdown,
    onKeyDown: handleKeyDown,
    autoComplete: "off"
  })), isOpen && React.createElement(DropdownList, null, filteredOptions.length > 0 ? filteredOptions.map(function (option, index) {
    return React.createElement(DropdownItem, {
      key: option.value,
      onClick: function onClick() {
        return handleOptionClick(option.value);
      },
      className: index === highlightedIndex ? 'selected' : ''
    }, option.label);
  }) : React.createElement(DropdownItem, null, "No results found"))), showInlineError && error && React.createElement(ErrorMessage, {
    className: fieldClassNameConfig.errorMessage || formClassName.errorMessage
  }, error.message));
};

// Create a map of input types to components
// @ts-expect-error
var inputRegistry = {
  text: TextInput,
  email: TextInput,
  password: TextInput,
  tel: TextInput,
  url: TextInput,
  checkbox: CheckboxInput,
  textarea: TextareaInput,
  select: SelectInput,
  radio: RadioInput,
  date: DateInput,
  number: NumberInput,
  "switch": SwitchInput,
  time: TimePicker,
  'datetime-local': DateTimePicker,
  combobox: ComboBox
};
/**
 * Registers a new input component for a given type.
 *
 * @param type - The input type to register.
 * @param component - The component to register.
 */
var registerInput = function registerInput(type, component) {
  inputRegistry[type] = component;
};
/**
 * Retrieves the component registered for a given input type.
 *
 * @param type - The input type to retrieve the component for.
 * @returns The registered component, or undefined if no component is registered for the type.
 */
var getInputComponent = function getInputComponent(type) {
  return inputRegistry[type];
};

var InputRenderer = function InputRenderer(_ref) {
  var _fieldConfig$classNam;
  var field = _ref.field,
    config = _ref.config,
    formClassNameConfig = _ref.formClassNameConfig,
    disableAutocomplete = _ref.disableAutocomplete,
    showInlineError = _ref.showInlineError,
    horizontalLabel = _ref.horizontalLabel,
    labelWidth = _ref.labelWidth,
    renderErrorMessage = _ref.renderErrorMessage,
    customInputs = _ref.customInputs;
  var id = field.id,
    type = field.type,
    error = field.error;
  var fieldConfig = config[id] || {};
  // Prioritize custom input components
  var CustomInputComponent = customInputs == null ? void 0 : customInputs[type];
  var RegisteredInputComponent = getInputComponent(type);
  var InputComponent = CustomInputComponent || RegisteredInputComponent;
  var commonInputProps = {
    id: id,
    fieldConfig: fieldConfig,
    formClassNameConfig: formClassNameConfig,
    showInlineError: showInlineError,
    horizontalLabel: horizontalLabel,
    labelWidth: labelWidth,
    error: error,
    disableAutocomplete: disableAutocomplete
  };
  // Render error message using renderErrorMessage prop or default
  var errorMessageElement = showInlineError && error && renderErrorMessage ? renderErrorMessage(error, formClassNameConfig) : showInlineError && error ? React.createElement(ErrorMessage, {
    className: ((_fieldConfig$classNam = fieldConfig.classNameConfig) == null ? void 0 : _fieldConfig$classNam.errorMessage) || (formClassNameConfig == null ? void 0 : formClassNameConfig.errorMessage),
    children: error.message
  }) : null;
  if (!InputComponent) {
    console.warn("No input component found for type: " + type);
    return null;
  }
  return React.createElement(React.Fragment, null, React.createElement(InputComponent, _extends({}, commonInputProps)), errorMessageElement);
};

// Filepath: /src/features/form-renderer/components/FormContent.tsx
var FormContent = function FormContent(_ref) {
  var fieldsToRender = _ref.fieldsToRender,
    fields = _ref.fields,
    config = _ref.config,
    formClassNameConfig = _ref.formClassNameConfig,
    horizontalLabel = _ref.horizontalLabel,
    labelWidth = _ref.labelWidth,
    disableAutocomplete = _ref.disableAutocomplete,
    showInlineError = _ref.showInlineError,
    renderInput = _ref.renderInput,
    customInputs = _ref.customInputs;
  var _useFormContext = useFormContext(),
    register = _useFormContext.register,
    unregister = _useFormContext.unregister,
    errors = _useFormContext.formState.errors;
  useEffect(function () {
    fields.forEach(function (field) {
      var fieldConfig = config[field.id] || {};
      if (fieldsToRender.includes(field.id)) {
        register(field.id, fieldConfig.validation);
      } else {
        unregister(field.id);
      }
    });
  }, [register, unregister, config]);
  return React.createElement(React.Fragment, null, fields.filter(function (field) {
    return fieldsToRender.includes(field.id);
  }).map(function (field) {
    // Access the nested error object correctly
    var fieldError = errors[field.id];
    var fieldConfig = config[field.id] || {};
    var fieldClassNameConfig = fieldConfig.classNameConfig || {};
    var formClassName = formClassNameConfig || {};
    var commonInputProps = {
      id: field.id,
      fieldConfig: fieldConfig,
      formClassNameConfig: formClassNameConfig,
      showInlineError: showInlineError,
      horizontalLabel: horizontalLabel,
      labelWidth: labelWidth,
      error: fieldError,
      disableAutocomplete: disableAutocomplete
    };
    var inputElement = renderInput ? renderInput(field, fieldConfig, commonInputProps) : React.createElement(InputRenderer, {
      field: field,
      config: config,
      // @ts-expect-error
      formClassNameConfig: formClassNameConfig,
      disableAutocomplete: disableAutocomplete,
      showInlineError: showInlineError,
      horizontalLabel: horizontalLabel,
      labelWidth: labelWidth,
      customInputs: customInputs
    });
    return React.createElement(InputWrapper, {
      key: field.id,
      "$horizontalLabel": horizontalLabel,
      "$labelWidth": labelWidth,
      className: fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
    }, inputElement);
  }));
};

var ErrorMessage$1 = /*#__PURE__*/styled.div.withConfig({
  displayName: "ErrorRenderer__ErrorMessage"
})(["color:", ";font-size:", ";margin-top:", ";"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.error;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.fontSizes.small;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.space.xs;
});
var ErrorRenderer = function ErrorRenderer(_ref4) {
  var error = _ref4.error,
    formClassNameConfig = _ref4.formClassNameConfig,
    fieldConfig = _ref4.fieldConfig;
  var message = error.message || '';
  // Use validationMessages from fieldConfig if available
  if (fieldConfig && fieldConfig.validationMessages) {
    var template = fieldConfig.validationMessages[error.type];
    var values = {
      label: fieldConfig.label,
      value: error,
      error: error,
      config: fieldConfig
    };
    if (typeof template === 'function') {
      message = template(values);
    } else if (typeof template === 'string') {
      message = template;
    }
  }
  return React.createElement(ErrorMessage$1, {
    className: formClassNameConfig == null ? void 0 : formClassNameConfig.errorMessage
  }, message);
};

// Filepath: /src/components/ErrorSummary.tsx
var ErrorSummary = function ErrorSummary(_ref) {
  var errors = _ref.errors,
    formClassNameConfig = _ref.formClassNameConfig;
  return React.createElement("div", null, React.createElement("h3", null, "Error Summary:"), React.createElement("ul", null, Object.entries(errors).map(function (_ref2) {
    var key = _ref2[0],
      error = _ref2[1];
    return React.createElement("li", {
      key: key
    }, React.createElement(ErrorRenderer, {
      error: error,
      formClassNameConfig: formClassNameConfig
    }));
  })));
};

// src/features/form-renderer/components/FormFooter.tsx
var FormFooter = function FormFooter(_ref) {
  var footer = _ref.footer,
    showSubmitButton = _ref.showSubmitButton,
    renderSubmitButton = _ref.renderSubmitButton,
    isSubmitting = _ref.isSubmitting,
    showErrorSummary = _ref.showErrorSummary,
    errors = _ref.errors,
    formClassNameConfig = _ref.formClassNameConfig;
  return React.createElement(React.Fragment, null, footer, showSubmitButton && (renderSubmitButton ? renderSubmitButton(function () {}, isSubmitting) : React.createElement(SubmitButton, {
    type: "submit",
    disabled: isSubmitting,
    className: formClassNameConfig == null ? void 0 : formClassNameConfig.button
  }, "Submit")), showErrorSummary && Object.keys(errors).length > 0 && React.createElement(ErrorSummary, {
    errors: errors,
    formClassNameConfig: formClassNameConfig
  }));
};

// Filepath: /src/features/form-renderer/FormRenderer.tsx
var FormRenderer = function FormRenderer(_ref) {
  var onSubmit = _ref.onSubmit,
    className = _ref.className,
    _ref$formClassNameCon = _ref.formClassNameConfig,
    formClassNameConfig = _ref$formClassNameCon === void 0 ? {} : _ref$formClassNameCon,
    style = _ref.style,
    _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? 'grid' : _ref$layout,
    layoutConfig = _ref.layoutConfig,
    horizontalLabel = _ref.horizontalLabel,
    theme = _ref.theme,
    header = _ref.header,
    fieldsToRender = _ref.fieldsToRender,
    fields = _ref.fields,
    config = _ref.config,
    footer = _ref.footer,
    _ref$showSubmitButton = _ref.showSubmitButton,
    showSubmitButton = _ref$showSubmitButton === void 0 ? true : _ref$showSubmitButton,
    renderSubmitButton = _ref.renderSubmitButton,
    _ref$showErrorSummary = _ref.showErrorSummary,
    showErrorSummary = _ref$showErrorSummary === void 0 ? false : _ref$showErrorSummary,
    labelWidth = _ref.labelWidth,
    disableAutocomplete = _ref.disableAutocomplete,
    showInlineError = _ref.showInlineError,
    renderFormContent = _ref.renderFormContent,
    renderFormFooter = _ref.renderFormFooter,
    customInputs = _ref.customInputs;
  var form = useFormContext();
  var formState = form.formState,
    handleSubmit = form.handleSubmit;
  var content = renderFormContent ? renderFormContent({
    fieldsToRender: fieldsToRender,
    fields: fields,
    config: config,
    formClassNameConfig: formClassNameConfig,
    horizontalLabel: horizontalLabel,
    labelWidth: labelWidth,
    disableAutocomplete: disableAutocomplete,
    showInlineError: showInlineError,
    conditionalFieldsConfig: [],
    renderInput: function renderInput(field, fieldConfig, commonInputProps) {
      return React.createElement(React.Fragment, null);
    }
  }) : React.createElement(FormContent, {
    fieldsToRender: fieldsToRender,
    fields: fields,
    config: config,
    formClassNameConfig: formClassNameConfig,
    horizontalLabel: horizontalLabel,
    labelWidth: labelWidth,
    disableAutocomplete: disableAutocomplete,
    showInlineError: showInlineError,
    conditionalFieldsConfig: [],
    customInputs: customInputs
  });
  var footerContent = renderFormFooter ? renderFormFooter({
    footer: footer,
    showSubmitButton: showSubmitButton,
    renderSubmitButton: renderSubmitButton,
    isSubmitting: formState.isSubmitting,
    showErrorSummary: showErrorSummary,
    errors: formState.errors,
    formClassNameConfig: formClassNameConfig
  }) : React.createElement(FormFooter, {
    footer: footer,
    formClassNameConfig: formClassNameConfig,
    showSubmitButton: showSubmitButton,
    renderSubmitButton: renderSubmitButton,
    isSubmitting: formState.isSubmitting,
    showErrorSummary: showErrorSummary,
    errors: formState.errors
  });
  return React.createElement(FormLayout, {
    onSubmit: handleSubmit(onSubmit),
    className: className,
    formClassNameConfig: formClassNameConfig,
    style: style,
    layout: layout,
    layoutConfig: layoutConfig,
    horizontalLabel: horizontalLabel,
    theme: theme
  }, header, content, footerContent);
};

// Filepath: /src/DynamicForm.tsx
var DynamicForm = function DynamicForm(_ref) {
  var _ref$config = _ref.config,
    config = _ref$config === void 0 ? {} : _ref$config,
    onChange = _ref.onChange,
    onSubmit = _ref.onSubmit,
    formOptions = _ref.formOptions,
    header = _ref.header,
    footer = _ref.footer,
    _ref$readOnly = _ref.readOnly,
    readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
    _ref$disableForm = _ref.disableForm,
    disableForm = _ref$disableForm === void 0 ? false : _ref$disableForm,
    _ref$showSubmitButton = _ref.showSubmitButton,
    showSubmitButton = _ref$showSubmitButton === void 0 ? true : _ref$showSubmitButton,
    autoSave = _ref.autoSave,
    _ref$resetOnSubmit = _ref.resetOnSubmit,
    resetOnSubmit = _ref$resetOnSubmit === void 0 ? false : _ref$resetOnSubmit,
    _ref$focusFirstError = _ref.focusFirstError,
    focusFirstError = _ref$focusFirstError === void 0 ? false : _ref$focusFirstError,
    className = _ref.className,
    _ref$formClassNameCon = _ref.formClassNameConfig,
    formClassNameConfig = _ref$formClassNameCon === void 0 ? {} : _ref$formClassNameCon,
    style = _ref.style,
    _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? 'flex' : _ref$layout,
    _ref$layoutConfig = _ref.layoutConfig,
    layoutConfig = _ref$layoutConfig === void 0 ? {
      gap: '10px',
      columns: 2
    } : _ref$layoutConfig,
    _ref$horizontalLabel = _ref.horizontalLabel,
    horizontalLabel = _ref$horizontalLabel === void 0 ? false : _ref$horizontalLabel,
    labelWidth = _ref.labelWidth,
    _ref$enableLocalStora = _ref.enableLocalStorage,
    enableLocalStorage = _ref$enableLocalStora === void 0 ? false : _ref$enableLocalStora,
    _ref$debounceOnChange = _ref.debounceOnChange,
    debounceOnChange = _ref$debounceOnChange === void 0 ? 0 : _ref$debounceOnChange,
    _ref$disableAutocompl = _ref.disableAutocomplete,
    disableAutocomplete = _ref$disableAutocompl === void 0 ? false : _ref$disableAutocompl,
    _ref$showInlineError = _ref.showInlineError,
    showInlineError = _ref$showInlineError === void 0 ? true : _ref$showInlineError,
    _ref$showErrorSummary = _ref.showErrorSummary,
    showErrorSummary = _ref$showErrorSummary === void 0 ? false : _ref$showErrorSummary,
    _ref$validateOnBlur = _ref.validateOnBlur,
    validateOnBlur = _ref$validateOnBlur === void 0 ? false : _ref$validateOnBlur,
    _ref$validateOnChange = _ref.validateOnChange,
    validateOnChange = _ref$validateOnChange === void 0 ? true : _ref$validateOnChange,
    _ref$validateOnSubmit = _ref.validateOnSubmit,
    validateOnSubmit = _ref$validateOnSubmit === void 0 ? true : _ref$validateOnSubmit,
    theme = _ref.theme,
    customInputs = _ref.customInputs,
    onFormReady = _ref.onFormReady,
    renderSubmitButton = _ref.renderSubmitButton;
  var mergedFormOptions = useRHFOptions(config, formOptions, validateOnSubmit, validateOnChange, validateOnBlur);
  var form = useDynamicForm({
    config: config,
    formOptions: mergedFormOptions,
    autoSave: autoSave,
    enableLocalStorage: enableLocalStorage,
    resetOnSubmit: resetOnSubmit,
    focusFirstError: focusFirstError,
    debounceOnChange: debounceOnChange,
    onChange: onChange,
    onFormReady: onFormReady
  });
  var formState = form.formState,
    control = form.control,
    handleSubmit = form.handleSubmit;
  var _useFormFields = useFormFields(config,
    // Pass config instead of data
    formState, control),
    fields = _useFormFields.fields,
    fieldsToRender = _useFormFields.fieldsToRender,
    conditionalFieldsConfig = _useFormFields.conditionalFieldsConfig;
  var onSubmitHandler = function onSubmitHandler() {
    handleSubmit(function (data) {
      if (onSubmit) {
        onSubmit(data);
      }
    })();
  };
  return React.createElement(ThemeProvider, {
    theme: theme || {}
  }, React.createElement(DynamicFormProvider, {
    form: form
  }, React.createElement(FormRenderer, {
    onSubmit: onSubmitHandler,
    className: className,
    formClassNameConfig: formClassNameConfig,
    style: style,
    layout: layout,
    layoutConfig: layoutConfig,
    horizontalLabel: horizontalLabel,
    theme: theme,
    header: header,
    fieldsToRender: fieldsToRender,
    fields: fields,
    config: config,
    footer: footer,
    readOnly: readOnly,
    disableForm: disableForm,
    showSubmitButton: showSubmitButton,
    renderSubmitButton: renderSubmitButton,
    formOptions: formOptions,
    showErrorSummary: showErrorSummary,
    labelWidth: labelWidth,
    disableAutocomplete: disableAutocomplete,
    showInlineError: showInlineError,
    conditionalFieldsConfig: conditionalFieldsConfig,
    customInputs: customInputs
  })));
};

export { CheckboxInput, ComboBox, DateInput, DateTimePicker, DynamicForm, DynamicFormProvider, ErrorRenderer, ErrorSummary, FormContent, FormFooter, FormLayout, FormRenderer, NumberInput, RadioInput, SelectInput, SwitchInput, TextInput, TextareaInput, TimePicker, createTheme, debounce, defaultTheme, _flattenConfig as flattenConfig, _flattenObject as flattenObject, getErrorMessage, getFields, getInputComponent, getInputTypeFromValue, getLayoutComponent, loadFromLocalStorage, registerInput, registerLayout, saveToLocalStorage, shouldRenderField, useDynamicForm, useFormFields, useRHFOptions };
//# sourceMappingURL=react-dynamic-form.esm.js.map
