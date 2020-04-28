export const CLIENT_ID = "5a4ff35b849d9cc3cab7";
export const CLIENT_SECRET = "f94c5d74e099ed894f88ac6c75ac19c4c3194427";
export const redirect_url = "http://localhost:3000/auth/result";
export const githubAuthUrl = "https://github.com/login/oauth/authorize?client_id="+CLIENT_ID+"&redirect_uri="+redirect_url+"&scope=read:user user:email";