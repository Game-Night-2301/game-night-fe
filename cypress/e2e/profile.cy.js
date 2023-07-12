describe('ProfilePage', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'ProfilePageQuery') {
        req.reply({ fixture: 'allUsers.json' });
      }
    });
    cy.visit('https://game-night-fe.vercel.app/');
    
    
  })

    it('should navigate to the profile page and check the content', () => {

      // cy.get('.button')
      //   .contains('User 1').click();

      // cy.url().should('include', '/browse');

      // cy.get('img.profile-link').click();

      cy.url().should('include', '/profile');

      cy.contains('h2', 'Personal Info');
      cy.contains('p', 'Name: John Doe');
      cy.contains('p', 'Games Hosted: 5');
      cy.contains('p', 'Location: City, State');
      cy.contains('h2', 'Game Collection');
      cy.get('.game-circle').should('have.length', 3);
    });
  })