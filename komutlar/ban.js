const Discord = require('discord.js');


exports.run = async(client, message, args) => {

     if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  var guild = message.guild;
  var banlayan = message.author.tag;
  let banxx = await message.guild.fetchBans();
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("⛔ Bu komutu kullanabilmek için `Üyeleri Yasakla` yetkisine sahip olmalısınız.").then(msg => msg.delete({timeout:100000}))
 
  var kisi = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
  if(!kisi) return message.reply("Banlayacağım Kişiyi Belirtmen Gerekiyor, `ID / @kullanici / username`")
 var sebeb = args.slice(1).join(" ");


    if(message.author == kisi) return message.reply("Kendini Yasaklayamazsın!")
    if (banxx.get(kisi.id)) return message.reply(":x: Kişi Zaten Yasaklanmış!")

 var now = new Date()
 if (!sebeb) {
      
          kisi.send(`${kisi}, **${guild}** adlı sunucudan banlandınız.`)
          message.channel.send(`**${kisi} banlandı.**`)
          guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
        
 } else {

   kisi.send(`${kisi}, **${guild}** adlı sunucudan banlandınız. \nNedeni: **${sebeb}**`)
   message.channel.send(`**${kisi} banlandı. \nNedeni: ${sebeb}**`)
   guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
 

 }
};


exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Botun Pingini Gösterir !',
  usage: 'ban'
};