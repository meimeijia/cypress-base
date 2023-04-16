describe('iframe', () => {
  it('iframe', () => {
    cy.visit('https://youxuan-test.inner.youdao.com/login')

    // 登录
    cy.iframe('iframe').find('input[name="email"]').click().type('yodao_kevin')
    cy.iframe('iframe').find('input[name="password"]').click().type('YouDao68')
    cy.iframe('iframe').find('#dologin').click()
    cy.contains('我是广告主').click()
  })
})
