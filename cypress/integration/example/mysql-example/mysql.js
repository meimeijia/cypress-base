describe('MySql Example', () => {
  it('查询测试数据库', () => {
    cy.task('queryTestDb', 'SELECT * FROM StoredKol limit 1').then((result) => {
      console.log(result[0].id)
    })
  })

  it('查询与发布数据库', () => {
    // 不同mysql需要在cypress/plugins/index.js中配置
    cy.task('queryPreStageDb', 'SELECT * FROM StoredKol limit 1').then((result) => {
      console.log(result[0].id)
    })
  })
})
