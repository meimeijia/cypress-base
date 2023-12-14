describe('Dakka Cypress test', () => {
  it('Test case 0', () => {
    cy.viewport(1600, 511)
    cy.visit('https://overseas-kol.inner.youdao.com/order/online/ff7a3b492bfc4d3abaafee41a94c8fdb', {
      failOnStatusCode: false
    })

    cy.get('button[type="button"]').first().click()
    cy.contains('编辑').click()
    cy.get('input[type="radio"]').first().click()
    cy.get('input[type="search"]').first().click()
    cy.get('.ant-select-item-option-content').first().click()
    cy.get('input[placeholder="请输入调整后的任务金额"]').first().click()
    cy.get('input[placeholder="请输入调整后的任务金额"]').first().type('10')
    cy.get('textarea[placeholder="请输入（选填）"]').first().click()
    cy.get('textarea[placeholder="请输入（选填）"]').first().type('22')
    cy.contains('11.00').should('have.text', '11.00')
    cy.contains('-1.00').should('have.text', '-1.00')
  })
})
