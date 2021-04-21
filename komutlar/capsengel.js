const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
    if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`⛔ Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout:100000}))
  let acod = ["ayarla", "aç", "ac"];
  let kapare = ["kapat", "sıfırla", "sifirla"];
  let acikmi = await db.fetch(`${message.guild.id}.capsengel`);
  let aredembed = new Discord.MessageEmbed()
    .setColor("RED")

    .setTimestamp();
  if(!args[0]) return message.channel.send(`Bir seçenek belirtiniz, \`ayarla / sıfırla\``)
  
  if (acod.includes(args[0])) {
    if (!args[1]) {
      if (acikmi)
        return message.channel.send(
          aredembed.setDescription(
            ":x: CapsLock engelleme sitemi zaten açık bulunmakta!\nBir mesajdaki büyük harf oranı eğer mesajın `" +
              acikmi.yuzde +
              "` sinden daha fazla ise engelenecektir.\nEğerki bu oranı arttırmak veya azaltmak isterseniz `r!capsengel aç oran` **(Oran 101 den küçük, 0 dan büyük bir sayı olmalıdır!)**\nEğer CapsLock Engelleme sistemini kapatmak isterseniz `r!capsengel sıfırla` komutunu kullanabilirsiniz."
          )
        );
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("GREEN")

          .setDescription(
            "CapsLock engelleme sistemi başarıyla açıldı!\nBir mesajdaki büyük harf oranı eğer mesajın `50%` sinden daha fazla ise engelenecektir.\nEğerki bu oranı arttırmak veya azaltmak isterseniz `r!capsengel aç oran` **(Oran 101 den küçük, 0 dan büyük bir sayı olmalıdır!)**\nEğer CapsLock Engelleme sistemini kapatmak isterseniz `r!capsengel sıfırla` komutunu kullanabilirsiniz."
          )

          .setTimestamp()
      );
      db.set(`${message.guild.id}.capsengel`, { yuzde: "50" });
    } else {
      if (isNaN(args[1]))
        return message.channel.send(
          aredembed.setDescription(
            "Oran yalnızca bir **sayı** olmalıdır. **(Oran 101 den küçük 0 dan büyük bir sayı olmalıdır!)**"
          )
        );
      if (args[1] >= 101)
        return message.channel.send(
          aredembed.setDescription(
            "**Oran 101 den küçük**, 0 dan büyük bir sayı olmalıdır!"
          )
        );
      if (args[1] <= 0)
        return message.channel.send(
          aredembed.setDescription(
            "Oran 101 den küçük, **0 dan büyük bir sayı olmalıdır**!"
          )
        );
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            "CapsLock engelleme sistemi başarıyla açıldı!\nBir mesajdaki büyük harf oranı eğer mesajın `" +
              args[1] +
              "%` sinden daha fazla ise engelenecektir.\nEğerki bu oranı arttırmak veya azaltmak isterseniz `r!capsengel aç oran` **(Oran 101 den küçük, 0 dan büyük bir sayı olmalıdır!)**\nEğer CapsLock Engelleme sistemini kapatmak isterseniz `r!capsengel sıfırla` komutunu kullanabilirsiniz.\nNot: Eğer oran yazmazsanız otomatik olarak 50% olarak ayarlanacaktır."
          )
          .setFooter(
            `Komut ${message.author.username} tarafından kullanıldı.`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
      );
      db.set(`${message.guild.id}.capsengel`, { yuzde: args[1] });
    }
  } else if (kapare.includes(args[0])) {
    if (!acikmi)
      return message.channel.send(
        aredembed.setDescription(
          "CapsLock engelleme sistemi zaten kapalı.\nEğer açmak isterseniz `r!capsengel aç oran` yazabilirsiniz. **(Oran 101 den küçük, 0 dan büyük bir sayı olmalıdır!)**\nNot: Eğer oran yazmazsanız otomatik olarak 50% olarak ayarlanacaktır."
        )
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setDescription(
          "CapsLock engelleme sistemi başarıyla kapatıldı!\nArtık mesajlardaki büyük harfler engellenmeyecek. \nEğer tekrar açmak isterseniz `r!capsengel aç oran` komutunu kullanabilirsiniz. **(Oran 101 den küçük, 0 dan büyük bir sayı olmalıdır!)**\nNot: Eğer oran yazmazsanız otomatik olarak 50% olarak ayarlanacaktır."
        )
        .setFooter(
          `Komut ${message.author.username} tarafından kullanıldı.`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
    );
    db.delete(`${message.guild.id}.capsengel`);
  } else {
    let acikkk;
    if (acikmi)
      acikkk = `${acikmi.yuzde}% olarak Açık**\nEğer kapatmak isterseniz \`r!capsengel sıfırla\` yazabilirsiniz.`;
    let kodare = new Discord.MessageEmbed()
      .setColor("#728bd6")
      .setDescription(
        "CapsLock engelleme sistemi şu anda **" +
          (acikkk
            ? acikkk
            : "Kapalı**\nEğer açmak isterseniz `r!capsengel aç` yazabilirsiniz.") +
          "."
      )

      .setTimestamp();
    message.channel.send(kodare)
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["caps-engel"],
  permLevel: 0,
};
exports.help = {
  name: "capsengel",
  description:"Eğer açılırsa bir mesajda belirttiğiniz %de kadar harf büyük yazılmışsa o mesaj silinir.",
  usage: "capsengel aç/sıfırla oran (Oran 101 den küçük, 0 dan büyük bir sayı olmalıdır!)"
};