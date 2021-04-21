const Discord = require('discord.js');
const db = require('quick.db');

///fiber botlist & code
exports.run = function(client, message, args) {
if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  let yetkili = db.fetch(`byetkili_${message.guild.id}`)
if (!message.member.roles.cache.has(yetkili)) return message.channel.send('⛔ Bu komutu kullanabilmek için `Botlist Yetkili` yetkisine sahip olmalısın.') .then(msg => msg.delete({timeout:100000}))   
  let botisim = args[0]
  let sahip = args[1]
  let sebep = args.slice(2).join(" ");
    let kanal = db.fetch(`bot-ekle_${message.guild.id}`)
  let log =   db.fetch(`bot-log_${message.guild.id}`)
  let aktif = db.fetch(`baktif_${message.guild.id}`)
  if(!aktif) return message.channel.send("⛔ Üzgünüm Ancak Botlist Sistemi Sunucuda Devredışı. Ayarlamak İçin `r!botlist`").then(msg => msg.delete({timeout:10000}))
  const red = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`⛔ <@!${sahip}> adlı kişinin <@${botisim}> adlı botu reddedildi.\nSebep : ${sebep}\nReddeden yetkili : ${message.author}`)
    
    if (!botisim) return message.channel.send(`:⛔ Botun idsini yazmalısın.`).then(msg => msg.delete({timeout:10000}))
  if (!sebep) return message.channel.send(`:⛔ Botu neden onaylamadığını yazmalısın.`).then(msg => msg.delete({timeout:10000}))
    if (!sahip) return message.channel.send(`⛔ Bot Sahibi id yazman lazım.`).then(msg => msg.delete({timeout:10000}))
  message.delete()
  message.guild.members.cache.get(sahip).send(`**${message.guild.name}** Adlı sunucuya eklemiş olduğunuz, <@${botisim}> adlı botunuz **${sebep}** nedeni ile reddedildi.`)
        client.channels.cache.get(log).send(red);
        message.channel.send(`⛔ Botu reddettiniz.`).then(msg => msg.delete({timeout:10000}))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-reddet', 'reddet'],
  permLevel: 3
};

exports.help = {
  name: 'botreddet', 
  description: "Sunucuya eklenen botu reddeder.",
  usage: 'botreddet <bot ismi> - <sebep>'
};