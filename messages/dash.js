const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'dash',
    execute: async (message, args, client) => {
        // Check permissions: Admin or specific role
        const hasPerm = message.member.permissions.has(PermissionsBitField.Flags.Administrator) ||
            message.member.roles.cache.has('1320685222685310997');

        if (!hasPerm) {
            return message.reply('<:click:1502158405870157945> You do not have **permission** to use this command.');
        }

        // Your exact Component v2 JSON structure
        const componentsV2 = [
            {
                type: 17, // Section Container
                components: [
                    {
                        type: 12, // Media Item
                        items: [{
                            media: { url: "https://media.discordapp.net/attachments/1264584269758468249/1408682025560309800/Blossom_Customs_Dashboard.png?ex=69ff6c9e&is=69fe1b1e&hm=a6df5b3db57ca52a8337f6f6a34c92311c4831fab4198dea39aab95a080b0bcb&=&format=webp&quality=lossless&width=2834&height=869" }
                        }]
                    },
                    { type: 14 }, // Separator
                    {
                        type: 10, // Text Item
                        content: "Welcome to <:BlossomLogo:1326224460839391338> **Blossom Customs**, where we create designs that bloom. We are dedicated to developing high-quality products tailored to your needs, while keeping our services affordable for everyone."
                    },
                    { type: 14 }, // Separator
                    {
                        type: 1, // Action Row (Buttons)
                        components: [
                            { type: 2, style: 2, label: "Regulations", emoji: { id: "1502464181075574794" }, custom_id: "p_300053456519958529" },
                            { type: 2, style: 5, label: "Roblox Group", emoji: { id: "1502464380594556948" }, url: "https://www.roblox.com/groups/your-link" },
                            { type: 2, style: 2, label: "Designer Application", emoji: { id: "1502464553919975494" }, custom_id: "p_300053468297564163" }
                        ]
                    },
                    {
                        type: 1, // Action Row (Select Menu)
                        components: [{
                            type: 3,
                            custom_id: "p_300055418153996294",
                            placeholder: "Navigate",
                            options: [{ label: "Home", value: "home" }] // Add your options here
                        }]
                    },
                    { type: 14 }, // Separator
                    {
                        type: 12, // Media Item (Footer)
                        items: [{
                            media: { url: "https://media.discordapp.net/attachments/1264584269758468249/1408682021802348634/Blossom_Customs_footer_better.png?ex=69ff6c9e&is=69fe1b1e&hm=8b6c5258cd963692c66ac13e122f977080145eae0d16bc82becfcddae298a8a5&=&format=webp&quality=lossless&width=2834&height=218" }
                        }]
                    }
                ]
            }
        ];

        try {
            await message.delete();

            // Sending via raw data because d.js builders don't fully support Type 17/12 yet
            await message.channel.send({
                components: componentsV2
            });

        } catch (error) {
            console.error("Dashboard error:", error);
            message.reply("Could not send the v2 container. Ensure your bot is using a library version that supports this layout.");
        }
    }
};