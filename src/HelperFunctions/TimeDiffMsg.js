//To calculate the difference bettwen current time and input time and return a corresponding string 
export const  getRelativeTime = (inputTimeStampString) => {
    const inputDateTime =  new Date(inputTimeStampString);
    const timeDiffMs = new Date() - inputDateTime; //in milliseconds
    const timeDiffMins = Math.round(((timeDiffMs % 86400000) % 3600000) / 60000); //in minutes
    var msgString="";
    switch(true) {
    case (timeDiffMins >= 0 && timeDiffMins < 1): msgString = "few seconds ago";break;
    case (timeDiffMins < 10): msgString = "few minutes ago";break;
    case (timeDiffMins > 10 && timeDiffMins < 15): msgString = "about 10 minutes ago";break;
    case (timeDiffMins > 15 && timeDiffMins < 20): msgString = "about 15 minutes ago";break;
    case (timeDiffMins > 20 && timeDiffMins < 25): msgString = "about 20 minutes ago";break;
    case (timeDiffMins > 25 && timeDiffMins < 30): msgString = "about 25 minutes ago";break;
    case (timeDiffMins/60 >= 24): msgString = "on " + inputDateTime.toDateString()+" " + inputDateTime.toLocaleTimeString();break;
    case (timeDiffMins >= 60): msgString = timeDiffMins/60 + " hours ago";break;
    case (timeDiffMins >= 45): msgString = "about 45 minutes ago";break;
    case (timeDiffMins >= 30): msgString = "about 30 minutes ago";break;
    default: msgString = "on " + inputDateTime.toDateString()+" " + inputDateTime.toLocaleTimeString();break;
    }
    return msgString;
};
