import moment from "moment"

export const DateMonthYear = (data)=>{
    return moment(data).format("DD - MM - YYYY")
}