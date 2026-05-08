const {
    ContainerBuilder,
    TextDisplayBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    MediaGalleryBuilder,
    MediaGalleryItemBuilder,
    MessageFlags
} = require('discord.js');

module.exports = {
    name: 'membercount',
    description: 'Sends information on total membercount, online members and server boosts.',
    aliases: ['mc', 'members'],
    async execute(message, args, client) {
        const { guild } = message;

        const totalMembers = guild.memberCount;

        const onlineMembers = guild.members.cache.filter(
            (member) => member.presence && member.presence.status !== 'offline'
        ).size;

        const boostCount = guild.premiumSubscriptionCount || 0;

        const container = new ContainerBuilder()
            .setAccentColor(0xff66c4)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent('**Membercount**')
            )
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true)
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**Total Members:** \`${totalMembers}\`\n**Online Members:** \`${onlineMembers}\`\n**Server Boosts:** \`${boostCount}\``
                )
            )
            .addMediaGalleryComponents(
                new MediaGalleryBuilder().addItems(
                    new MediaGalleryItemBuilder().setURL('https://media.discordapp.net/attachments/1264584269758468249/1408682021802348634/Blossom_Customs_footer_better.png?ex=69ff6c9e&is=69fe1b1e&hm=8b6c5258cd963692c66ac13e122f977080145eae0d16bc82becfcddae298a8a5&=&format=webp&quality=lossless&width=2834&height=218')
                )
            );

        await message.channel.send({ components: [container], flags: [MessageFlags.IsComponentsV2] });
    },
};