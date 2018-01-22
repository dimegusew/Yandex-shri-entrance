

export default function dateFromRu(date){
  let dateSplit=date.split(" ")
  let [day,month,year] = dateSplit;
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
  let monthInd = MONTHS.indexOf(month)+1;
  return (year+"-"+(monthInd<10 ? "0"+monthInd : monthInd)+"-"+day)
}
