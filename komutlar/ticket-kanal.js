const Discord = require("discord.js");
const data = require("quick.db");

exports.run = async (client, message, args) => {
  const prefix =
    (await data.fetch(`prefix.${message.guild.id}`)) || 'r!';
    let m = ['ayarla','sıfırla']
  if(!args[0])return message.channel.send(`Bir seçenek belirtmelisin, \`ayarla / sıfırla\``)
  if(!m.includes(args[0])) return message.channel.send(`Sadece \`ayarla / sıfırla\` seçeneklerini kullanabilirsin.`)
        if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return;

  if (args[0] === "ayarla") {
    const kanalbelirle = await data.fetch(`kanal4.${message.guild.id}`);
    if (kanalbelirle)
      return message.channel.send(
        `Mesajı göndereceğim kanal zaten ayarlı: ${prefix}ticket-kanal sıfırla`
      ).setTimestamp()
      .setFooter(`Rawex Ticket Sistemi`,client.user.avatarURL());
    let kanal = message.mentions.channels.first();
    if (!args[1]) return message.channel.send(`Bir kanalı etiketlemelisin.`);
    if (!kanal)
      return message.channel.send(`Etiketlediğin kanalı bulamıyorum.`);
    data.set(`kanal4.${message.guild.id}`, kanal.id);
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `Mesajın kanalı başarıyla ayarlandı: ${prefix}ticket gönder`
        ).setTimestamp()
      .setFooter(`Rawex Ticket Sistemi`,client.user.avatarURL())
    );
  }

  if (args[0] === "sıfırla") {
    const kanalbelirle = await data.fetch(`kanal4.${message.guild.id}`);
    if (!kanalbelirle)
      return message.channel.send(
        `Mesajı göndereceğim kanal zaten ayarlı değil: ${prefix}ticket-kanal sıfırla`
      );

    data.delete(`kanal4.${message.guild.id}`);
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `Mesajın kanalı başarıyla sıfırlandı: ${prefix}ticket-kanal ayarla #channel`
        ).setTimestamp()
      .setFooter(`Rawex Ticket Sistemi`,client.user.avatarURL())
    );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bilet-kanal"],
  permLevel: 0
};

exports.help = {
  name: "ticket-kanal"
};