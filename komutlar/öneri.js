const Discord = require('discord.js');

exports.run = async (bot, message, args, guild) => {
    if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
    let davet;
    if (message.channel.permissionsFor(bot.user).has("CREATE_INSTANT_INVITE")) {
        await message.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0, unique: false}).then(i => { davet = i.url });
    } else davet = 'Davet Linkini Alınamadı.';
    const tavsiye = args.join(" ").slice(0);
    const tavsiyeSahibi = message.author
    if(!tavsiye) return message.channel.send(new Discord.MessageEmbed().setDescription('Önerini girmedin! Doğru kullanım: `r!öneri `').setColor("RED"));
    if(tavsiye) return bot.channels.cache.get("833960545001930812").send(new Discord.MessageEmbed().setColor("GREEN").addField(`Bilgiler`, `ID: **${tavsiyeSahibi.id}**\nKullanıcı Adı: **${tavsiyeSahibi.tag}**`).addField(`Önerisi:`, `${tavsiye}`).setFooter(`Sende görüşünü belirtmek için alttaki emojilerden birine basabilirsin.`)).then(msg => {msg.react("✅").then(r => msg.react("❎")); 
    message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription('Tavsiyeniz başarıyla [sunucumuza](https://discord.gg/UVRHpGMdhr) gönderildi! ✅'));
})};


//codare
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "öneri",
  description: "Bota Tavsiye Önerirsiniz",
  usage: "tavsiye"
};