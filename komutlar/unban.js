const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("⛔ Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısınız.").then(msg => msg.delete({timeout:100000}))

 var guild = message.guild;
 var banlayan = message.author.tag;
 var kisi = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
 if(!kisi) return message.reply("Banını Açacağım Kişiyi Belirtmen Gerekiyor. `ID`")
 //var gun = args.slice(1).join(' ') ? `${args.slice(1).join(' ')}` :"";
 var neden = args.slice(1).join(' ') 
 let banxx = await message.guild.fetchBans();

if (!banxx.get(kisi.id)) return message.reply(":x: Kişi Yasaklanmamış")

if(neden) {

  await message.channel.send(`${kisi.tag} adlı kullanıcının banı açıldı. \nNedeni: **${neden}**`)
  await guild.members.unban(kisi.id, neden);

} else {

    await message.channel.send(`${kisi.tag} adlı kullanıcının banı açıldı.`)
    await guild.members.unban(kisi.id, neden);


}




};


exports.conf = {
    enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'unban',
  description: 'Botun Pingini Gösterir !',
  usage: 'unban'
};