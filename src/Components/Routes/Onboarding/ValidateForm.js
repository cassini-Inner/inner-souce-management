export const validateOnboarding = (userDetails) => {
    console.log("Onboarding Validation");
    if(!userDetails.name.trim()) return false;
    if(!userDetails.position.trim()) return false;
    if(!userDetails.department.trim()) return false;
    if(!userDetails.contact.trim()) return false;
    if(!userDetails.skills.length) return false;
    return true;
}
