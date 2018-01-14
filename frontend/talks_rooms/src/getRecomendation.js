

export default function getRecommendation(date,db,members) {

	let numberOfmembers = members.length;
	let AllRooms= db ? db.rooms : [];
	let AllEvents= db ? db.events : [];
	console.log(AllRooms)


	let RoomsFilterdByCapacity=AllRooms.filter((room)=>room.capacity>=numberOfmembers)


	function getUserDistance(members,eventFloor){

		return numberOfmembers? members.map((member)=>Math.abs(eventFloor-member.homeFloor)).reduce((curr,el)=>curr+el)
		: 0;
	}


	let	RoomsSortedByMinDistance=(RoomsFilterdByCapacity.sort(function(a,b){return getUserDistance(members,a.floor)-getUserDistance(members,b.floor)}))

	let RoomsIdsSortedByMinDistance = RoomsSortedByMinDistance.map((room)=>room.id)


	let eventsInRecomededRooms= AllEvents.
	filter((event)=>RoomsIdsSortedByMinDistance.
				 indexOf(event.room.id)!==-1)


	function convertDate(date){
		return date.split("T")[0];
	}


	let eventsInRecomededRoomsFilteredByDate=eventsInRecomededRooms.filter((event)=>
		convertDate(event.dateStart)===convertDate(date.start)
)

	function convertTime(date){
		let timeMinSplit=date.split("T")[1].split(":");
		return parseInt(timeMinSplit[0])*60+parseInt(timeMinSplit[1])
	}



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



	// console.log(overlapEvent)
	let freeRoomsID=nOverlapEvent.map((el)=>el.room)
	let freeRooms=RoomsSortedByMinDistance.filter((room)=>freeRoomsID.indexOf(room.id))
	// // filter по перекрытию
	// //находим событие которое перекрывается и ищем по нему комнаты в которых не перекрывется
	let Recomendations=[];
	freeRooms.map((room)=>
		{Recomendations.push({"date" :{"start":date.start,
																	"end":date.end
																	},
													"room":{"title" :room.title,
																	"floor": room.floor,
																	"id" : room.id
												}})})

	return Recomendations
}
