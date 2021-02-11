import {useEffect, useRef, useState} from 'react';
import MarkDown from "../../MarkDown";
import './index.scss';

function Article(props) {

  const [hrefs, setHrefs] = useState([]);
  const markdownContent = `## 编译原理

**传统代码编译的三个步骤**

[作用域](#作用域)

1. 分词/词法分析 Tokenizing

   $c = \\pm \\sqrt{a^2 + b^2}$
   
   - 词法单元token，一个单词是否被作为token取决于它在该语言下是否有意义

     \`\`\`javascript
     // Example
     var a = 2;
     // After tokenizing
     var, a, =, 2, ;
     \`\`\`

2. 解析/语法分析 Parsing

   - 将Token流（数组）转化为一个逐级嵌套的语法结构树，i.e. 抽象语法树 AST（Abstract Syntax Tree）

     \`\`\`js
     - VariableDeclaration
     \t- Identifier
       - AssignmentExpression
     \t\t- NumericLiteral
     \`\`\`

3. 代码生成

> *JavaScript的编译发生在代码执行前的几微秒*

---

## 作用域

**LHS和RHS i.e. Left-hand-side and Right-hand-side**

- 什么是LHS和RHS呢？

  \`\`\`js
  var a = 2;
  console.log(a)
  /* 1.在作用域声明新变量a
   * 2.a = 2, 进行LHS查询变量a并进行赋值
   * 3.RHS查询console，发现log方法
   * 4.RHS查询a，传入console.log
   */
  \`\`\`

**ReferenceError和TypeError**

- ReferenceError：RHS查询找不到变量，抛出错误
- TypeError：RHS找到了变量但是进行了不合理的操作，抛出TypeError

---

## 提升

**鸡蛋问题？先有（声明）还是先有（赋值）**

> 先有声明，后有赋值；所有变量和函数的所有声明会在任何代码在执行前首先被处理
>
> :warning: 这里强调的是 \`函数声明\`而不是\`函数表达式\` ，通过提升的原理，我们也可以知道当使用函数表达式时
>
> \`\`\`js
> // 其实如果调用如下函数，相当于把undefined当作函数使用，会抛出TypeError错误
> someFunction()
> let someFunction = function() {...} // -> 只会提升someFunction这个变量
> \`\`\`
>
> :grey_question:What if using named function instead of anonymous function.
>
> \`\`\`js
> let someFunction = function likeThis() {...} // 根据LHS与RHS，只有在执行时，才会访问并声明函数 likeThis
> \`\`\`

\`\`\`js
// Guess the output, ReferenceError or undefined or just 2?
console.log(a);\t// Answer: undefined
var a = 2;

/* Solution:
 * 1. var a;
 * 2. console.log(a);
 * 3. a = 2;
 */
\`\`\`

> **需要注意的是，函数提升的优先级大于变量**

:grey_question:IIFF: Immediately Invoked Function Expression 立即执行函数表达式

---

## 闭包

> :question:什么是闭包：
>
> 当函数可以记住并访问所在的词法作用域，即使函数实在当前词法作用域以外执行，这时就产生了闭包
>
> 通过将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何时执行这个函数都会使用闭包

\`\`\`js
function wait(message) {
  // 查看官方文档：var timeoutID = scope.setTimeout(code[, delay]);
  // 内置函数setTimeout保持一个函数的引用，delay时间结束调用函数
  setTimeout( function timer() {
    console.log(message)
  }, 1000);
}

wait('Test'); // 'Test'
\`\`\`

:question:什么是词法作用域：词法作用域是在写代码或者定义时确定的

\`\`\`js
// Example
for (var i=0; i<=5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i*1000)
}
\`\`\`

:question:上面的代码会输出连续输出6个6，为什么呢？

上面的代码体现了闭包，timer()的作用域包含了\`i\` ，又因为setTimeout这个异步操作属于宏任务，所以它会等到其他同步的代码执行完之后再执行。等到同步的代码执行完后，\`i\`的值变为了6，最后调用timer回调函数，RHS查询\`i\`的值，输出的一定都会是6。

:question:ES6中使用let实现的for会正常连续输出0～6，是怎么实现的？

\`\`\`js
for (let i=0; i<=5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i*1000)
}
\`\`\`

使用\`let\`声明变量后，每次迭代都会生成一个局部作用域，所以内部闭包的回调函数访问到的外部的局部作用域，而局部作用域中的\`i\` 并不是全局变量，所以不会被污染。关于为什么明明每次迭代都是声明了一个\`i\` 但是\`i\`依然可以拿到上一次迭代的值的问题，这是由内部的引擎实现的。

接下来看看Babel把上面的ES6语法转化为没有\`let\`的ES5是怎么样的

\`\`\`js
"use strict";

var _loop = function _loop(i) {
    setTimeout(function timer() {
        console.log(i);
    }, i * 1000);
};

for (var i = 0; i <= 5; i++) {
    _loop(i);
}
\`\`\`

正好诠释了闭包有关作用域的魔力`;
  const links = useRef({});

  useEffect(() => {
    setHrefs(links.current.list);
  }, [])

  return (
    <div className={'content'}>
      <MarkDown content={markdownContent} links={links} />
      {
        hrefs ?
          <div style={{ marginLeft: '20px' }} >
            <div
              className={'hrefWrapper'}
            >
              {
                hrefs.map((href, index) => {
                  return (
                    <div key={index} className={'href'}>
                      <a href={`#${href}`}>{href}</a>
                    </div>
                  );
                })
              }
            </div>
          </div>
          : null
      }
    </div>
  );
}

export default Article;
