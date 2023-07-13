describe('Header Component', () => {
  beforeEach(() => {
    cy.fixture('getUserById.json').then((getUser) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getUser') {
          req.reply({ data: getUser });
        }
      }).as('getUser');
    });

    cy.fixture('allEvents.json').then((getAllEvents) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getAllEvents') {
          req.reply({ data: getAllEvents });
        }
      }).as('getAllEvents');
    });

    cy.fixture('getUserGames.json').then((getUserGames) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getUser') {
          req.reply({ data: getUserGames });
        }
      }).as('getUserGames');
    });
    cy.visit('https://game-night-fe.vercel.app/');
  });

  it('should display the header with dropdown menu and navigate correctly for logout', () => {
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.wait('@getAllEvents').its('response.body').should('have.property', 'data');
    cy.get('.logo').should('be.visible');
    cy.get('.profile-link').should('be.visible');
    cy.get('.profile-link').click();
    cy.get('.menu-link').should('be.visible');
    cy.contains('.menu-link', 'Logout').click();
    cy.url().should('eq', 'https://game-night-fe.vercel.app/'); 
  });

  it('should display the header with dropdown menu and navigate correctly for create event', () => {
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.wait('@getAllEvents').its('response.body').should('have.property', 'data');
    cy.get('.logo').should('be.visible');
    cy.get('.profile-link').should('be.visible');
    cy.get('.profile-link').click();
    cy.get('.menu-link').should('be.visible');
    cy.contains('.menu-link', 'Create Event').click();
    cy.url().should('eq', 'https://game-night-fe.vercel.app/create'); 
  });

  it('should display the header with dropdown menu and navigate correctly for profile', () => {
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.wait('@getAllEvents').its('response.body').should('have.property', 'data');
    cy.get('.logo').should('be.visible');
    cy.get('.profile-link').should('be.visible');
    cy.get('.profile-link').click();
    cy.get('.menu-link').should('be.visible');
    cy.contains('.menu-link', 'Profile').click();
    cy.url().should('eq', 'https://game-night-fe.vercel.app/profile'); 
  });

  it('should display the header navigate to browse event page by logo', () => {
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.wait('@getAllEvents').its('response.body').should('have.property', 'data');
    cy.get('.logo').should('be.visible');
    cy.get('.profile-link').should('be.visible');
    cy.get('.profile-link').click();
    cy.get('.menu-link').should('be.visible');
    cy.contains('.menu-link', 'Profile').click();
    cy.get('.logo').should('be.visible').click();
    cy.url().should('eq', 'https://game-night-fe.vercel.app/browse'); 
  });
});


