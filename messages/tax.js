const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'tax',
    execute: async (message, args, client) => {
        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Please provide a valid Robux amount.');
        }

        const charge = Math.ceil(amount / 0.7);
        const taxAmount = charge - amount;

        const embed = new EmbedBuilder()
            .setColor('#ff66c4')
            .addFields(
                { name: 'Before Tax', value: `${amount}`, inline: true },
                { name: 'Tax', value: `${taxAmount}`, inline: true },
                { name: 'After Tax', value: `${charge}`, inline: true }
            )
            .setImage('https://media.discordapp.net/attachments/1264584269758468249/1408682021802348634/Blossom_Customs_footer_better.png?ex=69ff6c9e&is=69fe1b1e&hm=8b6c5258cd963692c66ac13e122f977080145eae0d16bc82becfcddae298a8a5&=&format=webp&quality=lossless&width=2834&height=218');

        await message.reply({ content: null, embeds: [embed] });
    }
};
