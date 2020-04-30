export const validateOnboarding = (userDetails) => {
    console.log("Onboarding Validation");
    if(!userDetails.name || !userDetails.name.trim()) return false;
    if(!userDetails.position || !userDetails.position.trim()) return false;
    if(!userDetails.bio || !userDetails.bio.trim()) return false;
    if(!userDetails.email || !userDetails.email.trim() || !validateEmail(email)) return false;
    if(!userDetails.department || !userDetails.department.trim()) return false;
    if(!userDetails.contact || !userDetails.contact.trim()) return false;
    if(!userDetails.skills || !userDetails.skills.length) return false;
    return true;
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}