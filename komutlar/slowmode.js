const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("⛔ Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısınız.").then(msg => msg.delete({timeout:100000}))
      if (!args[0])
      return message.channel.send(`Ayarlamam için bir sayı yazmalısın.`)
  if (args[0] > 1000) return message.channel.send("Yavaşmod en fazla 1000 olabilir.")
    if (isNaN(args[0])) return message.channel.send(`Bu bir sayı değil.`);
    let reason = "Yavaş Mod"
    message.channel.setRateLimitPerUser(args[0], reason);
    message.channel.send(`Artık üyeler bu kanala **${args[0]}** saniyede bir mesaj yazılabilecek.`);
};
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["slow-mode", "slowmode", "yavas-mod", 'yavasmod', 'yavaşmod'],
  permLevel: 0
};

exports.help = {
 name: 'yavaş-mod',
  description: 'Sohbete yazma sınır (süre) ekler.',
  usage: 'yavaş-mod [1/1000]',
};