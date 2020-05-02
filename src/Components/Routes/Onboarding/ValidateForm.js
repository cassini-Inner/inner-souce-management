import * as EmailValidator from "email-validator";

export const validateOnboarding = (userDetails) => {
    console.log("Onboarding Validation");
    console.log(userDetails);
    if(!userDetails.name || !userDetails.name.trim()) return false;
    if(!userDetails.position || !userDetails.position.trim()) return false;
    if(!userDetails.bio || !userDetails.bio.trim()) return false;
    if(!userDetails.email || !userDetails.email.trim() || !EmailValidator.validate(userDetails.email)) return false;
    if(!userDetails.department || !userDetails.department.trim()) return false;
    if(!userDetails.contact || !userDetails.contact.trim()) return false;
    if(!userDetails.skills || !userDetails.skills.length) return false;
    return true;
};
