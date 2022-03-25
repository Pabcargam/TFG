describe('Page not found 404', () => {

    it('User access the Home page, and then tries to access an incorrect URL', () => {
        // Access to the Home page.
        cy.visit('localhost:3000');

        // Tries to access non existing URL.
        cy.visit('localhost:3000/incorrectURL');

        // Gets 404 Error with an indicative text and image. Check exist and is visible.
        cy.findByRole('heading', { name: /oops!/i }).should('exist');
        cy.findByRole('heading', { name: /oops!/i }).should('be.visible');

        cy.findByRole('heading', { name: /404 \- página no encontrada/i }).should('exist');
        cy.findByRole('heading', { name: /404 \- página no encontrada/i }).should('be.visible');

        cy.findByRole('button', { name: /ir a home/i }).should('exist');
        cy.findByRole('button', { name: /ir a home/i }).should('be.visible');

        // Wait.
        cy.wait(2000);
    })
})