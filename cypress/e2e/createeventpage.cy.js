describe('Create Event Page', () => {
  beforeEach(() => {
    cy.fixture('getUserById.json').then((getUser) => {
      cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
        if (req.body.operationName === 'getUser') {
          req.reply({ data: getUser });
        }
      }).as('getUser');


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

      cy.fixture('postEvent.json').then((CreateEvent) => {
        cy.intercept('POST', 'https://game-night-backend-172o.onrender.com/graphql', (req) => {
          if (req.body.operationName === 'CreateEvent') {
            req.reply({ data: CreateEvent });
          }
        }).as('CreateEvent');
      });

      cy.visit('https://game-night-fe.vercel.app/');
    });
  });


  it('should display the create event page', () => {
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.wait('@getAllEvents').its('response.body').should('have.property', 'data');
    cy.get('.browse-event-container').should('be.visible');
    cy.get('.profile-link').click();
    cy.get('.menu-link').should('be.visible');
    cy.get('.menu-link').contains('Create Event').should('be.visible');
    cy.contains('Create Event').click({ force: true })
      .then(() => {
        cy.url().should('include', '/create');
      });
  });


  it("Navigates to and checks contents of form", () => {
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.get('.profile-link').click();
    cy.get('.menu-link').should('be.visible');
    cy.get('.menu-link').contains('Create Event').click();

    cy.get("#game")
    cy.get("#category")
    cy.get("#address")
    cy.get("#city")
    cy.get("#state")
    cy.get("#zip")
    cy.get(".event-time-and-date > :nth-child(1) > .MuiInputBase-root")
    cy.get('.event-time-and-date > :nth-child(2) > .MuiInputBase-root')
    cy.get('.event-time-and-date > :nth-child(3) > .MuiInputBase-root')
    cy.get("#outlined-multiline-static")
    cy.get(".MuiButton-root").contains('Submit')
  });

  it('Navigate to and fill out and submit the form', () => {
    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.get('.profile-link').click();
    cy.get('.menu-link').should('be.visible');
    cy.get('.menu-link').contains('Create Event').click();

    cy.get("#game").click()
      .get('.MuiList-root > [tabindex="0"]').click()
    cy.get("#category").click()
      .get('.MuiList-root > [tabindex="0"]').click()
    cy.get('#location').type('Costco')
    cy.get("#address").type("402 S Walnut")
    cy.get("#city").type("Truth or Consequences")
    cy.get("#state").type("New Mexico")
    cy.get("#zip").type("86753")
    cy.get(".event-time-and-date > :nth-child(1) > .MuiInputBase-root").type("12/31/2023")
    cy.get('.event-time-and-date > :nth-child(2) > .MuiInputBase-root').type("12:05 AM")
    cy.get('.event-time-and-date > :nth-child(3) > .MuiInputBase-root').type("12:10 PM")
    cy.get("#outlined-multiline-static").type("The coolest thing you'll ever play in your entire life.")
    cy.get(".MuiButton-root").contains('Submit').click({force: true})
  })

  it('Should not allow a user to submit if the form isn\'t filled out in its entirety and display a tooltip message.', () => {

    cy.get('.welcome-button-container').find('button').contains('User 1').click();
    cy.get('.profile-link').click();
    cy.get('.menu-link').should('be.visible');
    cy.get('.menu-link').contains('Create Event').click();

    cy.get("#address").type("402 S Walnut")
    cy.get("#city").type("Truth or Consequences")
    cy.get("#state").type("New Mexico")
    cy.get("#zip").type("86753")
    cy.get(".event-time-and-date > :nth-child(1) > .MuiInputBase-root").type("12/31/2023")

    cy.get(".MuiButton-root").contains('Submit')
      .should("have.attr", "disabled")

    cy.get(".MuiButton-root").contains('Submit')
      .should('be.disabled')

    cy.get('.button-container')
      .trigger('mouseover')
      .wait(2000)
      .get('.MuiTooltip-tooltip')
      .should('be.visible')
      .contains('Please fill out all fields!')
      .should('be.visible');  
  })  
});

describe('Form Page - Error Handling', () => {
  beforeEach(() => {
    cy.fixture('getUserById.json').then((getUser) => {
      cy.fixture('getUserGames.json').then((getUserGames) => {
        cy.fixture('allEvents.json').then((getAllEvents) => {
          cy.intercept(
            'POST',
            'https://game-night-backend-172o.onrender.com/graphql',
            (req) => {
              if (req.body.operationName === 'getUser') {
                req.reply({ data: getUser });
              } else if (req.body.operationName === 'getUserGames') {
                req.reply({ data: getUserGames });
              } else if (req.body.operationName === 'getAllEvents') {
                req.reply({ data: getAllEvents });
              }
            }
          ).as('GraphQL');
        });
      });
    });
  });

  
  it('should display the error page when an error occurs while navigating to the Create Event page', () => {
    cy.visit('https://game-night-fe.vercel.app/');
    cy.get('button').contains('User 1').click();
    cy.get('img.profile-link').click();
    cy.get('.MuiList-root');
    cy.fixture('sadPath.json').then((sadPath) => {
      cy.intercept(
        'POST',
        'https://game-night-backend-172o.onrender.com/graphql',
        (req) => {
          if (req.body.operationName === 'getUser') {
            req.reply({
              statusCode: 500,
              body: { errors: sadPath },
            });
          }
        }
      ).as('sadPath');
    });
  //   cy.get('.menu-link').contains('Create Event').should('be.visible').click();
  //   cy.get('.message').should(
  //     'have.text',
  //     'Oops! Looks like we rolled a critical error. Time to reshuffle the digital deck!'
  //   );
  //   cy.url().should('include', '/error');
  });
});
