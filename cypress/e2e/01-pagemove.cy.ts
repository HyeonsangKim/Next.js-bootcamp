it("페이지 이동 시나리오",()=>{
  cy.visit("http://localhost:3000/33-06-cypress")
  cy.get("button").click()
  cy.get("div").contains("철수야 놀자")
})