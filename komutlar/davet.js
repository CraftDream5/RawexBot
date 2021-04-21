const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
     if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
let bprefix = db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix
  const seksizaman = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  const yardım = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(`
    
> Davet Linkim İçin [Tıkla](https://discordapp.com/oauth2/authorize?client_id=` + client.user.id + `&scope=bot&permissions=8)
> Destek Sunucum İçin [Tıkla](https://discord.gg/UVRHpGMdhr)

`)
  return message.channel.send(yardım)
  
};



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "davet",
  description: "Botun istatistiklerini gösterir",
  usage: "istatistik"
};