const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
  if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("⛔ Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısınız.").then(msg => msg.delete({timeout:100000}))
    let prefix = ayarlar.prefix;
 
    let user = message.mentions.users.first()
    let member = message.guild.member(user)
    if(!user) return message.channel.send('Bir kullanıcı etiketle.')
    let isim = args.slice(1).join(" ")
    if(!isim) return message.channel.send('Bir İsim gir.')
    if(isim.lenght > 32) return message.channel.send('Lütfen 32 kelimeyi geçmicek şekilde isim giriniz.')

    member.setNickname(isim).then(message.channel.send(new Discord.MessageEmbed().setDescription(`${member} Adlı kişinin ismi başarıyla **${isim}** olarak değiştirildi.`).setTimestamp()))

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['nick',"isim","isim-değiştir"],
  permLevel: 0
};

exports.help = {
  name: 'isim-değiştir',
  description: '',
  usage: ''
};