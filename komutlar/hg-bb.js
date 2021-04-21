const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");

exports.run = async (client, message, args) => {
    if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("⛔ Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısınız.").then(msg => msg.delete({timeout:100000}))

  let channel = message.mentions.channels.first();
  if (!channel) {
    return message.reply("Ayarlanacak Kanalı Etiketle.");
  }
  db.set(`gçkanal_${message.guild.id}`, channel.id);
  //var i = db.set(`capsE_${message.guild.id}`, "acik")
  message.channel.send(`:white_check_mark: | ** Resimli Hoşgeldin - Güle Güle kanalı ${channel} Olarak Ayarlandı.** `);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hg-bb-ayarla"],
  permLevel: 0
};

exports.help = {
  name: "hg-bb-ayarla",
  description: "Giriş Çıkış Kanalını Ayarlar.",
  usage: "gç-ayarla <#kanal>"
};