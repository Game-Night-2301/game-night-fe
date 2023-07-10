describe('WelcomePage', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'WelcomePageQuery') {
        req.reply({ data: { myData: 'Stubbed data for query 1' } });
      }
    });
    cy.visit('http://localhost:3000/'); 
  });

  it('should display the welcome page with the correct elements', () => {
    cy.get('.welcome-page-container')
      .should('be.visible')
      .within(() => {
        cy.get('.welcome-page-title').should('contain', 'Game Night');
        cy.get('.dice').should('be.visible');
        cy.get('.welcome-page-subtitle').should('contain', 'Define your roll');
        cy.get('.button-container')
          .should('be.visible')
          .within(() => {
            cy.get('button').contains('User 1').should('be.visible');
            cy.get('button').contains('User 2').should('be.visible');
          });
      });
  });

  // it('should login User 1 and switch to logout button', () => {
  //   cy.get('button').contains('User 1').click();
  //   cy.get('.button-container')
  //     .within(() => {
  //       cy.get('button').contains('Log Out').should('be.visible');
  //     });
  // });

  // it('should login User 2 and switch to logout button', () => {
  //   cy.get('button').contains('User 2').click();
  //   cy.get('.button-container')
  //     .within(() => {
  //       cy.get('button').contains('Log Out').should('be.visible');
  //     });
  // });

  // it('should logout User and switch to login buttons', () => {
  //   cy.get('button').contains('User 1').click(); 
  //   cy.get('button').contains('Log Out').click();
  //   cy.get('.button-container')
  //     .within(() => {
  //       cy.get('button').contains('User 1').should('be.visible');
  //       cy.get('button').contains('User 2').should('be.visible');
  //     });
  // });
});
