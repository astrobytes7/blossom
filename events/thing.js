const stickyTextSchema = require('../models/stickyTextSchema');
const { Events } = require('discord.js');

// CONFIGURATION //
const channels = {
    "1500226139107365035": "<:Boost:1504185505271648338> Thank you to all of our **supporters**, your reviews and feedback helps us alot with our operations.",
    "1498372031278743572": "<:Announcement:1504185244830400682> Please avoid sending messages in this channel.",
};
// CONFIGURATION //

module.exports = {
    name: Events.MessageCreate,
    async execute(client, message) {
        if (!message.guild) return;
        if (message.author.bot) return;

        const text = channels[message.channel.id];
        if (!text) return;

        try {
            const saved = await stickyTextSchema.findOne({
                channel: message.channel.id
            });

            if (saved) {
                const old = await message.channel.messages
                    .fetch(saved.message)
                    .catch(() => null);
                if (old) {
                    await old.delete().catch(() => null);
                }
            }

            const newer = await message.channel.send(text);

            await stickyTextSchema.findOneAndUpdate(
                { channel: message.channel.id },
                {
                    channel: message.channel.id,
                    message: newer.id
                },
                { upsert: true, new: true }
            );

        } catch (error) {
            console.error("STICKY MESSAGE ERROR:", error);
        }

    },
};