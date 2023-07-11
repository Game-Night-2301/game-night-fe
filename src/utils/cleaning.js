import dayjs from 'dayjs';

export const cleanEvents = (events) => {
  return events.map(({id, date, address, city, state, zip, attendees, time, cancelled, hostId, title, description, gameType, game, playerCount }) => {
    return {
      id: id,
      date: dayjs(date).format('MM/DD/YYYY'),
      start: dayjs(time).format('h:mm A'),
      address: address,
      state: state,
      city: city,
      zip: zip,
      title: title,
      cancelled: cancelled,
      description: description,
      hostId: hostId,
      game: game,
      gameType: gameType,
      playerCount: playerCount,
      attendees: attendees
    }
  })
}

export const filterEvents = (events) => {
  return events.filter(event => {
    return event.cancelled === false;
  })
}

export const sortEvents = (events) => {
  return events.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })
}