// To get the duration in days and call duration parser
export const getDuration = (data) => {
    let days = 0;
    for (let [key, value] of Object.entries(data)) {
        days += parseInt(value.duration);
    }
    return DurationParser(days);
}

// Takes number of days as input and returns a duration string 
export const DurationParser = (days) => {
    let duration = ""
    days = parseInt(days)
    if ( days >= 30 ) {
        let months =  parseInt(days/30)
        duration = months + (months > 1? " months ":" month ")
        days = parseInt(days%30)
    }
    if ( days >= 7 ) {
        let weeks = parseInt(days/7)
        duration += weeks + (weeks > 1 ? " weeks " : " week ")
        days = parseInt(days%7)
    }
    if ( days > 0 ) {
        duration += days + (days > 1 ? " days " : " day ")
    }
    return duration
} 