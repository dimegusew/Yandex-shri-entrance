
export default function getRecommendation(date, db, members) {
  let numberOfmembers = members.length;
  let AllRooms = db ? db.rooms : [];
  let AllEvents = db ? db.events : [];

  function getRoomsFilteredByCapacity(rooms, members) {
    let numberOfmembers = members.length;
    let Rooms = rooms.filter(room => room.capacity >= numberOfmembers);
    return Rooms;
  }

  function getUserDistance(members, eventFloor) {
    return numberOfmembers
      ? members
          .map(member => Math.abs(eventFloor - member.homeFloor))
          .reduce((curr, el) => curr + el)
      : 0;
  }

  function getRoomsSortedByMinDistance(rooms, members) {
    return rooms.sort(function(a, b) {
      return (
        getUserDistance(members, a.floor) - getUserDistance(members, b.floor)
      );
    });
  }

  function getEventsFromRooms(events, roomsIds) {
    return AllEvents.filter(event => roomsIds.indexOf(event.room.id) !== -1);
  }

  function convertDate(date) {
    return date.split("T")[0];
  }

  function convertTimeFromDate(date) {
    let timeMinSplit = date.split("T")[1].split(":");
    return parseInt(timeMinSplit[0],10) * 60 + parseInt(timeMinSplit[1],10);
  }

  function checkOverlap(A, B) {
    return (
      (A.start > B.start && A.start < B.end) ||
      (A.end > B.start && A.end < B.end) ||
      (B.start > A.start && B.start < A.end) ||
      (B.end > A.start && B.end < A.end)
    );
  }

  function checkOverlapEvents(events, dateToCheck) {
    return(
      events.filter(event =>
        checkOverlap(
          {
            start: convertTimeFromDate(dateToCheck.start),
            end: convertTimeFromDate(dateToCheck.end)
          },
          {
            start: convertTimeFromDate(event.dateStart),
            end: convertTimeFromDate(event.dateEnd)
          }
        )
      )
    );

    return events.filter(event =>
      checkOverlap(
        {
          start: convertTimeFromDate(dateToCheck.start),
          end: convertTimeFromDate(dateToCheck.end)
        },
        {
          start: convertTimeFromDate(event.dateStart),
          end: convertTimeFromDate(event.dateEnd)
        }
      )
    );
  }

  let RoomsFilterdByCapacity = getRoomsFilteredByCapacity(AllRooms, members);

  let RoomsSortedByMinDistance = getRoomsSortedByMinDistance(
    RoomsFilterdByCapacity,
    members
  );

  let RoomsIdsSortedByMinDistance = RoomsSortedByMinDistance.map(
    room => room.id
  );

  let eventsInRecomededRooms = getEventsFromRooms(
    AllRooms,
    RoomsIdsSortedByMinDistance
  );


  let eventsInRecomededRoomsFilteredByDate = eventsInRecomededRooms.filter(
    event => convertDate(event.dateStart) === convertDate(date.start)
  );

  let overlapedEvents = checkOverlapEvents(
    eventsInRecomededRoomsFilteredByDate,
    date
  );

  let OverlapedEventRoomsID = overlapedEvents.map(el => el.room.id);

  let allRoomsIds = RoomsFilterdByCapacity.map(el => el.id);

  let notOverlapedEvents = allRoomsIds.filter(
    el => OverlapedEventRoomsID.indexOf(el) === -1
  );

  let freeRooms = RoomsSortedByMinDistance.filter(
    room => notOverlapedEvents.indexOf(room.id) !== -1
  );

  let Recomendations = [];

  if (freeRooms.length !== 0) {
    freeRooms.map(room => {
      Recomendations.push({
        date: {
          start: date.start,
          end: date.end
        },
        room: {
          title: room.title,
          floor: room.floor,
          id: room.id
        },
        roomSwap: []
      });
    });
  } else {
    function checkRoomsWitoutOverlap(event, room) {
      let eventsInCurrRoom = eventsInRecomededRoomsFilteredByDate.filter(
        el => el.room.id === room
      );
      let eventsInCurrRoomWithoutCurrEv = eventsInCurrRoom.filter(
        el => el.id !== event.id
      );
      let newEv = { start: event.dateStart, end: event.dateEnd };
      let checkOverlapInRoom = checkOverlapEvents(
        eventsInCurrRoomWithoutCurrEv,
        newEv
      );
      if (checkOverlapInRoom.length === 0) {
        return true;
      } else {
        return false;
      }
    }

    let allMap = [];

    for (let event of eventsInRecomededRoomsFilteredByDate) {
      let freeroomsId = [];
      for (let roomId of allRoomsIds) {
        if (checkRoomsWitoutOverlap(event, roomId)) {
          freeroomsId.push(roomId);
        }
      }
      let eventFreeRoms = { event: event.id, freeroomsIds: freeroomsId };
      allMap.push(eventFreeRoms);
    }
    let roomsToChange = allMap.filter(event => event.freeroomsIds.length > 1);


    function checkPlaceToAddNewEV(date, room, eventId) {
      let eventsInRoom = eventsInRecomededRoomsFilteredByDate.filter(
        el => el.room.id === room
      );
      let eventsInRoomWithoutCurr = eventsInRoom.filter(
        el => el.id !== eventId
      );

      if (eventsInRoomWithoutCurr.length === 0) {
        return true;
      }
      return checkOverlapEvents(eventsInRoomWithoutCurr, date).length
        ? false
        : true;
    }

    let Roomswap;
    let recomededRoomId;
    for (let roomToChange of roomsToChange) {
      if (
        checkPlaceToAddNewEV(
          date,
          roomToChange.freeroomsIds[0],
          roomToChange.event
        )
      ) {

        Roomswap = {
          event: roomToChange.event,
          room: roomToChange.freeroomsIds[1]
        };
        recomededRoomId = roomToChange.freeroomsIds[0];
      }
    }

    if (Roomswap) {
      let recomededRoom = RoomsFilterdByCapacity.filter(
        el => el.id === recomededRoomId
      )[0];

      Recomendations = [
        {
          date: {
            start: date.start,
            end: date.end
          },
          room: {
            title: recomededRoom.title,
            floor: recomededRoom.floor,
            id: recomededRoom.id
          },
          roomSwap: [Roomswap]
        }
      ];
    } else {
      Recomendations = [];
    }
  }

  return Recomendations;
}
