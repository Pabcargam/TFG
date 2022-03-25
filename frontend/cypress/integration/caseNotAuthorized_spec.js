describe('Not authorized 401', () => {

    it('User access the Home page, and then tries to access Analytics page without Loging In', () => {
        // Access to the Home page.
        cy.visit('localhost:3000');

        // Tries to access Analytics URL.
        cy.visit('localhost:3000/analytics');

        // Gets 401 Error with an indicative text and image. Check exist and is visible.
        cy.findByRole('button', {  name: /iniciar sesión/i}).should('exist');
        cy.findByRole('button', {  name: /iniciar sesión/i}).should('be.visible');

        cy.findByText(/antes de poder visualizar las analíticas debera iniciar sesión pulsando el siguiente botón\./i).should('exist');
        cy.findByText(/antes de poder visualizar las analíticas debera iniciar sesión pulsando el siguiente botón\./i).should('be.visible');

        cy.findByRole('heading', { name: /algo no funcionó correctamente!/i }).should('exist');
        cy.findByRole('heading', { name: /algo no funcionó correctamente!/i }).should('be.visible');

        cy.findByRole('heading', {  name: /401 \- no autorizado/i}).should('exist');
        cy.findByRole('heading', {  name: /401 \- no autorizado/i}).should('be.visible');

        // Wait.
        cy.wait(2000);
    })
})
