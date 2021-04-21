const Discord = require('discord.js');

exports.run = async (client, message, args) => {
   if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")

    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  let tag = 'YAKINDA AYARLAYACAM'
    const codare = new Discord.MessageEmbed()
        .setColor("RED")
    .setTimestamp()
    .setTitle(`${message.guild.name}`)
        .addField("Toplam Üye", message.guild.memberCount)
        .addField("Online Üye", message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size + message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status == "dnd").size + message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status == "idle").size)
        .addField("Seslideki Üye", count)
        .addField("Toplam Bot", message.guild.members.cache.filter(m => m.user.bot).size)
        //.addField("Tagdaki üye sayısı", message.guild.members.cache.filter(m => m.user.username.includes(tag)).size)
    message.channel.send(codare);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
    usage: "say"
}