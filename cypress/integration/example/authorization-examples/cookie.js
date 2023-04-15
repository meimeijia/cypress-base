describe('cookie', () => {
  before(() => {
    cy.visit('https://youxuan-test.inner.youdao.com/login')

    // 登录
    cy.iframe('iframe').find('input[name="email"]').click().type('yodao_kevin')
    cy.iframe('iframe').find('input[name="password"]').click().type('YouDao68')
    cy.iframe('iframe').find('#dologin').click()
    cy.contains('我是广告主').click()
  })
  beforeEach(() => {
    // 阻止清除cookie，测试用例之间共享cookie
    Cypress.Cookies.preserveOnce('P_INFO', 'D_USER', 'S_INFO', 'NTES_SESS')
  })

  it('共享cookie 1', () => {
    // 无需重新登录
    console.log(cy.getCookie('P_INFO'))
    cy.visit('https://youxuan-test.inner.youdao.com/advertiser/home/accountManage')
    cy.contains('基本信息')
  })

  it('共享cookie 2', () => {
    // 无需重新登录
    cy.visit('https://youxuan-test.inner.youdao.com/advertiser/home/profile')
    cy.contains('开始推广')
  })
})
