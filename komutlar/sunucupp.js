const Discord = require("discord.js");

exports.run = (client, message, params) => {
if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
    const sunucubilgi = new Discord.MessageEmbed()
      .setColor("#36393F")
      .setImage(message.guild.iconURL({ dynamic: false, format: 'png', size: 1024 }))
      .setTimestamp()
    return message.channel.send(sunucubilgi);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-pp", "sunucupp"],
  permLevel: 0
};

exports.help = {
  name: "sunucu-resmi",
  description: "Sunucu Resminin Linkini Atar.",
  usage: "sunucuresmi"
};