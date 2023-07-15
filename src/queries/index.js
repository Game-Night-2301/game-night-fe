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
        ownedGames {
          id
          name
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
      lat
      lon
      startTime
      endTime
      title
      cancelled
      description
      hostId
      game
      gameType
      playerCount
      gameDetails {
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
      host {
        id
        username
      }
      attendees {
        id
        username
      }

    }
  }
`;

export const fullQuery = gql`
query getEvent($id: ID!) {
    event(id: $id) {
      full
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
        hostId
        game
        gameType
        gameDetails {
          name
          maxPlayers
        }
        attendees {
          id
          username
        }
        playerCount
        distanceFrom
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
`;

export const createEventMutation = gql`
mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    event {
      id
    }
    errors
  }
}
`;

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
  mutation deleteUserEvent($input: DeleteUserEventInput!) {
    deleteUserEvent(input: $input) {
      event {
        attendees{
          id
          username
        }
      }
    }
  }
`;

export const cancelEvent = gql`
  mutation cancelEvent($input: CancelEventInput!) {
    cancelEvent(input: $input) {
      event {
        hostId
        id
        cancelled
      }
    }
  }
`;

export const getUserRecommendations = gql`
query getUser($id: ID!) {
	user(id: $id) {
    recommendedGames {
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