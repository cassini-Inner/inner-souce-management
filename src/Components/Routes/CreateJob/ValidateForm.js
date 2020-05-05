
export const validateJob = (milestoneCount, job) => {
    var isvalid = true;
    const errorMessages = { 
        titleErr:"",
        descriptionErr:"",
        difficultyErr: "",
        jobErrMsg: "",
    };
    if(!job.title || !job.title.trim()) {
        isvalid = false;
        errorMessages.titleErr = "Enter the job title";
    }
    if(!job.description || !job.description.trim()) {
        isvalid = false;
        errorMessages.descriptionErr = "Enter the job description";
    }
    if(!job.difficulty || !job.difficulty.trim()) {
        isvalid = false;
        errorMessages.difficultyErr = "Enter the job difficulty";
    }
    if(!job.milestones || !job.milestones.length || !(milestoneCount == job.milestones.length)) {
        isvalid = false;
        errorMessages.jobErrMsg = "Add at least one miletone to the job!";
    }
    return [isvalid, errorMessages];
};


export const validateMilestone = (milestone) => {
    var isvalid = true;
    const errorMessages = { 
        titleErr:"",
        descriptionErr:"",
        durationErr: "",
        skillsErr: "",
        resolutionErr: "", 
    };
    if(!milestone.title || !milestone.title.trim()) {
        isvalid = false;
        errorMessages.titleErr = "Enter the milestone title";
    }
    if(!milestone.description || !milestone.description.trim()) {
        isvalid = false;
        errorMessages.descriptionErr = "Enter the milestone description";
    }
    if(!milestone.duration || !milestone.duration.trim() || milestone.duration.includes("e")) {
        isvalid = false;
        errorMessages.durationErr = "Enter a valid milestone duration";
    }
    if(!milestone.skills || !milestone.skills.length) {
        isvalid = false;
        errorMessages.skillsErr = "Enter the skill(s) required for the milestone (Type a skill and press Enter key)";
    }
    if(!milestone.resolution || !milestone.resolution.trim()) {
        isvalid = false;
        errorMessages.resolutionErr = "Enter milestone resolution method(s)";
    }
    return [isvalid, errorMessages];
};
