import { exampleLoginUrl } from '@api/example'
describe('fixture', () => {
  it('use fixture', () => {
    // 拦截请求，使用fixture中的mock数据
    cy.intercept(exampleLoginUrl, {
      fixture: 'exampleJsonData.json'
    }).as('getJsonData')

    // 点击查询按钮 发送请求
    cy.login('admin@163.com', '12345a')

    // 验证页面数据是否是exampleJsonData.json中的数据
    cy.wait('@getJsonData').then((interception) => {
      expect(interception.response.body.data.email).to.be.eq('auto-test@email')
    })
  })
})
