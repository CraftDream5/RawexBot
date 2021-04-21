const Discord = require('discord.js');

exports.run = (client, message, args) => {
     if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("⛔ Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine sahip olmalısınız.").then(msg => msg.delete({timeout:100000}))
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Duyuru Olarak Ne Yazacağım?');
  message.delete();

  message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Duyurdu; 
  
${mesaj}`).setTimestamp());
  message.channel.send("@everyone")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'duyuru',
  description: '',
  usage: ''
};