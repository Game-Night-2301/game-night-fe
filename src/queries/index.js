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
{
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
}
`;

export const createEvent = (event) => gql`
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

export const addUserToEvent = gql`
  mutation createUserEvent($userId: ID!, $eventId: ID!) {
    createUserEvent(userId: $userId, eventId: $eventId)
  }
`;

export const removeUserFromEvent = gql`
  mutation removeUserFromEvent($userId: ID!, $eventId: ID!) {
    removeUserFromEvent(userId: $userId, eventId: $eventId) {
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