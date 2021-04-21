const Discord = require("discord.js");
const fs = require("fs");
var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
    if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`⛔ Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout:100000}))

  const db = require("quick.db");

  if (args[0] === "kapat") {
    if (db.has(`sKanal_${message.guild.id}`) === true) {
      db.delete(`sKanal_${message.guild.id}`);

      if (db.has(`sayac_${message.guild.id}`) === true) {
        db.delete(`sayac_${message.guild.id}`);
        message.channel.send("Sayaç kanalı ve sayaç başarıyla kaldırıldı");
        return;
      }

      message.channel.send("Sayaç kanalı kaldırıldı.");
      return;
    }
    message.channel.send(`Sayaç kanalı ayarlanmamış.`);
    return;
  }

  let channel = message.mentions.channels.first() || message.guild.channels.find(c => c.name === args.slice(0).join(" "));
  let prefix = ayarlar.prefix;

  if (!channel) {
    return message.reply("Lütfen ayarlamak istediğiniz kanalı etiketleyin");
  }


  db.set(`sKanal_${message.guild.id}`, channel.id);

  const embed = new Discord.MessageEmbed()
    .setDescription(`Sayaç kanalı başarıyla ayarlandı: ${channel}\nSayaç kanalını kapatmak isterseniz **${prefix}sayaçkanal kapat** yazmanız yeterlidir.`
    )
    .setColor("RANDOM")
    .setTimestamp()
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sayaç-kanal-belirle", "sayaç-kanal"],
  permLevel: 0
};

exports.help = {
  name: "sayaç-kanal-ayarla",
  description: "Sayaç kanalını ayarlar.",
  usage: "sayaç-kanal-ayarla <#kanal>"
};