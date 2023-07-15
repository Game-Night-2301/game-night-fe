describe('Browse Page', () => {
  beforeEach(() => {
    cy.fixture('getUserById.json').then((getUser) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getUser') {
          req.reply({ data: getUser });
        }
      }).as('getUser');
    });

    cy.fixture('eventById.json').then((getEvent) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getEvent') {
          req.reply({ data: getEvent });
        }
      }).as('getEvent');
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
    cy.visit('https://game-night-fe.vercel.app');
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.wait('@getAllEvents');
  });

  it('should display a header indicating open events', () => {
    cy.get('.browser-header-title')
      .should('have.text', 'Open Games')
      .should('have.class', 'browser-header-title');
  });

  it('should display an event browser with cards representing each open event', () => {
    cy.get('.browse-event-container')
      .should('be.visible')
      .within(() => {
        cy.get('.card-link-wrapper').should('have.length', 3);
        cy.get('.card-link-wrapper').first()
          .within(() => {
            cy.get('.event-card-title').should('have.text', 'Wingspan');
            cy.get('.event-card-subtitle').should('have.text', 'South Burlington, Vermont (5403)10/21/2023');
            cy.get('.event-card-description').should('have.text', 'Ha ha, you fool! You fell victim to one of the classic blunders! The most famous of which is never get involved in a land war in Asia, but only slightly less well-known is this: Never go in against a Sicilian when DEATH is on the line.');
            cy.url().should('include', '/browse');
          });
      });
  });

  it('should redirect the user to the event details page when the user clicks an event', () => {
    cy.get('.card-link-wrapper').first().click();
    cy.url().should('include', '/events/7');
  });

  it('should take the user to the profile page when the user clicks the profile icon', () => {
    cy.get('.profile-link').click();
    cy.get(':nth-child(2) > .menu-link').click();
    cy.url().should('include', '/profile');
  });
});
