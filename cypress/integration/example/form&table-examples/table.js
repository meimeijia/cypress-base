describe('My Test Suite', () => {
  it('获取表格', () => {
    cy.get('table') // 直接根据标签获取

    cy.get('table').eq(1) // 获取当前页面中第二个table （index从0开始）

    cy.get('table').find('tr') // 获取table中的所有tr

    cy.get('table').find('tr').eq(2) // 获取table中的第三个tr

    cy.get('table').find('tr').eq(2).find('td').eq(1).should('have.text', '25') // 获取table中的第三个tr的第二个td的文本内容

    cy.get('table').find('tr').should('have.length', 5) // 获取table中的tr的数量

    cy.get('table')
      .find('tr')
      .each(($tr) => {
        const name = $tr.find('td').eq(0).text()
        const age = $tr.find('td').eq(1).text()

        // do something with name and age
        // for example, assert that the age is a number
        expect(parseInt(age)).to.be.a('number')
      }) // 遍历table中的tr

    cy.get('table') // 操作表格的buttton
      .find('tr')
      .eq(2)
      .find('td')
      .eq(1)
      .within(() => {
        cy.get("button:contains('登录')").click()
      })
  })
})
