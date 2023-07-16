describe('Event Detail Page', () => {
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

    cy.fixture('fullQuery.json').then((fullQuery) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'fullQuery') {
          req.reply({ data: fullQuery });
        }
      }).as('fullQuery');
    });

    cy.fixture('getUserGames.json').then((getUserGames) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getUser') {
          req.reply({ data: getUserGames });
        }
      }).as('getUserGames');
    });

    cy.fixture('event.json').then((getEvent) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getEvent') {
          req.reply({ data: getEvent });
        }
      }).as('getEvent');
    });

    cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
      if (req.body.operationName === 'cancelEvent') {
        const cancelledEvent = {
          data: {
            cancelEvent: {
              event: {
                hostId: 1,
                id: 7,
                cancelled: true,
                __typename: 'Event',
              },
              __typename: 'CancelledEventResponse',
            },
          },
        };
        req.reply(cancelledEvent);
      }
    }).as('cancelEvent');

    cy.visit('https://game-night-fe.vercel.app/');
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.get('.browse-event-container').should('be.visible');
  });

  it('should display the event page with the correct elements', () => {
    cy.get('.card').first().click();
    cy.wait('@getEvent').then(() => {
      cy.url().should('include', '/events/7');

      cy.get('.event-title')
        .contains('Wingspan');
      cy.get('.pill')
        .contains('Host');
      cy.get('.event-date')
        .contains('Saturday, October 21st');
      cy.get('.event-time')
        .contains('08:00 - 12:00');
      cy.get('.event-button-holder > .MuiButtonBase-root')
        .contains('Cancel Event');
      cy.get('.description-header')
        .contains('Event Information');
      cy.get('#panel1a-header > .MuiAccordionSummary-content > .MuiTypography-root')
        .contains('Host Message');
      cy.get('#panel1a-content > .MuiAccordionDetails-root')
        .contains('Ha ha, you fool! You fell victim to one of the classic blunders!');
      cy.get('#panel2a-header > .MuiAccordionSummary-content > .MuiTypography-root')
        .contains('Game Description').click();
      cy.get('.scroll-wrapper > .MuiTypography-root')
        .contains('Wingspan is a competitive, medium-weight, card-driven, engine-building board game from Stonemaier Games. You are bird enthusiasts—researchers, bird watchers, ornithologists, and collectors—seeking to discover and attract the best birds to your aviary.');
      cy.get(':nth-child(5) > #panel2a-header > .MuiAccordionSummary-content > .MuiTypography-root')
        .contains('Event Location').click();
      cy.get('.leaflet-container');
      cy.get('.attendee-header')
        .contains('Attendees');
      cy.get('[alt="11"]')
        .trigger('mouseover').get('.MuiTooltip-tooltip').contains('Herugar Bolger').should('be.visible');
    });
  });

  it('should cancel the event when Cancel Event button is clicked', () => {
    cy.get('.card').first().click();
    cy.wait('@getEvent').then(() => {
      cy.contains('Cancel Event').click({ force: true });
    });
  });

  it('should expand the Host Message accordion panel', () => {
    cy.get('.card').first().click();
    cy.wait('@getEvent').then(() => {
      cy.get('#panel1a-header')
        .click();
      cy.get('#panel1a-content')
        .should('be.visible')
        .contains('Ha ha, you fool! You fell victim to one of the classic blunders!');
    });
  });

  it('should expand the Game Description accordion panel', () => {
    cy.get('.card').first().click();
    cy.wait('@getEvent').then(() => {
      cy.get('#panel2a-header')
        .click();
      cy.get('#panel2a-content')
        .should('be.visible')
        .contains('Wingspan is a competitive, medium-weight, card-driven, engine-building board game from Stonemaier Games.');
    });
  });

  it('should display a tooltip with the attendee name on avatar hover', () => {
    cy.get('.card').first().click();
    cy.wait('@getEvent').then(() => {
      cy.get('[alt="11"]')
        .trigger('mouseover');
      cy.get('.MuiTooltip-tooltip')
        .should('be.visible')
        .contains('Herugar Bolger');
    });
  });
});

describe('Event Detail Error Page', () => {
  beforeEach(() => {
    cy.fixture('getUserById.json').then((getUser) => {
      cy.fixture('allEvents.json').then((getAllEvents) => {
        cy.fixture('fullQuery.json').then((fullQuery) => {
          cy.fixture('getUserGames.json').then((getUserGames) => {
            cy.fixture('event.json').then((getEvent) => {
              cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
                if (req.body.operationName === 'getUser') {
                  req.reply({ data: getUser });
                } else if (req.body.operationName === 'getAllEvents') {
                  req.reply({ data: getAllEvents });
                } else if (req.body.operationName === 'fullQuery') {
                  req.reply({ data: fullQuery });
                } else if (req.body.operationName === 'getUser') {
                  req.reply({ data: getUserGames });
                } else if (req.body.operationName === 'getEvent') {
                  req.reply({ data: getEvent });
                }
              }).as('GraphQL');
            });
          });
        });
      });
    });
  });

  it('should display the error page when an error occurs while retrieving event details', () => {
    cy.fixture('sadPath.json').then((sadPath) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getEvent') {
          req.reply({
            statusCode: 500,
            body: { errors: sadPath }
          });
        }
      }).as('sadPath');
    });

    cy.visit('https://game-night-fe.vercel.app');
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.get('.browse-event-container').should('be.visible');

    cy.get('.card').first().click();
    cy.url().should('include', '/error');
    cy.get('.message').should(
      'have.text',
      'Oops! Looks like we rolled a critical error. Time to reshuffle the digital deck!'
    );
  });
  it('should not display any event information', () => {
    cy.contains('Host Message').should('not.exist');
    cy.contains('Game Description').should('not.exist');
    cy.contains('Event Location').should('not.exist');
    cy.contains('Attendees').should('not.exist');
    });
    
});


