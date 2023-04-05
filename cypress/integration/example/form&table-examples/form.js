describe(() => {
  // 表单提交
  it('.submit() - submit a form', () => {
    // https://on.cypress.io/submit
    cy.get('.action-form').find('[type="text"]').type('HALFOFF')

    cy.get('.action-form').submit().next().should('contain', 'Your form has been submitted!')
  })

  // 勾选单选框或多选框
  it('.check() - check a checkbox or radio element', () => {
    // https://on.cypress.io/check

    // By default, .check() will check all
    // matching checkbox or radio elements in succession, one after another
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check().should('be.checked')

    cy.get('.action-radios [type="radio"]').not('[disabled]').check().should('be.checked')

    // .check() accepts a value argument
    cy.get('.action-radios [type="radio"]').check('radio1').should('be.checked')

    // .check() accepts an array of values
    cy.get('.action-multiple-checkboxes [type="checkbox"]').check(['checkbox1', 'checkbox2']).should('be.checked')

    // Ignore error checking prior to checking
    cy.get('.action-checkboxes [disabled]').check({ force: true }).should('be.checked')

    cy.get('.action-radios [type="radio"]').check('radio3', { force: true }).should('be.checked')
  })

  //  取消勾选单选框或多选框
  it('.uncheck() - uncheck a checkbox element', () => {
    // https://on.cypress.io/uncheck

    // By default, .uncheck() will uncheck all matching
    // checkbox elements in succession, one after another
    cy.get('.action-check [type="checkbox"]').not('[disabled]').uncheck().should('not.be.checked')

    // .uncheck() accepts a value argument
    cy.get('.action-check [type="checkbox"]').check('checkbox1').uncheck('checkbox1').should('not.be.checked')

    // .uncheck() accepts an array of values
    cy.get('.action-check [type="checkbox"]')
      .check(['checkbox1', 'checkbox3'])
      .uncheck(['checkbox1', 'checkbox3'])
      .should('not.be.checked')

    // Ignore error checking prior to unchecking
    cy.get('.action-check [disabled]').uncheck({ force: true }).should('not.be.checked')
  })

  // 下拉选项处理
  it('.select() - select an option in a <select> element', () => {
    // https://on.cypress.io/select

    // at first, no option should be selected
    cy.get('.action-select').should('have.value', '--Select a fruit--')

    // Select option(s) with matching text content
    cy.get('.action-select').select('apples')
    // confirm the apples were selected
    // note that each value starts with "fr-" in our HTML
    cy.get('.action-select').should('have.value', 'fr-apples')

    cy.get('.action-select-multiple')
      .select(['apples', 'oranges', 'bananas'])
      // when getting multiple values, invoke "val" method first
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    // Select option(s) with matching value
    cy.get('.action-select')
      .select('fr-bananas')
      // can attach an assertion right away to the element
      .should('have.value', 'fr-bananas')

    cy.get('.action-select-multiple')
      .select(['fr-apples', 'fr-oranges', 'fr-bananas'])
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    // assert the selected values include oranges
    cy.get('.action-select-multiple').invoke('val').should('include', 'fr-oranges')
  })
})
