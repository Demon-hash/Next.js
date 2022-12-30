describe('Language switcher', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    /*it('exists in the laptop / desktop version', () => {
        cy.viewport(1024, 768)
        cy.get("#language-switcher-list").should('exist')
    })

    it('doesnt exists in the mobile version', () => {
        cy.viewport(550, 750)
        cy.get("#language-switcher-list").should('not.exist')
    })*/

    it('redirects on value change', () => {
        cy.get("#language-switcher-list").click()
        cy.get("li[data-value='ru']").click()
        cy.url().should('be.equal', `${Cypress.config("baseUrl")}/ru`)
    })
})