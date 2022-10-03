# Eslint

**Eslint 基础配置：**

- **env ：** 指定当前代码是运行在哪些环境

  ```js
  "env":{
      "borwser": true,  // 浏览器环境中：window document ...
      "commonjs": true, // node 环境中：_dirname ...
       "es2021": true // es2021环境中：WeakRef ...
  }

- **globals：** 手动配置全局成员。（变量默认不存在，需要手动添加）

  ```js
  "globals":{
      '_': true,  // 可以被读取，可以修改
      '$': false  // 可以读取，不可以被修改
  }
  ```

  

- **extends：** 应勇 eslint 三方规范

  1. eslint: all 内置所有规则；eslint:recommended 内置推荐规则

- **parserOptions：** eslint解析器选项配置，指定检查时按照哪个js版本语法检查，但这里不包含全局变量。全局变量需在env中配置。

- **rules：** 自定义特定语法格式化规范，会覆盖 extens 中的三方规范。

**Eslint 文件规范检测：**

- 检查目标文件：`npx eslint ./index.js`
- 检查目标文件夹内所有文件：`npx eslint ./src`
