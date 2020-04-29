export const validateOnboarding = (userDetails) => {
    console.log("Onboarding Validation");
    if(!userDetails.name || !userDetails.name.trim()) return false;
    if(!userDetails.position || !userDetails.position.trim()) return false;
    if(!userDetails.department || !userDetails.department.trim()) return false;
    if(!userDetails.contact || !userDetails.contact.trim()) return false;
    if(!userDetails.skills || !userDetails.skills.length) return false;
    return true;
};
