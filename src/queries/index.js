export const getUser = (userId) => ({
  query: `{
      user(id: ${userId}) {
        id
        username
        password
        city
        state
        lat
        lon
        attendingEvents {
          id
          date
          address
          city
          state
          zip
          title
          cancelled
          description
          host_id
          game
          game_type
          lat
          lon
        }
        hostedEvents {
          id
          date
          address
          city
          state
          zip
          title
          cancelled
          description
          host_id
          game
          game_type
          lat
          lon
        }  	
    }
  }`
});

export const getAllUsers = () => ({
  query: `{
    users {
        id
        username
    	password
        city
      	state
    	lat
    	lon
    	attendingEvents {
          id
        }
    	hostedEvents {
          id
        }  	
    }
 }`
});

export const getEvent = (eventId) => ({
  query: `{
    event(id: ${eventId}) {
      id
      date
      address
      state
      city
      zip
      title
      cancelled
      description
      hostId
      game
      gameType
      playerCount
      attendees {
        id
        username
      }
    }
  }`
});

export const getAllEvents = () => ({
  query: `{
    events {
      id
      date
      address
      state
      city
      zip
      title
      cancelled
      description
      hostId
      game
      gameType
      playerCount
      attendees {
        id
        username
      }
    }
  }`
});

export const createEvent = (event) => ({
  query:  `
    mutation {
      createEvent(input: {
        date: "${event.date}",
        address: "${event.address}",
        state: "${event.state}",
        city: "${event.city}",
        zip: ${event.zip},
        title: "${event.title}",
        description: "${event.description}",
        host: ${event.host},
        game: ${event.game},
        gameType: "${event.gameType}",
      }) {
        event {
            id
            date
            address
            state
            city
            zip
            title
            cancelled
            description
            hostId
            game
            gameType
            playerCount
            attendees {
                id
                username
            }
        }
      }
  }
  `
});

export const addUserToEvent = (userId, eventId) => ({
  query: `
    mutation {
      createUserEvent {
          userId: ${userId}
          gameId: ${eventId}
      }
    }`
});

export const removeUserFromEvent = (userId, eventId) => ({
  query: `
    mutation {
      destroyUserEvent(attributes: {
          userId: ${userId}
          eventId: ${eventId}
      })
      event {
          id
          date
          address
          state
          city
          zip
          title
          cancelled
          description
          hostId
          game
          gameType
          playerCount
          attendees {
          id
          username
          }
      }
  }
  `
});

export const cancelEvent = (eventId) => ({
  query: `
  mutation {
    cancelEvent(id: ${eventId}, attributes: {
        cancelled: true
        }) {
            event {
                id
                date
                address
                city
                state
                zip
                title
                cancelled
                description
                host_id
                game
                gameType
                lat
                lon
                attendees
                player_count
            }
        }
  }
  `
});