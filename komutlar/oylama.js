const CodAre = require('discord.js');

 exports.run = (client, message, args) => {
  if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
if (!message.member.hasPermission("MANAGE_GUILD"))
return message.channel.send("⛔ Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısınız.").then(msg => msg.delete({timeout:100000}))
   message.delete();

   let emirhan = args.join(' ');

   if (!emirhan) {
const codare = new CodAre.MessageEmbed()
.setAuthor(message.author.username)
.setDescription(`Lütfen bir yazı belirtin!`)
      .setTimestamp()
message.channel.send(codare)
   }


if(emirhan) { message.channel.send(new CodAre.MessageEmbed()
  .setColor("BLUE")
                          .setTimestamp()
.setFooter(`Oylama`)
.setDescription(`**${emirhan}**`)).then(function(tanersins) {
tanersins.react('✅');
tanersins.react('❌');
})

     
 
 }
 };
     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: ['anket'],
      permLevel: 0
};

exports.help = {
  name: 'oylama',
  description: 'Sunucuda oylama yaparsınız',
  usage: 'oylama '
};