# HTML 面试题

### DOCTYPE的作用是什么？

> 参考链接：[怪异模式和标准模式 - HTML（超文本标记语言） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)

DOCTYPE是HTML的标准网页声明，且必须声明在HTML文档的第一行，来告知浏览器的解析器用什么文档标准来解析这个文档，不同的渲染模式会影响到浏览器对CSS代码甚至JavaScript脚本的解析。

文档解析模式有：

- **怪异模式（quirks mode）**：该模式会支持一些非标准的特性来解析渲染页面。（如果没有声明DOCTYPE，默认会该模式）

- **标准模式（standards mode）**：浏览器会是使用W3C的标准解析渲染页面。（通常都是使用该模式：`<!DOCTYPE html>`）

- **准标准模式（almost standards mode）**：该模式下浏览器支持很多标准的特性，但没有标准规定那么严格。（该模式与标准模式非常接近，很少需要区分）

三种模式的区别：

- 怪异模式：页面按照HTML与CSS的定义渲染；

- 标准模式：会模拟更旧的浏览器的行为

- 准标准模式：会实施一种表单元格尺寸的怪异行为（与IE7之前的单元格布局方式一致），除此之外符合标准模式

### HTML、XHTML、XML有什么区别

> 参考链接：[HTML - 术语表 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML)、[XML - 术语表 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/XML)、[XHTML - 术语表 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/XHTML)

- **HTML（超文本标记语言）**：用来描述和定义网页内容的标记语言。在HTML4.0之前HTML先有实现再有标准，导致HTML非常混乱和松散

- **XML（可扩展标记语言）**：主要用于存储数据和结构，跟JSON也是相似的作用，但是更加轻量高效

- **XHTML（可扩展超文本标记语言）**：W3C为了解决HTML的混乱问题，因此将HTML和XML进行结合，从而形成一种HTML的严格语法形式

### 对HTML语义化的理解

语义化是指使用恰当的语义HTML标签，让页面具有良好的结构与含义。比如`<p>`代表段落、`<article>`代表正文等等。

语义化的好处主要有两点：

- 开发者友好：适用语义类标签增强了可读性，开发者也能够清晰地看出网页的结构，也更便于团队的开发和维护；

- 机器友好：带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，增强页面SEO。

### HTML5和HTML4的不同之处

- 文件类型生命仅有一种：`<!DOCTYPE HTML>`

