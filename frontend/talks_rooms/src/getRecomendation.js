

export default function getRecommendation(date,db,members) {
	let numberOfmembers = members.length;
	let AllRooms=db.rooms;
	let AllEvents=db.events;
	console.log(AllEvents)

	let RoomsFilterdByCapacity=AllRooms.filter((room)=>room.capacity>=numberOfmembers)


	function getUserDistance(members,eventFloor){

		return numberOfmembers? members.map((member)=>Math.abs(eventFloor-member.homeFloor)).reduce((curr,el)=>curr+el)
		: 0;
	}


	let	RoomsSortedByMinDistance=(RoomsFilterdByCapacity.sort(function(a,b){return getUserDistance(members,a.floor)-getUserDistance(members,b.floor)}))
	console.log(RoomsSortedByMinDistance)

	let RoomsIdsSortedByMinDistance = RoomsSortedByMinDistance.map((room)=>room.id)
	console.log(RoomsIdsSortedByMinDistance)


	let eventsInRecomededRooms= AllEvents.
	filter((event)=>RoomsIdsSortedByMinDistance.
				 indexOf(event.room.id)!==-1)

	console.log(eventsInRecomededRooms)

	function convertDate(date){
		return date.split("T")[0];
	}


	let eventsInRecomededRoomsFilteredByDate=eventsInRecomededRooms.filter((event)=>
		convertDate(event.dateStart)===convertDate(date.start)
)
console.log(eventsInRecomededRoomsFilteredByDate)

	function convertTime(date){
		let timeMinSplit=date.split("T")[1].split(":");
		return parseInt(timeMinSplit[0])*60+parseInt(timeMinSplit[1])
	}

console.log(convertTime("2017-12-13T11:12:36.981Z"))
	console.log(eventsInRecomededRooms)


	 function checkOverlap(lineA, lineB) {
        return lineA.start > lineB.start && lineA.start < lineB.end ||
               lineA.end > lineB.start && lineA.end < lineB.end ||
               lineB.start > lineA.start && lineB.start < lineA.end ||
               lineB.end > lineA.start && lineB.end < lineA.end;
    }




	let nOverlapEvent= eventsInRecomededRoomsFilteredByDate.filter((event)=>!checkOverlap
	({"start" : convertTime(date.start)
	,"end" : convertTime(date.end)}
	,{"start" : convertTime(event.dateStart)
	,"end" : convertTime(event.dateEnd)}));

console.log(nOverlapEvent)


	// console.log(overlapEvent)
	let freeRoomsID=nOverlapEvent.map((el)=>el.room)
	console.log(freeRoomsID)
	let freeRooms=RoomsSortedByMinDistance.filter((room)=>freeRoomsID.indexOf(room.id))
	console.log(freeRooms)
	// // filter по перекрытию
	// //находим событие которое перекрывается и ищем по нему комнаты в которых не перекрывется
	let Recomendations=[];
	freeRooms.map((room)=>
		{Recomendations.push({"date" :{"start":date.start,
																	"end":date.end
																	},
													"room":{"title" :room.title,
																	"floor": room.floor
												}})})

	return Recomendations
}
