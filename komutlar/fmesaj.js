const Discord = require('discord.js');

exports.run = async (client, message, args) => {//hamzamertakbaba#3361
    if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  if (message.deletable) await message.delete();
  
  let ÇekilecekKullanıcı = args[0] || message.mentions.users.first()
  if (!ÇekilecekKullanıcı) return message.channel.send(`${message.author} Bir üyeyi belirt. \`ID, Etiket\``).then(a => a.delete({timeout: 4500}));


  let YazılacakMesaj = args.slice(1).join(' ');
  if (!YazılacakMesaj) return message.channel.send(`${message.author} kullanıcı ne yazsın?`).then(a => a.delete({timeout: 4500}));
  
  if (YazılacakMesaj.includes("@everyone")) return message.channel.send(`${message.author} Everyone mu? Severiz, şaka şaka bir daha bunu yapma.`).then(a => a.delete({timeout: 4500}));
  if (YazılacakMesaj.includes("@here")) return message.channel.send(`${message.author} Here mi? Severiz, şaka şaka bir daha bunu yapma.`).then(a => a.delete({timeout: 4500}));
  
  let Kullanıcı = await client.users.fetch(ÇekilecekKullanıcı);
  try { 
  message.channel.createWebhook(Kullanıcı.username, {
      avatar: Kullanıcı.avatarURL()}) 
    .then(async (wb) => {
        const Webhook = new Discord.WebhookClient(wb.id, wb.token);
        await Webhook.send(YazılacakMesaj); 
        setTimeout(() => {
          Webhook.delete()
        }, 2000);
    })  
  } catch (err) {
    message.channel.send(err);
};
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fakemesaj'],
  permLevel: 0,
 
};

exports.help = {// codare ♥
  name: 'fake-mesaj',
};