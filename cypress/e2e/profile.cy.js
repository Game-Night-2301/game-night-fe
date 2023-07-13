beforeEach(() => {
  cy.fixture('getUserById.json').then((getUser) => {
    cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
      if (req.body.operationName === 'getUser') {
        req.reply({ data: getUser });
      }
    }).as('getUserById');
  });

  cy.fixture('getUserGames.json').then((getUserGames) => {
    cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
      if (req.body.operationName === 'getUser') {
        req.reply({ data: getUserGames });
      }
    }).as('getUserGames');
  });

  cy.visit('https://game-night-fe.vercel.app/profile');
});

// it('should navigate to profile page', () => {
//   cy.get('button').contains('User 1').click();
//   cy.get('.welcome-button-container');
// });

it('should check the content of the profile page', () => {
  cy.url().should('include', '/profile');
  cy.get('h5').contains('Personal Info').should('exist');
  cy.get('.profile-text').within(() => {
    cy.contains('.profile-text-key', 'Name').next('.profile-text-value').should('have.text', 'John Doe');
    cy.contains('.profile-text-key', 'Games Hosted').next('.profile-text-value').should('have.text', '5');
    cy.contains('.profile-text-key', 'Location').next('.profile-text-value').should('have.text', 'City, State');
  });
  cy.get('h5').contains('Game Collection').should('exist');
  // cy.get('.games-grid').within(() => {
  //   cy.get('.user-game').should('have.length', 2);
  //   cy.contains('.user-game', 'Game A');
  //   cy.contains('.user-game', 'Game B');
  // });
});

