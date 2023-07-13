import { gql } from '@apollo/client';

export const getUser = gql`
query getUser($id: ID!) {
  user(id: $id) {
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
          hostId
          game
          gameType
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
          hostId
          game
          gameType
          lat
          lon
        }  	
    }
  }`;

export const getAllUsers = gql `
{
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
}
`;

export const getEvent = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
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
`;

export const getAllEvents = gql`
  query getAllEvents($id: ID!) {
    user(id: $id) {
      sortedEvents {
        id
        date
        address
        city
        state
        zip
        title
        cancelled
        description
        host {
          id
          username
        }
        game
        gameType
        attendees {
          id
          username
        }
        playerCount
      }
    }
  }
`;


export const getUserGames = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      ownedGames {
        id
        name
        minPlayers
        maxPlayers
        minPlaytime
        maxPlaytime
        description
        imageUrl
        averageUserRating
        averageStrategyComplexity
      }
    }
  }
`;

export const getUserProfile = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
      city
      state
      attendingEvents {
        id
      }
      hostedEvents {
        id
      }
      ownedGames {
        id
        name
        minPlayers
        maxPlayers
        minPlaytime
        maxPlaytime
        description
        imageUrl
        averageUserRating
        averageStrategyComplexity
      }
    }
  }
`;export const createEvent = gql`
  mutation createEvent($input: EventInput!) {
    createEvent(input: $input) {
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
`;

// export const createEvent = (event) => gql`
//   mutation createEvent($input: EventInput!) {
//     createEvent(input: $input) {
//       event {
//         id
//         date
//         address
//         state
//         city
//         zip
//         title
//         cancelled
//         description
//         hostId
//         game
//         gameType
//         playerCount
//         attendees {
//           id
//           username
//         }
//       }
//     }
//   }
// `;

export const addUserToEvent = gql`
  mutation createUserEvent($input: CreateUserEventInput!) {
    createUserEvent(input: $input) {
      userEvent {
        id
        userId
        eventId
      }
    }
  }
`;

export const removeUserFromEvent = gql`
  mutation destroyUserEvent($input: DestroyUserEventInput!) {
    removeUserFromEvent(input: $input) {
      userEvent {
        userId
        eventId
      }
    }
  }
`;

// export const removeUserFromEvent = gql`
//   mutation removeUserFromEvent($userId: ID!, $eventId: ID!) {
//     removeUserFromEvent(userId: $userId, eventId: $eventId) {
//       event {
//         id
//         date
//         address
//         state
//         city
//         zip
//         title
//         cancelled
//         description
//         hostId
//         game
//         gameType
//         playerCount
//         attendees {
//           id
//           username
//         }
//       }
//     }
//   }
// `;

export const cancelEvent = gql`
  mutation cancelEvent($eventId: ID!) {
    cancelEvent(id: $eventId, attributes: { cancelled: true }) {
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
        hostId
        game
        gameType
        lat
        lon
        attendees
        playerCount
      }
    }
  }
`;