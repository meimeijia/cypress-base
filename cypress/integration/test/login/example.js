import examplePage from '@page/example'
import { admin } from '@constants/data'

describe('example test', () => {
  // 初始化examplePage页面
  const page = new examplePage()

  it('success test', () => {
    cy.visit('/' + '/login')
    // 使用元素
    page.usernameInput.type(admin.email).clear()

    // 使用方法
    page.login(admin.email, admin.password)

    // 检查是否成功登录
    cy.contains('工作台')
  })

  it('fail test', () => {
    cy.visit('/' + '/login')
    // 使用元素
    page.usernameInput.type(admin.email).clear()

    // 使用方法
    page.login(admin.email, admin.password)

    // 检查是否成功登录
    cy.contains('welocome')
  })
})
