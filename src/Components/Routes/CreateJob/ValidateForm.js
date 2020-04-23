

export const validateJob = (some) => {
    let isValid = false;
    console.log("Job Validation");
    if(!(document.getElementById("jobTitle").value).trim()) return [isValid, {}];
    if(!(document.getElementById("jobDescription").value).trim()) return [isValid, {}];
    if(!(document.getElementById("jobDifficulty").value).trim()) return [isValid, {}];

    isValid = true;
    const job = {
        title: (document.getElementById("jobTitle").value).trim(),
        description: (document.getElementById("jobDescription").value).trim(),
        difficulty: (document.getElementById("jobDifficulty").value).trim(),
    }
    some(job);
}


export const validateMilestone = (skillList) => {
    console.log("Milestone Validation");
    let milestone = {};
    let validate = false;

    return [validate,milestone]
}
