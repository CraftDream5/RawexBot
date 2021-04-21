const Discord = require('discord.js');

exports.run = async(client, message, args) => {
    if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  message.channel.send(new Discord.MessageEmbed().setDescription(`
  **:small_orange_diamond: Toplam Komut (53)**
  
  **:green_square: Bot (5)**
   \`istatistik\`, \`davet\`, \`ping\`, \`öneri\`, \`hatabildir\`
   
  **:white_large_square: Moderasyon (13)**
   \`duyuru\`, \`isim\`, \`sil\`, \`yavaşmod\`, \`emojiekle\`, \`ban\`, \`unban\`, \`banlist\`, \`oylama\`, \`ayarlar\`, \`say\`, \`rol-al\`, \`rol-ver\`
  
  **:blue_square: Kullanıcı (6)**
   \`yetkilerim\`, \`sunucubilgi\`, \`sunucupp\`, \`kullanıcıbilgi\`, \`avatar\`, \`afk\`
   
  **:yellow_square: Sistem vb. (5)**
  **• BotList (5)**
   \`botekle\`,  \`botlist\`,  \`onayla\`,  \`reddet\`,  \`botekle\`   
  **• Sayaç (2)**
   \`sayaç\`,  \`sayaç-kanal\`
  **• Hg - Bb (2)**
   \`hg-bb-ayarla\`,  \`hg-bb-sıfırla\`
  **• İnvite (6)**
   \`invite-log\`, \`invite-text\`,  \`invites\`,  \`who-invited\`,  \`remove\`,  \`add\`
  **• Ticket (5)**
   \`ticket gönder\`, \`t-sil\`,  \`t-kapat\`,  \`ticket-kanal\`,  \`t-aç\`
   
  
  **:orange_square: Ayarlamalı (4)**
   \`reklam-engel\`, \`küfür-engel\`, \`caps-engel\`, \`sa-as\`
  
  **:brown_square: Eğlence (2)**
   \`golat\`, \`fakemesaj\`
  
  **:small_blue_diamond: Diğer (1)**
   \`sunucutanıt\`
  
  **:link: Linkler**
  • **[Davet](https://discordapp.com/oauth2/authorize?client_id=` + client.user.id + `&scope=bot&permissions=8)** • **[Destek Sunucusu](https://discord.gg/nTuSYZ9xj5)** • **~~[Sponsor]~~** • **[Oy Link](https://hlist.tk/bot/829726279459668069/vote)** • 
  `).setTimestamp())
};
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['y'],
  permLevel: 0
};

exports.help = {
 name: 'yardım',
  description: 'Sohbete yazma sınır (süre) ekler.',
  usage: 'yavaş-mod [1/1000]',
};