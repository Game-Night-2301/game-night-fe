import dayjs from 'dayjs';

export const cleanEvents = (events) => {
  return events.map(
    ({
      id,
      date,
      address,
      city,
      state,
      zip,
      attendees,
      time,
      cancelled,
      hostId,
      title,
      description,
      gameType,
      game,
      playerCount,
      gameDetails,
      distanceFrom,
      maxPlayers,
    }) => {
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
        maxPlayers: gameDetails.maxPlayers,
        gameName: gameDetails.name,
        gameType: gameType,
        distanceFrom: +distanceFrom.toFixed(1),
        playerCount: playerCount,
        attendees: attendees,
      };
    }
  );
};

export const filterEvents = (events) => {
  return events.filter((event) => {
    return !event.cancelled;
  });
};

export const sortEvents = (events) => {
  return events.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
};

export const detailsDateFormatter = (date) => {
  const dayOfMonth = dayjs(date).format('D');
  let suffix;

  if (dayOfMonth === '1' || dayOfMonth === '21' || dayOfMonth === '31') {
    suffix = 'st';
  } else if (dayOfMonth === '2' || dayOfMonth === '22') {
    suffix = 'nd';
  } else if (dayOfMonth === '3' || dayOfMonth === '23') {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }

  return dayjs(date).format(`dddd, MMMM D`) + suffix;
};

export const capitalizeFirstLetter = (str) => {
  if (typeof str !== 'string') {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const round = (value, significantFigures) => {
  const exponent = Math.floor(Math.log10(value))
  const nIntegers = exponent + 1
  const precision = 10 ** (nIntegers - significantFigures)
  return Math.round(value / precision) * precision
}