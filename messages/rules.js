const {
    ContainerBuilder,
    TextDisplayBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    MediaGalleryBuilder,
    MediaGalleryItemBuilder,
    MessageFlags
} = require("discord.js");

module.exports = {
    name: "rules",
    description: "Sends the server rules.",
    async execute(message) {
        // Security check: Admin or specific role
        const requiredRoleId = "1332954707676762203"; // Support/Admin role ID
        if (!message.member.roles.cache.has(requiredRoleId) && !message.member.permissions.has("Administrator")) {
            return;
        }

        await message.delete().catch(() => { });

        const rulesText = `**1. Respect**
<:BlossomDots:1394566515281625148> You should respect everyone at all times in our community. Keep swearing to a minimum and do not use slurs.

**2. NSFW Behavior**
<:BlossomDots:1394566515281625148> Sending any graphic & hateful content within the community is not allowed and will be strictly punished. This includes gore, any kind of sexual content, and other.

**3. Advertising**
<:BlossomDots:1394566515281625148> Do not advertise whether it is inside the server or in DMs. This includes advertising our server at places it is not allowed and by that reflecting us in a bad way.

**4. English Only**
<:BlossomDots:1394566515281625148> Refrain from using any language apart from English. This is strictly to help our Staff Team with moderation.

**5. Channel Usage**
<:BlossomDots:1394566515281625148> You are to use each channel for its intended purpose. Not doing so will result in a punishment.

**6. Drama**
<:BlossomDots:1394566515281625148> Starting drama in our server and hating on other servers or products is strictly prohibited. If you want to discuss something, bring it to DMs.

**7. Encouraging Others to Break Rules**
<:BlossomDots:1394566515281625148> Encouraging other people to break rules will get you punished as you did it.

**8. Alternative Accounts**
<:BlossomDots:1394566515281625148> Bringing your Alt Accounts to this Server and using them to bypass moderation actions is strictly prohibited. Doing so will result in a severe punishment.

**9. Threats**
<:BlossomDots:1394566515281625148> Do not threaten another member in any way. We will punish this behavior strictly even it might be a joke for you.

**10. Common Sense**
<:BlossomDots:1394566515281625148> Always use common sense. Finding gap holes in rules won't be tolerated.

-# <:WarningIcon:1411028363778457671> The attempt of exploitation or finding loopholes in our regulations is not permitted — use common sense and if you dont think you should send/say it, dont. Staff may take action at their discretion. You must adhere to [\`Discord's Terms of Service\`](https://discord.com/terms) and [\`Community Guidelines\`](https://discord.com/guidelines) at all times while being a member of our community.`;

        const container = new ContainerBuilder()
            .setAccentColor(0xff66c4)
            .addMediaGalleryComponents(
                new MediaGalleryBuilder().addItems(
                    new MediaGalleryItemBuilder().setURL(
                        "https://media.discordapp.net/attachments/1264584269758468249/1408682025560309800/Blossom_Customs_Dashboard.png?ex=69ff6c9e&is=69fe1b1e&hm=a6df5b3db57ca52a8337f6f6a34c92311c4831fab4198dea39aab95a080b0bcb&=&format=webp&quality=lossless&width=2834&height=869"
                    )
                )
            )
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Small)
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent("## <:book:1502464181075574794> Server Regulations")
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(rulesText)
            )
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Small)
            )
            .addMediaGalleryComponents(
                new MediaGalleryBuilder().addItems(
                    new MediaGalleryItemBuilder().setURL(
                        "https://media.discordapp.net/attachments/1264584269758468249/1408682021802348634/Blossom_Customs_footer_better.png?ex=6a09f89e&is=6a08a71e&hm=fdb6170dec47f560b4f18bf44a4ab2401dd71dc2f96650d4413696c72ffcd848&=&format=webp&quality=lossless&width=2834&height=218"
                    )
                )
            );

        await message.channel.send({
            flags: MessageFlags.IsComponentsV2,
            components: [container],
        });
    },
};
