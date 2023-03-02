## 模块机制详解：CJS 与 ESM

> CMAScript module 可以通过 import 加载 CommonJS 模块，而反过来 CommonJS 模块是无法通过 require() 来加载 ECMAScript module 的。这里涉及到一个本质问题，那就是模块加载的异同步。CommonJS 的 require() 机制是完全同步的，而 ECMAScript module 的 import 机制则是异步的


`module.exports` 与 `exports`
上一章中，我们提到了 `module.exports` 与 `exports` 的关系，为什么 `module.exports` 被覆盖后，原 `exports` 就不生效了。内在逻辑在上面的内容中就已经明晰了。

`CommonJS` 模块本质中有一个编译好的函数，其参数有` module`、`exports`。而传进去的 `module` 即 this，也就是 `Module` 实例；`exports` 则是 `this.exports`。传进去后，这两个对象均可以被目标模块内部随意更改。

只不过，我如果改了 `module.exports` 整体后，`this.exports` 的引用就指向新的 `exports` 了。而模块最终导出的是 Module 实例的 `this.exports`，所以原来的 `exports` 再怎么改也没用了。

另外，还有一个冷知识，我们是可以通过 console 输出形如 module._compile() 等函数的，因为它就是 Module 类的方法，而 module 又是 Module 实例。