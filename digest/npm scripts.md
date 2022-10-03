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

- 在使用 `npm run script-name` 命令时，npm 会设置一个环境变量 npm_lifecycle_event。

- **实际上 npm 还会设置很多环境变量，通过内置命令 `npm run env` 可以查看 npm 为脚本运行时设置的所有环境变量。** 

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

#### `内部变量`

- 在 npm 为脚本运行时所设置的变量中，其中 package.json 中设置的所有字段，都会被设置为 **npm_package_** 开头的环境变量。

- `scripts` 字段可以使用一些内部变量，主要是 `package.json` 的各种字段。内部变量的主要特征是 `$npm_package_key`。

  ```js
  {
    "version": "1.2.5",
    "scripts":{
      "bundle": "mkdir -p build/$npm_package_version/"
    }
  }
  
  /**
  	key																					value
  	npm_package_version     										'1.2.5'
  	npm_pacjage_scripts_bundle									'mkdir -p build/$npm_package_version/'	
  */
  ```

- 运行 `npm run bundle` 以后，将会生成 `build/1.2.5/` 子目录。

- 不止 package.json，npm 相关的所有配置也会有 **npm_config_** 开头的环境变量。

- 需要注意的是，即使在子目录下使用 npm run 命令，脚本也会在项目的根目录下运行。

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

- 如果你想要区分在哪里使用的 npm run 命令，可以使用 INIT_CWD 环境变量，该变量保存了 npm run 命令运行时目录的绝对路径。

- **如何使用这些环境变量？**如果你的脚本是 `shell` 脚本，可以直接通过对应的环境变量名获取变量值，如果是 ` node` 脚本，可以通过 nodejs 中的全局变量 `process.env` 获取，比如获取项目版本号可以使用 `process.env.npm_package_version`。


#### `智能路径 PATH`

- 上面提到了` npm-script` 执行前会设置一些环境变量，其中很重要的一个环境变量是 PATH。npm 会将项目 `node_modules/.bin` 的绝对路径添加到环境变量 PATH 中。因此我们可以在 npm-script 中使用项目本地安装的一些命令行工具。所以 `scripts` 字段里面调用命令时不用加上路径。

- 在 `package.json` 文件内的 `scripts` 字段内指定任务的时候 **一般** 无需指定脚本文件的路径，只需要将脚本放到 `./node_module/.bin/` 目录下即可，命令会在 **这个目录** 下自动寻找对应的脚本文件。而无需使用 `./node_modules/.bin/jshint **.js`

- 同样我们可以指定需要运行的脚本文件位置，例如：

  ```js
  "scripts":{
  	"nodeInit": "node extemple/index.js"
  }
  ```

#### `生命周期脚本/自定义脚本`

- `npm` 内置了两个简写的命令，`npm test` 等同于执行 `npm run test`，`npm start` 等同于执行 `npm run start`。同时可以在 `scripts` 字段下自己定义。
- 当使用命令 `npm start` 时，npm 会尝试执行 package.json `scripts` 中配置的 start 脚本命令。start-script 的默认配置为 `"start": "node server.js"`。所以如果项目根目录下有 server.js 文件，那么通过 `npm start` 会直接运行 server.js 中的代码。

#### `npm 内置命令、自定义脚本执行逻辑`

- 对于内置命令，当使用 `npm start` 以及类似命令时，npm会尝试在 package.json scripts 中查找是否配置了 prestart，poststart脚本命令并顺序执行；
- 同时 npm 会通过 **npm_lifecycle_event** 环境变量标识当前处于哪一阶段（所谓的生命周期）；
  - npm run prestart     npm_lifecycle_event: "prestart"
  - npm run start
  - npm run postsart

- 对于自定义脚本执行命令，`npm run` 为每条命令提供了 `pre-` 和 `post-` 两个钩子（`hook`）。以 `npm run test` 为例，如果我们的 `scripts` 字段规定了 `pretest` 和 `posttest`：

  ```js
  "scripts": {
      "test": "mocha test/",
      "pretest": "echo test started!",
      "posttest": "echo test end!"
  }
  ```

- 则会先执行 `pretest` 任务，再执行 `test` 任务，完成 `test` 任务后即执行 `posttest` 任务。

- 可以简单的将二者理解为：**预执行**、**后执行**

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

#### `任意脚本`

- 我们配置的脚本命令，例如：`"start": "node server.js"`，`node server.js` 会当做一行代码传递给系统的 SHELL 去解释执行。**实际使用的 SHELL 可能会根据系统平台而不同，类 UNIX 系统里，如 macOS 或 linux 中指代的是 /bin/sh， 在 windows 中使用的是 cmd.exe。**
- 既然是交给 SHELL 去解释执行的，说明配置的脚本可以是任意能够在 SHELL 中运行的命令，而不仅仅是 node 脚本或者 js 程序。即如果你的系统里安装了 python（或者说系统变量 PATH 里能找到 python 命令），你也可以将 scripts 配置为 `"myscript": "python xxx.py"`

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

