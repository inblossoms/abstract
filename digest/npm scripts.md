#  npm scripts

####  `npm `

- 不仅用于 **模块管理** ，同时用于 **脚本执行**。

- `package.json` 文件中的 `scripts` 字段用于指定脚本命令，供 `npm` 直接调用。

  ```js
  {
      "scripts": {
  		"commit": "sh commit"
      }
  }
  
  /*
  	其中 commit.sh 文件内容为：
  	git add .
  	git commit -m 'common commit'
  	git push
  */
  ```

- 当我们运行 `npm run commit` 或者 `npm run-script commit` 便相当于执行了 `sh commit` 任务。

####　`npm run & npm run-script`

- 前者是后者的缩写，都是执行 `package.json` 文件 `scripts` 字段下指定的任务。

- 直接运行 `npm run` 或 `npm run-script`，不加参数会列出 `scripts` 属性下所有可运行的命令极其命令内容。

  ```bash
  $ npm run
  Available scripts in the user-service package:
    commit
      sh commit.sh
    nodeIt
      node demo.js
    ...
  ```

#### `智能路径`

- `npm run` 命令会自动在环境变量 `$PATH` 添加 `node_modules/.bin` 目录，所以 `scripts` 字段里面调用命令时不用加上路径。

- 所以我们在 `package.json` 文件内的 `scripts` 字段内指定任务的时候 **一般** 无需指定脚本文件的路径，只需要将脚本放到 `./node_module/.bin/` 目录下即可，命令会在 **这个目录** 下自动寻找对应的脚本文件。而无需使用 `./node_modules/.bin/jshint **.js`

- 同样我们可以指定需要运行的脚本文件位置，例如：

  ```js
  "scripts":{
  	"nodeInit": "node extemple/index.js"
  }
  ```

#### `npm test & npm start`

- `npm` 内置了两个简写的命令，`npm test` 等同于执行 `npm run test`，`npm start` 等同于执行 `npm run start`。

  这两个 `test`、`start` 都可以在 `scripts` 字段下自己定义。

#### `管道式命令`

- 如果希望同时执行 **多个** 任务，可以借用 **管道命令** 将多个操作连接在一起。

- 在 `package.json` 文件的 `scripts` 字段内的一个任务可以由多个子任务组成。
  - `|` 连接两个任务：`"build-js": "browserify browser/main.js | uglifyjs -mc > static/bundle.js"`
  - `&` 任务内部引用其他任务，子任务 **平行** 执行：`"commit": "npm run test & npm run commit"`
  - `&&` 任务内部引用其他任务，子任务 **先后** 执行：`"build": "npm run build-js && npm run build-css"`
  
- **操作实例：** 

  ```js
  "scripts": {
    "build-css": "autoprefixer -b 'last 2 versions' < assets/styles/main.css | cssmin > dist/main.css"
  }
  
  /*
  	示例中: 
  		在 scripts 节点中定义了 build-css 任务，该任务由两个任务组成；当执行 npm run build-css 时会执行两个子任务
  	注：需要两个子任务模块在本地或全局已安装，并正确运行
  */ 
  ```

#### `bash 脚本`

- 写在 `scripts` 属性中的命令，也可以在 `node_modules/.bin` 目录中直接写成 `bash` 脚本。下面是一个 `bash` 脚本（命名为：`build-js.sh`）。

  ```bash
  #!/bin/bash
  cd site/main
  browserify browser/main.js | uglifyjs -mc > static/bundle.js
  ```

- 接下来我们可以在 `package.json` 内定义执行该脚本的命令：

  ```js
  "scripts": {
    "build-js":"sh bin/build-js.sh"
  }
  ```

- 将脚本文件权限更改为 **可执行** ，之后我们运行：`npm run build-js` , 即可自动执行建立好的脚本

#### `参数`

- `npm run` 命令还可以接参数

- `package.json` 在 `newTxt` 任务中未指定具体执行的脚本文件

  ```js
  "scripts":{
  	"newTxt":"sh"
  }
  ```

- 在 `node_module/.bin/` 下新建一个待会要传入 `newTxt` 任务的脚本文件 `newTxt.sh`，（win: new-Item newTxt -type file）

- 运行 `npm run newTxt -- newTxt.sh` ，这样，nexTxt.sh 便会作为参数传入 `newTxt` 任务中。

