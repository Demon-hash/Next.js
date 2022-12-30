describe("footer", () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("renders links", () => {
        cy.get("footer").find("a").should('exist')
    })
})