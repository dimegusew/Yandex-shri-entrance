

export default function getRecommendation(date,db,members) {

	let numberOfmembers = members.length;
	let AllRooms= db ? db.rooms : [];
	let AllEvents= db ? db.events : [];
	console.log(AllRooms)
	console.log(AllEvents)
	console.log(members)

	function getRoomsFilteredByCapacity(rooms, members) {
	    let numberOfmembers = members.length;
	    let Rooms = rooms.filter(room => room.capacity >= numberOfmembers);
	    return Rooms;
	  }

	  function getUserDistance(members, eventFloor) {

	    return numberOfmembers ? members
	      .map(member => Math.abs(eventFloor - member.homeFloor))
	      .reduce((curr, el) => curr + el)
				: 0
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

	  function convertTime(time) {
	    let timeMinSplit = time.split(":");
	    return parseInt(timeMinSplit[0]) * 60 + parseInt(timeMinSplit[1]);
	  }

			function convertDate(date){
				return date.split("T")[0];
			}


				function convertTimeFromDate(date){
					let timeMinSplit=date.split("T")[1].split(":");
					return parseInt(timeMinSplit[0])*60+parseInt(timeMinSplit[1])
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
			// console.log(events[0])
		// console.log(dateToCheck)
		// console.log(convertTimeFromDate(dateToCheck.start))
		// console.log("events")
		// console.log(events)
		// 	// console.log(convertTimeFromDate(dateToCheck.start))
		// 	// console.log(convertTimeFromDate(events[0].dateStart))
		// 	console.log("res")
console.log(events.filter(event =>
	checkOverlap(
		{ start: convertTimeFromDate(dateToCheck.start), end: convertTimeFromDate(dateToCheck.end) },
		{
			start: (convertTimeFromDate(event.dateStart)),
			end: (convertTimeFromDate(event.dateEnd))
		}
	)
))


	    return events.filter(event =>
	      checkOverlap(
	        { start: convertTimeFromDate(dateToCheck.start), end: convertTimeFromDate(dateToCheck.end) },
	        {
	          start: (convertTimeFromDate(event.dateStart)),
	          end: (convertTimeFromDate(event.dateEnd))
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

		 console.log(eventsInRecomededRooms)

		 let eventsInRecomededRoomsFilteredByDate=eventsInRecomededRooms.filter((event)=>
			 convertDate(event.dateStart)===convertDate(date.start))




	   let overlapedEvents = checkOverlapEvents(eventsInRecomededRoomsFilteredByDate, date);



	   //let OverlapedEventRoomsID =OverlapEvent.map((el)=>el.room)
	   let OverlapedEventRoomsID = overlapedEvents.map(el => el.room.id);

	   let allRoomsIds = RoomsFilterdByCapacity.map(el => el.id);


	   let notOverlapedEvents = allRoomsIds.filter(
	     el => OverlapedEventRoomsID.indexOf(el) == -1
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
					 room:{title: room.title,
					 			"floor": room.floor,
				 				"id" : room.id},
	 					roomSwap :{}
	       });
	     });
	   }






	 	else {
	 				let allOverlap = [];
	 		for (let event of eventsInRecomededRoomsFilteredByDate) {
	 			let eventsWithoutCurr = eventsInRecomededRoomsFilteredByDate.filter(el => el.id !== event.id);
	 			//
				console.log("eventsWithoutCurr")
				console.log(eventsWithoutCurr)
	 			let overlap = eventsWithoutCurr.reduce((el, curr) => {
					console.log(curr)
					console.log(event)
	 				let checked = checkOverlap(
	 					{ start: convertTimeFromDate(curr.dateStart), end: convertTimeFromDate(curr.dateEnd) },
	 					{ start: convertTimeFromDate(event.dateStart), end: convertTimeFromDate(event.dateEnd) }
	 				);
						console.log(checked)
						console.log(event.room.id!==curr.room.id)
	 				if (!checked) {  //&& event.room!==curr.room
	 					allOverlap.push( { eventIDToChangeA: event.id,
	 									eventRoomIDToChangeA: event.room,
	 									eventIDToChangeB: curr.id,
	 								 eventRoomIDToChangeB :curr.room.id});

	 				}
	 				//else {return null}

	 			}
			);

			// console.log(overlap)
	 		// 	if (overlap){allOverlap.push(overlap);}
	 		}
			console.log("allOverlap")
	 		 console.log(allOverlap)





	 		console.log(allOverlap.map((el)=>el.eventIDToChangeA))
	 				console.log(allOverlap.map((el)=>el.eventRoomIDToChangeB))
	 		let IdEventsToChange=allOverlap.map((el)=>el.eventIDToChangeA)
	 		let RoomEventsToChange=allOverlap.map((el)=>el.eventRoomIDToChangeA)


			function checkPlaceToAddNewEV(date,room,eventId,allEvents){
				console.log("room")
				console.log(room)
				console.log(AllEvents)

				let eventsInRoom=AllEvents.filter((el)=>el.room.id===room)
				console.log("eventsInRoom")
				console.log(eventsInRoom)
				let eventsInRoomWithoutCurr=eventsInRoom.filter((el)=>el.id!==eventId)
				if(eventsInRoomWithoutCurr.length==0){return true}

				console.log(eventsInRoomWithoutCurr)
				console.log("eventsInRoomWithoutCurr")
				console.log(checkOverlapEvents(eventsInRoomWithoutCurr, date))
				return checkOverlapEvents(eventsInRoomWithoutCurr, date).length ? false : true

			}

	let allOverlapWithFree=allOverlap.filter((el)=>checkPlaceToAddNewEV(date,el.eventRoomIDToChangeA.id,el.eventIDToChangeA,AllRooms))

			console.log("allOverlapWithFree")
			console.log(allOverlapWithFree)
	 		console.log("allOverlap")
	 		console.log(allOverlap)
	 		console.log("allOverlapWithFree")
	 		console.log(allOverlapWithFree)



	 		function checkPlaceToReplaceIsFree(eventId,roomToChange,allRooms){
				console.log("eventId")
				console.log(eventId)
				console.log("roomToChange")
				console.log(roomToChange)
	 			let eventsIncurrRoom= AllRooms.filter((ev)=>ev.id===roomToChange.id)
	 			let event=eventsInRecomededRoomsFilteredByDate.filter((ev)=>ev.id==eventId)
				console.log(event)
	 			return checkOverlapEvents(eventsIncurrRoom, event[0].date).length==0? true : false//(checkOverlapEvents(eventsIncurrRoom, event.date))

	 		}
	 		console.log("cheeck")
	 		console.log(allOverlapWithFree)


	 		if(allOverlapWithFree.length>0){

	 		let roomToreplace=allOverlapWithFree.reduce((el,curr)=>{
	 			if (checkPlaceToReplaceIsFree(curr.eventIDToChangeA,curr.eventRoomIDToChangeB))
	 				{return {roomToreplace :{event:curr.eventIDToChangeA,"roomtoChange":curr.eventRoomIDToChangeB},room : curr.eventRoomIDToChangeA }}
	 		})
			console.log('roomToreplace')
			console.log(roomToreplace)


	 	let roomToREcomendateRoom=AllRooms.filter((room)=>room.id===roomToreplace.room.id)[0]
		console.log(roomToREcomendateRoom)
	 	let roomToREcomendateRoomTitle=roomToREcomendateRoom.title
	 		console.log(roomToreplace)
	 		//console.log(roomToREcomendateRoom)

	 		Recomendations=[{date: {
	 										start: date.start,
	 										end: date.end},
											room:{title:  roomToREcomendateRoom.title,
													 "floor": roomToREcomendateRoom.floor,
													 "id" : roomToREcomendateRoom.id},
	 										roomSwap:roomToreplace.roomToreplace}]
	 	}
	 		else {Recomendations=[]}
	 	}


		console.log("reeecomendatioon")
		console.log(Recomendations)
	   return Recomendations;
	 }



//-----
//
//
// 	let RoomsFilterdByCapacity=AllRooms.filter((room)=>room.capacity>=numberOfmembers)//rooms by capacity
//
//
// 	function getUserDistance(members,eventFloor){
//
// 		return numberOfmembers ? members.map((member)=>Math.abs(eventFloor-member.homeFloor)).reduce((curr,el)=>curr+el)
// 		: 0;
// 	}
//
//
// 	let	RoomsSortedByMinDistance=(RoomsFilterdByCapacity.sort(function(a,b){return getUserDistance(members,a.floor)-getUserDistance(members,b.floor)}))
// 	let RoomsIdsSortedByMinDistance = RoomsSortedByMinDistance.map((room)=>room.id)
//
//
//
//
// 	let eventsInRecomededRooms= AllEvents.
// 	filter((event)=>RoomsIdsSortedByMinDistance.
// 				 indexOf(event.room.id)!==-1)
//
//
// 	function convertDate(date){
// 		return date.split("T")[0];
// 	}
//
//
// 	let eventsInRecomededRoomsFilteredByDate=eventsInRecomededRooms.filter((event)=>
// 		convertDate(event.dateStart)===convertDate(date.start)
// )
//
// 	function convertTime(date){
// 		let timeMinSplit=date.split("T")[1].split(":");
// 		return parseInt(timeMinSplit[0])*60+parseInt(timeMinSplit[1])
// 	}
//
//
//
// 	 function checkOverlap(lineA, lineB) {
//         return lineA.start > lineB.start && lineA.start < lineB.end ||
//                lineA.end > lineB.start && lineA.end < lineB.end ||
//                lineB.start > lineA.start && lineB.start < lineA.end ||
//                lineB.end > lineA.start && lineB.end < lineA.end;
//     }
//
//
//
//
// 	let nOverlapEvent= eventsInRecomededRoomsFilteredByDate.filter((event)=>!checkOverlap
// 	({"start" : convertTime(date.start)
// 	,"end" : convertTime(date.end)}
// 	,{"start" : convertTime(event.dateStart)
// 	,"end" : convertTime(event.dateEnd)}));
//
//
//
// 	// console.log(overlapEvent)
// 	let freeRoomsID=nOverlapEvent.map((el)=>el.room)
// 	let freeRooms=RoomsSortedByMinDistance.filter((room)=>freeRoomsID.indexOf(room.id))
// 	// // filter по перекрытию
// 	// //находим событие которое перекрывается и ищем по нему комнаты в которых не перекрывется
// 	let Recomendations=[];
// 	freeRooms.map((room)=>
// 		{Recomendations.push({"date" :{"start":date.start,
// 																	"end":date.end
// 																	},
// 													"room":{"title" :room.title,
// 																	"floor": room.floor,
// 																	"id" : room.id
// 												}})})
//
// 	return Recomendations
// }
