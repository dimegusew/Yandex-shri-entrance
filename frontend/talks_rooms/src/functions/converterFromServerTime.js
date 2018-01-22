
export default function converter(time){
	let fullDate=time.split("T")[0].split("-")
	let [year,month,date] = fullDate
	let fullTime = time.split("T")[1].split(".")[0].split(":")
	let [hour,min,sec]=fullTime
	    const MONTHS =  [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ];
	let returnedData = {"date":(parseInt(date,10)+" "+ MONTHS[parseInt(month,10)-1]),
										 "time":hour+":"+min,
									 		notconverted:year+"-"+month+"-"+date }

	return returnedData
}
