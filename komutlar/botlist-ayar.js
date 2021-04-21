const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args)=> {
       if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`⛔ Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout:100000}))
	if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
                                          .setDescription(`
                                          Bir Seçenek Belirt!
                                          
**:small_blue_diamond: r!botlist dev-rol @rol**
**:small_blue_diamond: r!botlist dev-rol sıfırla**
**:small_blue_diamond: r!botlist bot-rol @rol**
**:small_blue_diamond: r!botlist bot-rol sıfırla**
**:small_blue_diamond: r!botlist logkanal #kanal**
**:small_blue_diamond: r!botlist logkanal sıfırla**
**:small_blue_diamond: r!botlist eklekanal #kanal**
**:small_blue_diamond: r!botlist eklekanal sıfırla**
**:small_blue_diamond: r!botlist yetkili-rol @rol**
**:small_blue_diamond: r!botlist yetkili-rol sıfırla**
**:small_blue_diamond: r!botlist aktif**
**:small_blue_diamond: r!botlist deaktif**
**:small_blue_diamond: r!botlist toplu-sıfırla**`)
                                          .setColor("BLACK")
                                          )
  if(args[0] === "eklekanal"){
    if(args[1] === "sıfırla"){
        if(!db.has(`bot-ekle_${message.guild.id}`)) return message.channel.send("Ayarlanmayan şeyi kapatmayı deneme!")
    db.delete(`bot-ekle_${message.guild.id}`)
    message.channel.send("Bot ekle kanalı başarıyla sıfırlandı!")
      }
    if(db.has(`bot-ekle_${message.guild.id}`)) return message.channel.send("Bu kanal zaten ayarlanmış. Sıfırlamak için **r!botlist eklekanal sıfırla**")
    let botekle = message.mentions.channels.first();
    if(!botekle) return message.channel.send("Lütfen kanal etiketleyin.")
    db.set(`bot-ekle_${message.guild.id}`, botekle.id)
    message.channel.send("Bot ekle kanalı başarıyla ayarlandı.")
  }
   if(args[0] === "logkanal"){
     if(args[1] === "sıfırla"){
        if(!db.has(`bot-log_${message.guild.id}`)) return message.channel.send("Ayarlanmayan şeyi kapatmayı deneme!")
    db.delete(`bot-log_${message.guild.id}`)
    message.channel.send("Bot log kanalı başarıyla sıfırlandı!")
      }
     if(db.has(`bot-log_${message.guild.id}`)) return message.channel.send("Bu kanal zaten ayarlanmış. Sıfırlamak için **r!botlist logkanal sıfırla**")
     let botlog = message.mentions.channels.first();
     if(!botlog) return message.channel.send("Lütfen kanal seçiniz.")
     db.set(`bot-log_${message.guild.id}`, botlog.id)
     message.channel.send("Bot log kanalı başarıyla ayarlandı.")
  }
   if(args[0] === "dev-rol"){
     if(args[1] === "sıfırla"){
        if(!db.has(`devrol_${message.guild.id}`)) return message.channel.send("Ayarlanmayan şeyi kapatmayı deneme!")
    db.delete(`devrol_${message.guild.id}`)
    message.channel.send("Developer rolü başarıyla sıfırlandı!")
      }
     if(db.has(`devrol_${message.guild.id}`)) return message.channel.send("Bu rol zaten ayarlanmış. Sıfırlamak için **r!botlist dev-rol sıfırla**")
     let basvurukanal = message.mentions.roles.first();
     if(!basvurukanal) return message.channel.send("Lütfen rol seçin.")
     db.set(`devrol_${message.guild.id}`, basvurukanal.id)
     message.channel.send("Developer rolü başarıyla ayarlandı")}
  if(args[0] === "yetkili-rol"){
    if(args[1] === "sıfırla"){
        if(!db.has(`byetkili_${message.guild.id}`)) return message.channel.send("Ayarlanmayan şeyi kapatmayı deneme!")
    db.delete(`byetkili_${message.guild.id}`)
    message.channel.send("Yetkili rolü başarıyla sıfırlandı!")
      }
    if(db.has(`byetkili_${message.guild.id}`)) return message.channel.send("Bu rol zaten ayarlanmış. Sıfırlamak için **r!botlist yetkili-rol sıfırla**")
    let yetkilirol = message.mentions.roles.first();
    if(!yetkilirol) return message.channel.send("Lütfen rol seçin.")
    db.set(`byetkili_${message.guild.id}`, yetkilirol.id)
    message.channel.send("Yetkili rolü başarıyla ayarlandı.")
    
  }
    if(args[0] === "bot-rol"){
      if(args[1] === "sıfırla"){
        if(!db.has(`botrol_${message.guild.id}`)) return message.channel.send("Ayarlanmayan şeyi kapatmayı deneme!")
    db.delete(`botrol_${message.guild.id}`)
    message.channel.send("Bot rolü başarıyla sıfırlandı!")
      }
    if(db.has(`botrol_${message.guild.id}`)) return message.channel.send("Bu rol zaten ayarlanmış. Sıfırlamak için **r!botlist bot-rol sıfırla**")
    let yetkilirol = message.mentions.roles.first();
    if(!yetkilirol) return message.channel.send("Lütfen rol seçin.")
    db.set(`botrol_${message.guild.id}`, yetkilirol.id)
    message.channel.send("Bot rolü başarıyla ayarlandı.")
  
  }

      if(args[0] === "aktif"){
    if(db.has(`baktif_${message.guild.id}`)) return message.channel.send("Zaten açılmış. Kapatmak için **r!botlist deaktif**")
    db.set(`baktif_${message.guild.id}`,"aktif")
    message.channel.send("BotList sistemi başarıyla açıldı!")
      
  }
        if(args[0] === "deaktif"){
    if(!db.has(`baktif_${message.guild.id}`)) return message.channel.send("Ayarlanmayan şeyi kapatmayı deneme!")
    db.delete(`baktif_${message.guild.id}`)
    message.channel.send("BotList sistemi başarıyla kapatıldı!")
      
  }
   if(args[0] === "toplu-sıfırla"){
     if(!db.has(`baktif_${message.guild.id}`)) return message.channel.send("Önceden ayarlanmamış.")
     if(!db.has(`bot-ekle_${message.guild.id}`)) return message.channel.send("Kanallar önceden ayarlanmamış.")
     if(!db.has(`bot-log_${message.guild.id}`)) return message.channel.send("Kanallar önceden ayarlanmamış.")
     if(!db.has(`devrol_${message.guild.id}`)) return message.channel.send("Kanallar önceden ayarlanmamış.")
     if(!db.has(`byetkili_${message.guild.id}`)) return message.channel.send("Roller önceden ayarlanmamış.")
      if(!db.has(`botrol_${message.guild.id}`)) return message.channel.send("Roller önceden ayarlanmamış.")
     db.delete(`baktif_${message.guild.id}`)
     db.delete(`devrol_${message.guild.id}`)
     db.delete(`bot-log_${message.guild.id}`)
     db.delete(`bot-ekle_${message.guild.id}`)
     db.delete(`byetkili_${message.guild.id}`)
     db.delete(`botrol_${message.guild.id}`)
     message.channel.send("Botlist ayarları toplu bir şekilde başarıyla sıfırlandı.")
     

   }

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
 name: 'botlist',
  description: 'Sohbete yazma sınır (süre) ekler.',
  usage: 'yavaş-mod [1/1000]',
};