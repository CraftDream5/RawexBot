const Discord = require("discord.js");
const data = require("quick.db");

exports.run = async (client, message, args) => {
  const prefix =
    (await data.fetch(`prefix.${message.guild.id}`)) || 'r!';
  if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  const ad = await data.fetch(`numara.${message.channel.id}`);
  if (
    message.channel.name === `ticket-${ad}` ||
    message.channel.name === `closed-${ad}`
  ) {
    const ann = await data.fetch(
      `asd.${message.guild.id}.${message.channel.id}.${message.author.id}`
    );
    if (!ann) return message.channel.send(`Bu bilet senin değil.`);
    message.delete();

    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Bilet 8 saniye sonra ebediyen silinecek.`)
        .setTimestamp()
      .setFooter(`Rawex Ticket Sistemi`,client.user.avatarURL())
    );
    setTimeout(async () => {
      message.channel.delete();
      data.delete(
        `asd.${message.guild.id}.${message.channel.id}.${message.author.id}`
      );
    }, 8000);
  } else {
    return message.channel.send(`Bu komutu bir bilet kanalında kullanın.`);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "t-sil"
};
