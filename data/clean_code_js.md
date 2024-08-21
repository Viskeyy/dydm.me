---
title: 'Clean-code JavasCript'
date: 2024-08-12
tags: ['javascript']
type: 'DefaultPost'
---

## Clean-code JavasCript

### 变量

* 使用有意义且可读的变量名

    ```javascript
    const currentDate = moment().format('YYYY/MM/DD');
    ```

* 为相同类型的变量使用相同的词汇

    ```javascript
    getUser();
    ```

* 使用可搜索的名称

    ```javascript
    const MILLISECONDS_IN_A_DAY = 86400000;
    setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
    ```

* 使用解释性的变量

    ```javascript
    const address = 'One Infinite Loop, Cupertino 95014';
    const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
    const [, city, zipCode] = address.match(cityZipCodeRegex) || [];
    saveCityZipCode(city, zipCode);
    ```

* 避免心理映射, 显示比隐式更好

    ```javascript
    const locations = ['Austin', 'New York', 'San Francisco'];
    locations.forEach((location) => {
      doStuff();
      doSomeOtherStuff();
      // ...
      // ...
      // ...
      dispatch(location);
    });
    ```

* 不要添加不必要的上下文

    ```javascript
    const Car = {
    make: 'Honda',
    model: 'Accord',
    color: 'Blue'
    };

    function paintCar(car) {
    car.color = 'Red';
    }
    ```

* 使用默认变量代替短路运算或条件

    ```javascript
    function createMicrobrewery(name = 'Hipster Brew Co.') {
    // ...
    }
    ```

### 函数

* 函数参数两个以下最理想

    ```javascript
    const menuConfig = {
    title: null,
    body: 'Bar',
    buttonText: null,
    cancellable: true
    };

    function createMenu(config) {
        // ...
    }
    ```

* 函数应当只做一件事

    ```javascript
    function emailClients(clients) {
        clients.filter(isClientActive).forEach(email);
    }

    function isClientActive(client) {
        const clientRecord = database.lookup(client);
        return clientRecord.isActive();
    }
    ```

* 函数名应该说明它要做什么

    ```javascript
    function addMonthToDate(month, date) {
    // ...
    }

    const date = new Date();
    addMonthToDate(1, date);
    ```

* 函数应该只有一个抽象级别

    ```javascript
    function tokenize(code) {
        const REGEXES = [
            // ...
        ];

        const statements = code.split(' ');
        const tokens = [];
        REGEXES.forEach((REGEX) => {
            statements.forEach((statement) => {
                // ...
            });
        });

        return tokens;
    }

    function lexer(tokens) {
        const ast = [];
        tokens.forEach((token) => {
            // ...
        });

        return ast;
    }

    function parserBetterJSAlternative(code) {
        const tokens = tokenize(code);
        const ast = lexer(tokens);
        ast.forEach((node) => {
            // parse...
        });
    }
    ```

* 移除冗余代码

    ```javascript
    function showList(employees) {
        employees.forEach((employee) => {
            const expectedSalary = employee.calculateExpectedSalary();
            const experience = employee.getExperience();

            let portfolio = employee.getGithubLink();

            if (employee.type === 'manager') {
                portfolio = employee.getMBAProjects();
            }

            const data = {
                expectedSalary,
                experience,
                portfolio
            };

            render(data);
        });
    }
    ```

* 使用 Object.assign 设置默认对象

    ```javascript
    const menuConfig = {
        title: 'Order',
        buttonText: 'Send',
        cancellable: true
    }

    function createMenu(config) {
        config = Object.assign({
            title: 'Foo',
            body: 'Bar',
            buttonText: 'Baz',
            cancellable: true
        }, config);
    }
    ```

* 不要使用标记位作为函数参数

    ```javascript
    function createFile(name) {
        fs.create(name);
    }

    function createTempFile(name) {
        createFile(`./temp/${name}`);
    }
    ```

* 避免副作用

    ```javascript
    function splitIntoFirstAndLastName(name) {
        return name.split(' ');
    }

    const name = 'Kevin Durant';
    const newName = splitIntoFirstAndLastName(name);

    console.log(name); // 'Kevin Durant'
    console.log(newName); // ['Kevin', 'Durant']
    ```

* 不要写全局函数

* 函数式编程优于指令式编程

    ```javascript
    const programmerOutput = [
        {
            name: 'Uncle Bobby',
            linesOfCode: 500
        }, {
            name: 'Suzie Q',
            linesOfCode: 1500
        }, {
            name: 'Jimmy Gosling',
            linesOfCode: 150
        }, {
            name: 'Gracie Hopper',
            linesOfCode: 1000
        }
    ];

    const totalOutput = programmerOutput.map((programmer) => programmer.linesOfCode).reduce((acc, linesOfCode) => acc + linesOfCode, 0);
    ```

* 封装条件语句

    ```javascript
    function shouldShowSpinner(fsm, listNode) {
        return fsm.state === 'fetching' && isEmpty(listNode);
    }

    if(shouldShowSpinner(fsmInstance, listNodeInstance)){
        // ...
    }
    ```

* 避免负面条件

    ```javascript
    function isDOMNodeNotPresent(node) {
        // ...
    }

    if (isDOMNodeNotPresent(node)) {
        // ...
    }
    ```

* 避免条件语句

    ```javascript
    class Airplane {
        // ...
    }

    class Boeing777 extends Airplane {
        // ...
        getCruisingAltitude() {
            return this.getMaxAltitude() - this.getPassengerCount();
        }
    }

    class AirForceOne extends Airplane {
        // ...
        getCruisingAltitude() {
            return this.getMaxAltitude();
        }
    }

    class Cessna extends Airplane {
        // ...
        getCruisingAltitude() {
            return this.getMaxAltitude() - this.getFuelExpenditure();
        }
    }
    ```

* 避免类型检查 (part 1)

    ```javascript
    function travelToTexas(vehicle) {
        vehicle.move(this.currentLocation, new Location('texas'));
    }
    ```

* 避免类型检查 (part 2)

    ```javascript
    function combine(val1, val2) {
        return val1 + val2;
    }
    ```

* 不要过度优化

    ```javascript
    for (let i = 0; i < list.length; i++){
        // ...
    }
    ```

* 移除僵尸代码

### 对象和数据结构

* 使用 `getters` 和 `setters`
* 让对象具有私有属性

### 类

* ES2015/ES6 类优先于 ES5 纯函数
* 使用方法链
* 组合优于继承

### SOLID

* 单一职责原则 (SRP): 一个类只做一件事.
* 开放封闭原则 (OCP): 为扩展开放, 对修改关闭.
* 里氏替换原则 (LSP): 如果有一个基类和子类, 那么基类和子类可以互换.
* 接口隔离原则 (ISP): 使用多个专门的接口, 而不是一个总接口.
* 依赖反转原则 (DIP): 高层模块不应该依赖底层模块, 二者都应该依赖抽象; 抽象不应该依赖具体实现, 具体实现应该依赖抽象.

### 并发

* 使用 Promise 代替回调函数
* Async/Await 优于 Promise

### 错误处理

* 不要忽略捕捉到的错误
* 不要忽略被拒绝的 promise

### 格式化

* 使用一致的大小写
* 函数的调用方与被调用方应该靠近

### 注释

* 仅仅对包含复杂业务逻辑的东西进行注释
* 不要在代码库中保存注释掉的代码
* 不要有日志式的注释
* 避免占位符
