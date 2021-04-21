const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async(client, message, args) => {
 if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
 if (!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("⛔ Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine sahip olmalısınız.").then(msg => msg.delete({timeout:100000}))
  var devtr_kod_paylasim_the_best = args.slice(0).join(' ')
  if(devtr_kod_paylasim_the_best > 100) return message.channel.send("100'den fazla mesaj silemem")
  if (!devtr_kod_paylasim_the_best) return message.channel.send("Temizlemek istediğin mesaj sayısını gir!")
  if (isNaN(devtr_kod_paylasim_the_best)) return message.channel.send("Sayının içinde harf 🤨!")
  
  let fetched = await message.channel.messages.fetch({limit: args[0]})
  
  message.channel.bulkDelete(fetched)
  .catch(error => message.channel.send("`14` günden önceki mesajları silemem!"))
  
  message.channel.send(`:recycle: ${args[0]} adet mesaj Geri Dönüşüme Atıldı :recycle: `).then(msg => msg.delete({ timeout: 8000, reason: 'mesaj silme' }))
  
    message.delete();
    
}
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["sil"],
  permLevel: 0
};
exports.help = {
  name: 'temizle',
};