- 新的解析顺序，不再基于[SGML](https://developer.mozilla.org/zh-TW/docs/Glossary/SGML)

- 新的元素：`section`、`video`、`progress`、`nav`、`meter`、`time`、`aside`、`canvas`、`command`、`datalist`、`details`、`embed`、`figcaption`、`figure`、`fotter`、`header`、`hgroup`、`keygen、``mark`、`output`、`rp`、`rt`、`ruby`、`source`、`summary`、`wbr`

- `input`元素新的类型：date、email、url等

- 新的属性：`ping`（用于`<a>`与`area`），`charset`（用于`<meta>`），`async`（用于`<script>`）

- 全域属性：`id`、`tabindex`、`repeat`

- 新的全域属性：`contentedittable`、`contextmenu`、`draggable`、`dropzone`、`hidden`、`spellcheck`

- 移除元素：`acronym`、`applet`、`basefont`、`big`、`center`、`dir`、`font`、`frame`、`frameset`、`isindex`、`noframes`、`strike`、`tt`

### 有哪些常用的`meta`标签

`meta`标签有 name 和 content两个属性来定义，来描述一个HTML网页文档的属性，例如作者、日期和时间、网页藐视、关键词、页面刷新等。

- charset：用于描述HTML文档的编码格式
  
  ```html
  <meta chartset="UTF-8" >
  ```

- http-equiv：相当于http的文件头作用，比如下面的代码可以设置http的缓存过期时间
  
  ```html
  <meta http-equiv="expires" content="Sun Jan 09 2022 15:26:11 GMT+0800" >
  ```

- viewport：控制视口的大小和比例
  
  ```html
  <meta name="viewport" content="width=device-width initial-scale=1 maximun-scale=1" >
  ```

- apple-mobile-web-app-status-bar-style：设置苹果手机状态栏背景颜色
  
  ```html
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" >
  ```

### src和href的区别

- **src是指向外部资源的位置**，指向的内容会嵌入到文档中当前标签所在的位置，在请求src资源时会将其指向的资源下载并应用到文档内，如js脚本、img图片和frame等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，所以一般js脚本会放在底部而不是头部。

- **href是指向网络资源的所在位置（超链接）**，用来建立和当前元素或文档之间的连接，当浏览器识别到它指向的文件时，就会并行下载资源，不会停止对当前文档的处理。

### `img`的srcset的作用

可以设计响应式图片，我们可以使用两个新的属性srcset和sizes来提供更多额外的资源图片和提示，帮助浏览器选择正确的一个资源。

- srcset 定义了我吗运行浏览器选择的图像集，以及每个图像的大小

- sizes 定义了一组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图片尺寸是最佳选择

所以有了这些属性，浏览器可以：

- 查看设备的宽度

- 检查sizes列表中哪个媒体条件是第一个为真

- 查看给予该媒体查询的槽大小

- 加载srcset列表中引用最接近所选的槽大小的图像

```html
<!-- srcset提供根据屏幕条件选取图片的能力 -->
<img src="demo-200.png"
     alt="demo"
     srcset="demo-200.png 200w,
             demo-400.png 400vw"
     sizes="(min-width: 600px) 200px, 50vw">
```

同时，`<picture>`元素通过包含零或多个`<source>`和一个`<img>`元素来为不同的显示/设备场景提供图像版本。浏览器会选择最匹配的子`<source>`元素，如果没有匹配的`<img>`元素的src属性中的URL，然后，所选图像呈现在`<img>`元素占据的空间。

```html
<picture>
    <source srcset="demo-200.png" 
            media="(min-width: 800px)">
    <img src="demo-400.png" alt="demo">
</picture>
```

### script标签中的defer和async的区别

- defer：浏览器指示脚本在文档被解析后执行，script被异步执行加载后并不会立刻执行，而是等到文档全部被解析后执行

- async：同样是异步加载脚本，区别是脚本加载完毕后立即执行，这导致async属性下的脚本是乱序的，对于script有前后依赖关系的情况下并不适用。

> 蓝色线代表网络读取，红色线代表执行时间，这两个都是针对脚本的；绿色线代表html解析

![html-script-defer-async](../assets/images/html-script-defer-async.png)

### 前端存储方式

- cookie
  
  - 在HTML5标准前本地存储的主要方式
  
  - 优点是兼容性好，请求头自带cookies
  
  - 缺点是大小只有4k，自动请求头加入cookie浪费流量，每个domain限制20个cookie，使用起来麻烦，需要自行封装

- localStorage
  
  - HTML5加入的以键值对为标准的方式
  
  - 优点是操作方便，永久性存储（触发手动删除），大小为5M，兼容IE8+

- sessionStorage
  
  - 与localStorage基本类似，区别是sessionStorage当前页面关闭后会被清理，而且与cookie、localStorage不同的是，它不能在所有同源窗口中共享，是会话级别的存储方式

- Web SQL
  
  - 2010年被W3C废弃的本地数据库存储方案，但是主流浏览器（火狐除外）都已经有了相关实现
  
  - Web SQL类似SQLite，是真正意义上的关系型数据库，用SQL进行操作，当我们用JavaScript时要进行转换，较为繁琐

- IndexedDB
  
  - 是被正式纳入HTML5标准的数据库存储方案，它是NoSQL数据库，用键值对进行存储，可以进行快速读取操作，非常适合Web场景，同时用JavaScript进行操作会非常方便
