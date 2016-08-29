var statuses = {
    DRAFT: 1,
    OPEN: 2,
    SOLD_OUT: 3,
    CLOSED: 4
};

module.exports = [{
  title: 'Event #1',
  startTime: 1478332800000,
  endTime: 1478372400000,
  status: statuses.DRAFT,
  registrationLimit: 1000,
  remainingSeats: 900,
  sessions: [{
      title: 'Session #1',
      startTime: 1478332800000,
      endTime: 1478372400000,
      id: 1
  }, {
      title: 'Session #2',
      startTime: 1478332800000,
      endTime: 1478372400000,
      id: 2
  }, {
      title: 'Session #3',
      startTime: 1478332800000,
      endTime: 1478372400000,
      id: 3
  }],
  registrations: [],
  id: '1f2ld'
}, {
  title: 'Event #2',
  startTime: 1475654400000,
  endTime: 1478368800000,
  status: statuses.OPEN,
  registrationLimit: 1000,
  remainingSeats: 111,
  sessions: [],
  registrations: [],
  id: '2f2ld'
}, {
  title: 'Event #3',
  startTime: 1478332800000,
  endTime: 1478372400000,
  status: statuses.SOLD_OUT,
  registrationLimit: 450,
  remainingSeats: 0,
  sessions: [],
  registrations: [],
  id: '3f2ld'
}, {
  title: 'Event #4',
  startTime: 1162953600000,
  endTime: 1463076000000,
  status: statuses.CLOSED,
  registrationLimit: 230,
  remainingSeats: 100,
  sessions: [],
  registrations: [],
  id: '4f2ld'
}];
