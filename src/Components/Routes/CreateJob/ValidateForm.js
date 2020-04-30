
export const validateJob = (milestoneCount, job) => {
    console.log("Job Validation");
    if(!job.title || !job.title.trim()) return false;
    if(!job.description || !job.description.trim()) return false;
    if(!job.difficulty || !job.difficulty.trim()) return false;
    if(!job.milestones || !job.milestones.length || !(milestoneCount == job.milestones.length)) return false;
    return true;
};


export const validateMilestone = (milestone) => {
    console.log("Milestone Validation");
    if(!milestone.title || !milestone.title.trim()) return false;
    if(!milestone.description || !milestone.description.trim()) return false;
    if(!milestone.duration || !milestone.duration.trim() || milestone.duration.includes("e")) return false;
    if(!milestone.skills || !milestone.skills.length) return false;
    if(!milestone.resolution || !milestone.resolution.trim()) return false;
    return true;
};
