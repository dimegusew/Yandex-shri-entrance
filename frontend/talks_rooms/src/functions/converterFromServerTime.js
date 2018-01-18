
export default function converter(time){
	let fullDate=time.split("T")[0].split("-")
	let [year,month,date] = fullDate
	let fullTime = time.split("T")[1].split(".")[0].split(":")
	let [hour,min,sec]=fullTime
	    const MONTHS =  [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
      ];
	let returnedData = {"date":(parseInt(date,10)+" "+ MONTHS[parseInt(month,10)-1]),
										 "time":hour+":"+min,
									 		notconverted:year+"-"+month+"-"+date }

	return returnedData
}
