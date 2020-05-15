import * as EmailValidator from "email-validator";

export const validateOnboarding = (userDetails) => {
    var isvalid = true;
    const errorMessages = {
        nameErr: "",
        positionErr: "",
        bioErr: "",
        departmentErr: "",
        contactErr: "",
        emailErr: "",
        skillsErr: "",
    };
    // console.log(userDetails);
    if (!userDetails.name || !userDetails.name.trim()) {
        errorMessages.nameErr = "Enter your name";
        isvalid = false;
    }
    if (!userDetails.position || !userDetails.position.trim()) {
        errorMessages.positionErr = "Enter your position/designation";
        isvalid = false;
    }
    if (!userDetails.bio || !userDetails.bio.trim()) {
        errorMessages.bioErr = "Enter your bio";
        isvalid = false;
    }
    if (!userDetails.email || !userDetails.email.trim() || !EmailValidator.validate(userDetails.email)) {
        errorMessages.emailErr = "Enter a valid email ID!";
        isvalid = false;
    }
    if (!userDetails.department || !userDetails.department.trim()) {
        errorMessages.departmentErr = "Enter your department";
        isvalid = false;
    }
    if (!userDetails.contact || !userDetails.contact.trim()) {
        errorMessages.contactErr = "Enter your contact";
        isvalid = false;
    }
    if (!userDetails.skills || !userDetails.skills.length) {
        errorMessages.skillsErr = "Type a skill and press Enter key";
        isvalid = false;
    }
    return [isvalid, errorMessages];
};

// export const validateText = (textInput) => {
//     var isvalid = true;
//     if(!textInput)  {
//         errorMessages.bioErr = "Empty field!";
//         isvalid = false;
//     }
//     else if(!textInput.trim()) {
//         errorMessages.bioErr = "Invalid input!";
//         isvalid = false;
//     }
//     return [isvalid, errorMessages];
// }

// export const validateEmail = (emailInput) => {
//     var isvalid = true;
//     if(!emailInput)  {
//         errorMessages.bioErr = "Empty field!";
//         isvalid = false;
//     }
//     else if(!emailInput.trim()) {
//         errorMessages.bioErr = "Invalid input!";
//         isvalid = false;
//     }
//     else if(!EmailValidator.validate(userDetails.email)) {
//         errorMessages.bioErr = "Invalid email ID!";
//         isvalid = false;
//     }
//     return [isvalid, errorMessages];
// }
