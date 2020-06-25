export const validateProfileUpdate = ({ name, email, bio, position, skills, department, contact }) => {
    if (!name || !name.trim()) return false;
    if (!email || !email.trim() || !validateEmail(email)) return false;
    if (!bio || !bio.trim()) return false;
    if (!position || !position.trim()) return false;
    if (!department || !department.trim()) return false;
    if (!contact || !contact.trim()) return false;
    if (!skills || !skills.length) return false;
    return true;
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}