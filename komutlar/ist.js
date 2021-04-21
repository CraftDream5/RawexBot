const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
exports.run = async (client, message, args) => {
if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  const seksizaman = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  const istatistikler = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setTimestamp()
    .setDescription(`» **Botun Sahibi:** <@831109685474099210>
    » **Botun Geliştiricileri:** <@831109685474099210>
    
    » **Bellek:** ${(process.memoryUsage().heapUsed / 1024 / 512).toFixed(2)}MB / 512MB
    » **Çalışma:** ${seksizaman}
    
    
    » **Sunucu:** ${client.guilds.cache.size.toLocaleString()}
    
    » **Kullanıcı:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
    
    » **Kanal:** ${client.channels.cache.size.toLocaleString()}
    
    
    » **Ping:** ${client.ws.ping}
    » **Discord.js:** v${Discord.version}
    » **Node.js:** ${process.version}
    
    » **CPU;** \`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\`
    » **Bit:** \`${os.arch()}\`
    
    » **Davet:** [Tıkla](https://discordapp.com/oauth2/authorize?client_id=` + client.user.id + `&scope=bot&permissions=8)`)

  return message.channel.send(istatistikler);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i"],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "Botun istatistiklerini gösterir",
  usage: "istatistik"
};