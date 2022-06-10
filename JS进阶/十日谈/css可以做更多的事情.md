> **Tip: 🔔📏**
>
> - css 的职责是负责定义元素如何展现，页面所有的元素的样式不管是以来业务需求还是静态的都
>   应该尽可能的交由 css 来完成。

> **举个 🌰**
> 树形结构与三角标

```html
<!-- css -->
<style>
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  ul {
    list-style: url("https://p5.ssl.qhimg.com/t018438001db494c5f3.png");
  }

  li.expand {
    list-style: url("https://p4.ssl.qhimg.com/t0167b045701562f010.png");
  }
  .tree li > ul {
    display: none;
  }

  .tree li.expand > ul {
    display: block;
  }
</style>

<!-- html -->
<body>
  <ul class="tree">
    <li>项目1</li>
    <li>
      项目2
      <ul>
        <li>子项2.1</li>
        <li>子项2.2</li>
      </ul>
    </li>
    <li class="expand">
      项目3
      <ul>
        <li>子项3.1</li>
        <li>子项3.2</li>
      </ul>
    </li>
    <li>
      项目4
      <ul>
        <li>子项4.1</li>
        <li>子项4.2</li>
      </ul>
    </li>
    <li>项目5</li>
  </ul>
</body>
```

> **📎 思考：** 我们通过 ul>li 来实现树形的层级列表，这导致列表的默认样式是原点。
>
> - 方式一：我们设置列表元素的 list-sttyle 属性为三角图标，当 Li 的 class 属性被设置为 expend 达到切换三角图标实现设计图的效果。
>
> **❓ 存在问题：**
>
> - 因为 list-style 属性不能设置图片的大小，必须根据元素里的文字大小事先确定图标的大小。如果将来文字大小需要进行调整那么图标的大小也需要跟着调整。
> - 因为要下载图片，所以会多出一些不必要的 HTTP 请求，影响性能。

> **通过 css 来实现三角图标 🌰：**

```html
<!-- css -->
<style>
  ul {
    list-style: none;
  }

  .tree li::before {
    color: #999;
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 10.4px;
    border-color: transparent;
    border-left-color: currentColor;
    transform: translateX(6px);
  }

  .tree li.expand::before {
    transform: rotate(90deg) translateX(6px);
  }

  .tree li > ul {
    display: none;
  }

  .tree li.expand > ul {
    display: block;
  }
</style>

<!-- js -->
<script>
  const tree = document.querySelector(".tree");

  tree.addEventListener("click", (evt) => {
    if (evt.target.tagName === "LI") {
      if (evt.target.className === "expand") {
        evt.target.className = "";
      } else {
        evt.target.className = "expand";
      }
    }
  });
</script>
<!-- 省略其他代码 -->
```

> **👀 发现：** 我们通过 css 的伪元素实现了三角的绘制
>
> - border-width: 6px 10.4px （1: 根号 3） 表示将这个伪元素的上下边框设置为 6px，左右边框设置为 10.4px
> - border-color: transparent 表示将这个伪元素的 4 个边框的颜色设置为透明色
> - border-left-color: currentColor 表示将这个伪元素的左边框的颜色设置为当前元素的文字颜色
> - transform: translateX(6px)表示将这个伪元素向右偏移 6px, 这样使得这个小三角和列表项的文字中间的间隔不至于太宽

> **✨ 小练习：** 实现箭头、吃豆人图案；

```html
<!-- css -->
<style>
  .icon {
    display: inline-block;
    width: 0;
    font-size: 0;
    position: relative;
    margin-right: 20px;
  }

  .pacman {
    width: 0px;
    height: 0px;
    border: 50px solid red;
    border-right: 50px solid transparent;
    border-radius: 50%;
  }

  .arrow {
    width: 180px;
    height: 70px;
    margin: 0 70px;
    background-color: red;
  }

  .arrow::before {
    position: absolute;
    border: solid 35px transparent;
    border-left-color: white;
    content: "";
  }

  .arrow::after {
    position: absolute;
    right: -70px;
    border: solid 35px transparent;
    border-left-color: red;
    content: "";
  }
</style>

<!-- html -->
<div class="icon arrow"></div>
<div class="icon pacman"></div>
```
