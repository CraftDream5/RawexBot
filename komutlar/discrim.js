const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, msg, args) => {
       if (!msg.guild) return msg.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  if(args.length > 4) return msg.channel.send(new Discord.MessageEmbed().setTitle('Discrimler 4 Basamaklı Olur'))
      const discrim = args[0] || msg.author.discriminator;
        const users = client.users.cache.filter(user => user.discriminator === discrim).map(user => user.tag);
        if (users < 1) {
            if(isNaN(args[0])) return  msg.channel.send(new Discord.MessageEmbed().setDescription(`Bir Discrim Yazmalısın.`).setColor("RANDOM"));
            return msg.channel.send(new Discord.MessageEmbed().setDescription(`${discrim} Bulunamadı!`).setColor("RANDOM"));
          
        } else {
           msg.channel.send(`Kullanıcı: ${users.join('\nKullanıcı: ')}`, {split: true, code: "yaml"})       
}
}

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: [],
        permLevel: 0,
    };
      
    exports.help = {
        name: 'discrim',
        description: '',
        usage: 'discrim',
    
    };//NONAME.JS