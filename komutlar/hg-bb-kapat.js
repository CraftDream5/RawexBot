const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
    if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send("⛔ Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısınız.").then(msg => msg.delete({timeout:100000}))
  //Resađ Seferov?#0809
  let prefix = ayarlar.prefix;

  if (db.has(`gçkanal_${message.guild.id}`) === false) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Giriş çıkışı Ayarlamadığın İçin Sıfırlayamazsın!`)
      .setColor("RED")
      .setTimestamp(`Ayarlamak İçin **${prefix}giriş-çıkış-ayarla #kanal**`);
    message.channel.send(embed);
    return;
  }
  db.delete(`gçkanal_${message.guild.id}`);

  const embed = new Discord.MessageEmbed()
    .setDescription(`Giriş Çıkış Başarıyla Sıfırlandı`)
    .setColor("RANDOM")
    .setTimestamp();
  message.channel.send(embed);
  return;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hg-bb-sıfırla"],
  permLevel: 0
};

exports.help = {
  name: "hg-bb-kapat",
  description: "Giriş çıkışı kapatır",
  usage: "giriş-çıkış-kapat"
};