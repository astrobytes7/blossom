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
        new TextDisplayBuilder().setContent('### **Membercount**')
      )
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          `**Total Members:** \`${totalMembers}\`\n**Online Members:** \`${onlineMembers}\`\n**Server Boosts:** \`${boostCount}\``
        )
      );

    await message.channel.send({ components: [container], flags: [MessageFlags.IsComponentsV2] });
  },
};