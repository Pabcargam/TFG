describe('Failed login', () => {

    it('User access the Home page, and then tries to Login with wrong credentials', () => {
        // Access to the Home page.
        cy.visit('localhost:3000');

        // Access Log In page.
        cy.visit('localhost:3000/login');

        // Tries to Log In. Check error is visible.
        cy.findByRole('textbox').type('pablo.cardenal117@gmail.com');
        cy.findByPlaceholderText(/password\*/i).type('wrongPassword');
        cy.findByRole('button', {  name: /iniciar sesión/i}).click();

        cy.findByText(/email\/contraseña erróneos/i).should('be.visible');

        // Wait.
        cy.wait(2000);
    })
})