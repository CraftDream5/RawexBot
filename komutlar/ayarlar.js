const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async(client, message, args) => {
  if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  
  let x;
  let x2;
  let x3;
  let x4;
  let x5; 
  let x6;
  let x7;
  
  if(db.has(`baktif_${message.guild.id}`)) x = "<:online:829727172075192340>";
  if(!db.has(`baktif_${message.guild.id}`)) x = "<:dnd:829727171982393375>";
  
  if(db.has(`reklam_${message.guild.id}`)) x2 = "<:online:829727172075192340>";
  if(!db.has(`reklam_${message.guild.id}`)) x2 = "<:dnd:829727171982393375>";
  
  if(db.has(`${message.guild.id}.capsengel`)) x3 = "<:online:829727172075192340>";
  if(!db.has(`${message.guild.id}.capsengel`)) x3 = "<:dnd:829727171982393375>";
  
  if(db.has(`sayac_${message.guild.id}`)) x4 = "<:online:829727172075192340>";
  if(!db.has(`sayac_${message.guild.id}`)) x4 = "<:dnd:829727171982393375>";
  
  if(db.has(`kufur_${message.guild.id}`)) x5 = "<:online:829727172075192340>";
  if(!db.has(`kufur_${message.guild.id}`)) x5 = "<:dnd:829727171982393375>";
  
  if(db.has(`ssaass_${message.guild.id}`)) x6 = "<:online:829727172075192340>";
  if(!db.has(`ssaass_${message.guild.id}`)) x6 = "<:dnd:829727171982393375>";
  
  if(db.has(`gçkanal_${message.guild.id}`)) x7 = "<:online:829727172075192340>";
  if(!db.has(`gçkanal_${message.guild.id}`)) x7 = "<:dnd:829727171982393375>";
  
  message.channel.send(new Discord.MessageEmbed().setDescription(`
  **• \`${message.guild.name}\` Sunucu Ayarları**
  
  • ReklamEngel = ${x2}
  • KüfürEngel = ${x5}
  • CapsEngel = ${x3}
  • Sa-As = ${x6}
  • BotList = ${x}
  • HG-BB = ${x7}
  • Sayaç = ${x4}
  
  `))
  
} 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [''],
  permLevel: 0
};

exports.help = {
 name: 'ayarlar',
  description: 'Sohbete yazma sınır (süre) ekler.',
  usage: 'yavaş-mod [1/1000]',
};