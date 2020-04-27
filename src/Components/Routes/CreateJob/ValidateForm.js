

export const validateJob = (milestoneCount, job) => {
    console.log("Job Validation");
    if(!job.title.trim()) return false;
    if(!job.description.trim()) return false;
    if(!job.difficulty.trim()) return false;
    if(!job.milestones.length || !(milestoneCount == job.milestones.length)) return false;
    return true;
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
