const createDateStr = (date)=>`${new Date(date).getDate()}.${new Date(date).getMonth()+1}`

export default createDateStr