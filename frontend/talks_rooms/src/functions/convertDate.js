

export default function convertDate(date){
 return date ? {"day" : date.getDate(),
         "mounth": date.getMonth()+1,
         "year" : date.getFullYear(),
         "fullDate" :
         `${date.getFullYear()}/${date.getMonth()+1<10
            ? ("0"+(date.getMonth()+1)):date.getMonth()+1}/${date.getDate()<10
               ? "0"+date.getDate():date.getDate() }`
}
: null
}
