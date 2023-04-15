import { exampleLoginUrl } from '@api/example'
import examplePage from '@page/example'
const page = new examplePage()
// 封装Promise函数;
const getUserIdByPromise = () => {
  return new Cypress.Promise((resolve) => {
    cy.visit('/login')

    // 登录
    page.login('admin@163.com', '12345a')

    // 拦截登陆接口
    cy.intercept(exampleLoginUrl).as('response')

    // 获取登陆接口返回的userId
    cy.wait('@response').then((interception) => {
      const userId = interception.response.body.data.userId
      resolve(userId)
    })
  })
}

describe('My test suite', () => {
  it(' 使用.then完成异步操作', () => {
    cy.wrap(getUserIdByPromise()).then((userId) => {
      cy.visit('/login')
      cy.wrap(userId).should('eq', 100634)
    })
  })
})
