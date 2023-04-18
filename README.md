# cypress-base

项目基于 `cypress`(https://docs.cypress.io/guides/overview/why-cypress) 进行构建,一键初始化基于cypress的e2e测试框架，开箱即用

## 📁 Directory

```
——————
  | -- cypress
      | -- common
          | -- api          // 接口统一管理
          | -- constants    // 常量存储文件
          | -- page         // 页面类
          | -- utils        // 工具类
      | -- fixtures         // 测试夹具,用来存储外部静态数据
      | -- integration      // 测试文件，用来按模块存放测试用例文件
      | -- plugins          // 插件文件，用来修改扩展Cypress内部行为
      | -- support          // 支持文件，用于存放底层通用函数或全局配置
  | -- .gitignore
  | -- cypress.json         // cypress主配置文件
  | -- package.json
  | -- webpack.config.js      
  | -- ...                  // 其他文件
```

## 🔨 开发

### 开发环境部署

```bash
# 克隆项目
git clone 

# 进入项目目录
cd cypress-base

# 安装依赖
npm install

# 运行项目
# 
npm run cypress:test

# 无头浏览器模式
npm run cypress:run

其他运行方式可在package.json中配置

```


### 开发建议

#### 1. 开发工具

本地建议使用 `VS Code` 工具进行开发。
建议VS Code中安装 `Cypress Snippets`插件，可以自动补全it、contains等cypress API语法

#### 2. 开发步骤

- `integration/test` 在编写测试用例时，我们可以一个页面对应一个测试文件，也可以同个功能模块的页面一起对应一个测试文件，并且和平时开发中所采用的代码组织结构类似，将不同的测试文件划分到对应的目录下进行管理，方便后期的维护。
- 路径统一管理, 建议将系统所有的页面路径进行统一封装管理，可在  `cypress/support/commands.js`中封装成公共内置命令，例如:
```
Cypress.Commands.add("visitRegister", () => {
  cy.visit("/register");
})
Cypress.Commands.add("visitLogin", () => {
  cy.visit("/login");
})

case中使用：
cy.visitRegister() // 访问注册页面
cy.visitLogin() // 访问登录页面

```
- 接口统一管理，在编写测试用例的过程中，我们通常需要使用cy.request()去调用后台接口以请求数据或创建测试数据，对于后台接口api，我们也可以放入某个文件中进行统一管理，例如 `cypress/commn/api/example.js`

```
使用：
import { exampleLoginUrl } from "@api/example";

cy.intercept(exampleLoginUrl).as("response")  // 拦截请求
or 
cy.request(exampleLoginUrl) // 发送请求

```

- `common/page` 页面类单独封装 , 建议将每个页面的元素定位、交互流程、方法单独进行封装，涉及该页面的case共享元素，方法等，方便维护,例子: `common/page/example.js`


- `integration/example`,存放各类cypress操作的例子
1. `cypress-basic-operation-examples`: cypress操作页面的各种api语法示例
2. `download-example`: cypress上传下载文件相关示例
3. `form&table-examples`: cypress操作form、table等相关示例
4. `iframe-example`: cypress操作iframe示例
5. `mysql-example`: cypress操作mysql示例
6. `promise-example`: cypress使用异步函数示例
7. `mock-example` : cypress使用mock数据进行验证

```
mock使用步骤
1. fixture文件夹中定义json数据，如fixture/exampleJsonData.json
{
  "error_code":0,
  "error_message":"success",
}
2. case中使用
  //拦截请求
  cy.intercept("/api/data", { fixture: "exampleJsonData.json" }).as("getData")
  // do something send requst
  // 等待请求后验证内容是否是exampleJsonData.json中的内容
  cy.wait("@getData").then((res) => {
    cy.get("#data-list li")
      .first()
      .should("contain", "success")
  })
```


## 🌍 部署

### 准备环境

```
node: >= v14.0.0
npm: 跟随node版本
cypress基础环境

```

### 持续集成之jenkins
cypress-base已配置基础jenkins:
http://ci.corp.youdao.com/jenkins/view/eadPublicView/job/cypress-base/

该自动部署job包含配置junit & mocha 两种测试报告

可复制该job后，自定修改配置内容
### 持续集成之ci

待补充公共方法
## 📓 文档


[官方文档](https://docs.cypress.io/guides/getting-started/installing-cypress)

## 其它

POPO联系：zhaojiaying01@corp.netease.com




