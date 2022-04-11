export default {
    secret_token: process.env.SECRET_KEY,
    expires_in_token: "15m",
    secret_refresh_token: process.env.secret_refresh_token,
    expires_in_refresh_token: "30d",
    expires_refresh_token_days: 30,
};
