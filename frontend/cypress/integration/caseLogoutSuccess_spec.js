describe('Logout success', () => {

    it('User access the Home page, and then Login with correct credentials, checks the state Authenticated and at the end it Logs Out and checks it once again', () => {
        // Access to the Home page.
        cy.visit('localhost:3000');

        // Access Log In page.
        cy.visit('localhost:3000/login');

        // Log In. Check successful Login is visible.
        cy.findByRole('textbox').type('pablo.cardenal117@gmail.com');
        cy.findByPlaceholderText(/password\*/i).type('SoyBuenaPassword099');
        cy.findByRole('button', {  name: /iniciar sesión/i}).click();

        cy.findByText(/inicio de sesión exitoso/i).should('be.visible');

        cy.findByRole('link', {  name: /cerrar sesión/i}).should('exist');

        // Check Logout button exist and click it.
        cy.findByRole('link', {  name: /cerrar sesión/i}).click();

        // Check state.
        cy.findByText(/cierre de sesión exitoso/i).should('exist');
        cy.findByText(/cierre de sesión exitoso/i).should('be.visible');

        cy.findByRole('button', {  name: /iniciar sesión/i}).should('exist');
        cy.findByRole('button', {  name: /iniciar sesión/i}).should('be.visible');

        // Wait.
        cy.wait(2000);
    })
})