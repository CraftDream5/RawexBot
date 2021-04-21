const Discord = require('discord.js');
const db = require('quick.db');

///fiber botlist & code
exports.run = function(client, message, args) {
     if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
	let botid = args[0]
	let prefix = args[1]
  let onaylımı = args[2]
	let kanal = db.fetch(`bot-ekle_${message.guild.id}`)
  let log =   db.fetch(`bot-log_${message.guild.id}`)
  let aktif = db.fetch(`baktif_${message.guild.id}`)
  if(!aktif) return message.channel.send("⛔ Üzgünüm Ancak Botlist Sistemi Sunucuda Devredışı. Ayarlamak İçin `r!botlist`").then(msg => msg.delete({timeout:10000}))
  let yetkili = db.fetch(`byetkili_${message.guild.id}`)
  if (message.channel.id !== kanal) return message.channel.send(`Bu komutu sadece <#${kanal}> kanalında kullanabilirsin.`).then(msg => msg.delete({timeout:10000}))
	if (message.channel.id == kanal) {
  if (!botid) return message.channel.send(`⛔ Botunun ID'sini yazmalısın.`).then(msg => msg.delete({timeout:10000}))
  if (!prefix) return message.channel.send(`⛔ Botunun prefixini yazmalısın.`).then(msg => msg.delete({timeout:10000}))
    message.delete()
  const basvuruuu = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setDescription(`${message.author} adlı kullanıcının <@${botid}> adlı botu sıraya ekledi. Botu onaylanmayı bekliyor.`)
  const embed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setDescription(`[0 Perm](https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0) | [8 Perm](https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8)`)
  .addField("Bot Sahibi", `<@!${message.author.id}>`)
  .addField("Bot ID", botid)
  .addField("Bot Prefix", prefix)
  .addField("DBL Onay", onaylımı ? onaylımı : "Hayır")
    client.channels.cache.get(log).send(`<@&${yetkili}>`)
  client.channels.cache.get(log).send(embed)
  client.channels.cache.get(log).send(basvuruuu)
  message.channel.send(`Bot ekleme isteğiniz alındı. Yapman gereken onaylanmasını/reddedilmesini beklemek.`).then(msg => msg.delete({timeout:10000}))
  }
};
////fiber botlist & code
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-ekle'],
  permLevel: 0
};

exports.help = {
  name: 'botekle', 
  description: "Sunucuya bot eklemenizi sağlar.",
  usage: 'botekle <botid> <prefix>'
};