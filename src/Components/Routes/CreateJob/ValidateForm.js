

export const validateJob = (some) => {
    console.log("Job Validation");

}


export const validateMilestone = (milestone) => {
    console.log("Milestone Validation");
    if(!milestone.title.trim()) return false;
    if(!milestone.description.trim()) return false;
    if(!milestone.duration.trim()) return false;
    if(!milestone.skills.length) return false;
    if(!milestone.resolution.trim()) return false;
    return true;
}