- 由于一个命令可以执行多个脚本：所以传入的参数不会覆盖原来的参数，而是并行（或先后）执行。

  ```js
  "scripts":{
    "test":"mocha test/"
  }
  
  $ npm run test -- anothertest.js
  // 等同于
  $ mocha test/ anothertest.js
  ```

- 以上执行命令表示，`mocha` 要运行所有 `test` 子目录的测试脚本，**以及** 另外一个测试脚本 `anothertest.js`。

  - 传入参数的格式：`--`
    在参数之前加入 `--` 并用空格使命令与参数隔开
  - 其他参数：
    `npm run` 本身有一个参数-s，表示关闭 `npm` 工具本身的输出，**只输出脚本产生的结果**。

#### `scripts 脚本命令实践`

- **npm-run-all** 用于方便地运行多个 `scripts` 脚本的命令，`npm install npm-run-all --save-dev` 执行安装。

  - 继发执行

    ```js
    $ npm-run-all build:html build:js
    # 继发执行 build:html 和 build:js 两个任务；等同于
    # $ npm run build:html && npm run build:js
    ```

  - 并行执行：`--parallel`

    ```js
    $ npm-run-all --parallel watch:html watch:js
    # 等同于
    # $ npm run watch:html & npm run watch:js
    ```

  - 混合执行：**并行与继发混合**

    ```js
    $ npm-run-all clean lint --parallel watch:html watch:js
    # 等同于
    # $ npm-run-all clean lint
    # $ npm-run-all --parallel watch:html watch:js
    ```

  - 通配执行

    ```js
    $ npm-run-all --parallel watch:*
    # 会并行执行所有符合 watch:* 的任务
    ```

#### `常见脚本命令`

- `start` 脚本命令：一般用于项目初始化
- `dev` 脚本命令：规定开发阶段所要做的处理，比如监视文件变化、实时编译……
- `server` 脚本命令：一般用于启动服务
- `test` 脚本命令：一般用于执行测试 **单元测试**、`*-lint`……
- `prod` 脚本命令：一般用于规定进入生产环境时需要做的处理
- `help` 脚本命令：`help` 脚本命令一般用于展示帮助信息。
- `docs` 脚本命令：`docs` 脚本命令一般用于生成文档。

#### `pre- 和 post- 脚本命令`

- `npm run` 为每条命令提供了 `pre-` 和 `post-` 两个钩子（`hook`）。以 `npm run test` 为例，如果我们的 `scripts` 字段规定了 `pretest` 和 `posttest`：

  ```js
  "scripts": {
      "test": "mocha test/",
      "pretest": "echo test started!",
      "posttest": "echo test end!"
  }
  ```

- 则会先执行 `pretest` 任务，再执行 `test` 任务，完成 `test` 任务后即执行 `posttest` 任务。

- 可以简单的将二者理解为：**预执行**、**后执行**

#### `内部变量`

- `scripts` 字段可以使用一些内部变量，主要是 `package.json` 的各种字段。内部变量的主要特征是 `$npm_package_key`。

  ```js
  {
    "version": "1.2.5",
    "scripts":{
      "bundle": "mkdir -p build/$npm_package_version/"
    }
  }
  
  /**
  	key											value
  	npm_package_version     '1.2.5'
  	npm_pacjage_scripts			{
  														'bundle':'mkdir -p build/$npm_package_version/'
  													}
  */
  ```

- 运行 `npm run bundle` 以后，将会生成 `build/1.2.5/` 子目录。

- `config` 字段也可以用于设置内部字段。

  ```js
  "name": "fooproject",
    "config": {
      "port": "3001"
    },
    "scripts": {
      "serve": "http.createServer(...).listen(process.env.$npm_package_config_port)"
    }
  
  // 变量 npm_package_config_port 对应的就是 3001。
  ```

#### `通配规则`

- `*` 匹配 0 个或多个字符
- `?` 匹配 1 个字符
- `[...]` 匹配某个范围的字符。如果该范围的第一个字符是 `!` 或 `^` ，则匹配不在该范围的字符。
- `!(pattern|pattern|pattern)` 匹配任何不符合给定的模式
- `?(pattern|pattern|pattern)` 匹配 0 个或 1 个给定的模式
- `+(pattern|pattern|pattern)` 匹配 1 个或多个给定的模式
- `*(a|b|c)` 匹配 0 个或多个给定的模式
- `@(pattern|pat*|pat?erN)` 只匹配给定模式之一
- `**` 如果出现在路径部分，表示0个或多个子目录。

