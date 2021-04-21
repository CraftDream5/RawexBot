const Discord = require('discord.js');
const db = require('quick.db');

///fiber botlist & code
exports.run = function(client, message, args) {     
  if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
       let dev = db.fetch(`devrol_${message.guild.id}`)
    let bot = db.fetch(`botrol_${message.guild.id}`)
  let yetkili = db.fetch(`byetkili_${message.guild.id}`)
  if (!message.member.roles.cache.has(yetkili)) return message.channel.send('⛔ Bu komutu kullanabilmek için \`Botlist Yetkili\` yetkisine sahip olmalısın.').then(msg => msg.delete({timeout:100000}))
    let botisim = args[0]
  let sahip = args[1]
  
    let basvuru = db.fetch(`basvuruk_${message.guild.id}`)
    let kanal = db.fetch(`bot-ekle_${message.guild.id}`)
  let log =   db.fetch(`bot-log_${message.guild.id}`)
  let aktif = db.fetch(`baktif_${message.guild.id}`)
  if(!aktif) return message.channel.send("⛔ Üzgünüm Ancak Botlist Sistemi Sunucuda Devredışı. Ayarlamak İçin `r!botlist`").then(msg => msg.delete({timeout:10000}))
  const onay = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setDescription(`<@${sahip}> adlı kişinin <@${botisim}> adlı botu onaylandı.\nOnaylayan yetkili : ${message.author}`)
    
    if (!botisim) return message.channel.send(`⛔ Botun idsini yazmalısın.`).then(msg => msg.delete({timeout:10000}))
    if (!sahip) return message.channel.send(`⛔ Botun sahibinin idsini yazmalısın.`).then(msg => msg.delete({timeout:10000}))
  message.delete()
  
  message.guild.members.cache.get(sahip).send(`**${message.guild.name}** Adlı sunucuya eklemiş olduğunuz, <@${botisim}> adlı botunuz başarıyla onaylandı.`)
        client.channels.cache.get(log).send(onay)
  message.guild.members.cache.get(sahip).roles.add(dev)
    message.guild.members.cache.get(botisim).roles.add(bot)
  message.channel.send(`Botu onayladınız.`).then(msg => msg.delete({timeout:1000}))
 
};
///fiber botlist & code
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-onayla', 'onayla'],
  permLevel: 0
};

exports.help = {
  name: 'botonayla', 
  description: "Sunucuya eklenen botu onaylar.",
  usage: 'botonayla <bot ismi>'
};