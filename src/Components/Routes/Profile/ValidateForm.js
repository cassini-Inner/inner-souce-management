export const validateProfileUpdate = (userDetails) => {
    console.log("Edit Job Validation");
    if(!userDetails.name.trim()) return false;
    if(!userDetails.email.trim()) return false;
    if(!userDetails.bio.trim()) return false;
    if(!userDetails.position.trim()) return false;
    if(!userDetails.department.trim()) return false;
    if(!userDetails.contact.trim()) return false;
    if(!userDetails.skills.length) return false;
    return true;
}
