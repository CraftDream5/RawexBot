const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
           if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
let bug = args.join(" ").slice(0);
let user = message.author.username;
let guild = message.guild.name;
let guildid = message.guild.id;
let kanal = message.channel.name;
  let kanalid = message.channel.id;
let embed = new Discord.MessageEmbed()
.setTitle("Bug Bildirisi")
.addField("Bug", bug)
.addField("Report Eden", user, true)
.addField("Sunucu", guild, true)
.addField("Sunucu ID", guildid, true)
.addField("Kanal", kanal, true)
.addField("Kanal ID", kanalid, true)
.setColor("RED")
  const embed2 = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(
      `**${message.author.username}**, hata bildiriminiz yetkililere iletilmiştir.`)
    message.channel.send(embed2)
bot.channels.cache.get("833960545001930812").send(embed).then(message => {
  message.react('✅')
  message.react('❎')
  });
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hatabildir', 'bugreport', 'bugbildir', 'hata', 'bug'],
  permLevel: 0  
};
exports.help = {
  name: 'bug-bildir',
  description: 'Botla ilgili hataları bildirirsiniz.',
  usage: 'bug-bildir'
}