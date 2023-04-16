export default class examplePage {
  // 获取邮箱输入框
  usernameInput() {
    return cy.get('#login_email')
  }
  // 获取密码输入框
  passwordInput() {
    return cy.get('#login_password')
  }

  // 获取登录按钮
  loginButton() {
    return cy.get('button[type="submit"]')
  }

  // 登录方法
  login(email, password) {
    this.usernameInput().clear().type(email)
    this.passwordInput().clear().type(password)
    this.loginButton().click()
  }
}
