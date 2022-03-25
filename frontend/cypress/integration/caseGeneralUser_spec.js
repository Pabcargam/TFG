describe('General User Case', () => {

    it('User access the Home page, and then Login with correct credentials, later it access at his Analytics and check the different Data', () => {
        // Access to the Home page.
        cy.visit('localhost:3000');

        // Access Log In page.
        cy.visit('localhost:3000/login');

        // Log In. Check successful Login is visible. Check Logout button exist.
        cy.findByRole('textbox').type('pablo.cardenal117@gmail.com');
        cy.findByPlaceholderText(/password\*/i).type('SoyBuenaPassword099');
        cy.findByRole('button', {  name: /iniciar sesión/i}).click();

        cy.findByText(/inicio de sesión exitoso/i).should('be.visible');

        // Check Logout button exist.
        cy.findByRole('link', {  name: /cerrar sesión/i}).should('exist');
        cy.findByRole('link', {  name: /cerrar sesión/i}).should('be.visible');
        
        // Access Analytics page.
        cy.visit('localhost:3000/analytics');

        // Check different Data.
        cy.get('strong[id="innerTemp"]').should('exist');
        cy.get('strong[id="innerTemp"]').should('be.visible');

        cy.get('strong[id="outterTemp"]').should('exist');
        cy.get('strong[id="outterTemp"]').should('be.visible');

        cy.get('strong[id="diffTrigger"]').should('exist');
        cy.get('strong[id="diffTrigger"]').should('be.visible');

        cy.get('strong[id="todayLightPrice"]').should('exist');
        cy.get('strong[id="todayLightPrice"]').should('be.visible');

        cy.get('strong[id="energySaved"]').should('exist');
        cy.get('strong[id="energySaved"]').should('be.visible');

        cy.get('strong[id="expectedPerformance"]').should('exist');
        cy.get('strong[id="expectedPerformance"]').should('be.visible');

        cy.get('strong[id="realPerformance"]').should('exist');
        cy.get('strong[id="realPerformance"]').should('be.visible');

        // Wait.
        cy.wait(2000);
    })
})