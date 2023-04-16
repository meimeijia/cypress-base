import { admin } from '@constants/user'
const image = 'image/ads.jpg'

describe('download', () => {
  it('upload', () => {
    // 拦截上传成功请求
    cy.intercept({
      url: '**/api/uploadFinanceFile',
      method: 'POST'
    }).as('upload')
    cy.login(admin.email, admin.password)
    cy.visit('https://overseas-kol.inner.youdao.com/finance/creditLine')
    cy.get('[role="dialog"]').within(() => {
      //上传文件 attachFile
      cy.get('#attachmentIds').attachFile(image)

      cy.wait('@upload').then((res) => {
        // 判断上传是否成功
        expect(res.response.body.message).to.be.eq('Upload successfully!!!')
      })
    })
  })

  it('下载文件成功', () => {
    cy.intercept('GET', '/download').as('download')
    cy.get('#download-btn').click()
    cy.wait('@download').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      const fileName = 'example.pdf'
      cy.readFile('downloads/' + fileName).should('exist')
    })
  })
})
