require('dotenv').config();

module.exports = {
    TOKEN: process.env.TOKEN,
    DOCK_API: process.env.DOCK_API,
    COOKIE_API: process.env.COOKIE_API,
    APP_ID: process.env.APP_ID,
    MONGOURL: process.env.MONGOURL,
    GUILD_ID: process.env.GUILD_ID,
    prefix: "-"
};

