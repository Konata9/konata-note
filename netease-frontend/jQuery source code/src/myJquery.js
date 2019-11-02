(function(root) {
  // 无 new 构建实例
  const jQuery = function() {
    // 如果是 new jQuery() 会重复调用自身，造成死循环，所以借助 init 方法
    return new jQuery.prototype.init();
  };

  jQuery.fn = jQuery.prototype = {
    init: function() {},
    css: function() {}
  };

  // jQuery 扩展
  jQuery.fn.extend = jQuery.extend = function() {
    // 第一个参数类型判断
    const len = arguments.length;
    let target = arguments[0] || {};
    let deep = false;
    let i = 1;
    let copyIsArray = false;

    // 通过判断第一个参数来决定是否为深拷贝
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }

    if (typeof target !== "object") {
      target = {};
    }

    if (len === i) {
      // 只有一个参数时，是对 jQuery 本身的拓展
      target = this;
      i--;
    } else {
      // 对任意对象进行扩展时，不需要对传入的第一个对象进行修改
      for (; i < len; i++) {
        const opt = arguments[i];
        if (opt !== null) {
          for (let name in opt) {
            const copy = opt[name];
            let src = target[name];
            let clone = null;

            if (
              deep &&
              (jQuery.isPlainObject(copy) ||
                (copyIsArray = jQuery.isArray(copy)))
            ) {
              // 深拷贝部分是难点
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : [];
              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }
              // 需要理清楚 clone, copy 的含义以及为什么这么做
              target[name] = jQuery.extend(deep, clone, copy);
            } else {
              // 浅拷贝
              target[name] = copy;
            }
          }
        }
      }
    }

    return target;
  };

  // init 的实例与 jQuery 共享原型，通过 prototype 原型链传递
  jQuery.fn.init.prototype = jQuery.fn;

  jQuery.extend({
    // 拓展类型检测
    isPlainObject: function(input) {
      return Object.toString.call(input) === "[object Object]";
    },
    isArray: function(input) {
      return Object.toString.call(input) === "[object Array]";
    }
  });

  root.$ = root.jQuery = jQuery;
})(this);
// 这里的 this 指向全局，在浏览器环境中即为 window
