const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
  console.log(`bot działa`);

  client.user.setActivity(config.activity.text, { type: config.activity.status });
});

// POWITANIA

client.on('guildMemberAdd', (member) => {
  const channelId = config.kanalpowitania;
  const channel = member.guild.channels.cache.get(channelId);

  if (!channel) return;

  const memberCount = member.guild.memberCount;

  const embed = new Discord.MessageEmbed()
  .setColor(config.kolorservera)
  .setAuthor('Nowy Użytkownik', config.welcomeImage)
  .setDescription(`**Witamy** na serwerze **${config.servername}**, ${member}!  Cieszymy się, że z nami jesteś, mamy nadzieję że zostaniesz z nami na dłużej! Pamiętaj, aby zapoznać się z regulaminem serwera. Jesteś naszym  **${memberCount}** użytkownikiem!`)
  .setThumbnail(member.user.displayAvatarURL())
  .setTimestamp();
    

  channel.send(embed);
});


// NADANIE ROLI PRZY WEJSCIU

client.on('guildMemberAdd', member => {
  const roleId = config.autorola;
  const role = member.guild.roles.cache.find(role => role.id === roleId);
  if (role) member.roles.add(role);
});


// KOMENDA !RANGI

client.on('message', (message) => {
  if (message.content.startsWith('!rangi')) {
    const member = message.member;
    const roles = member.roles.cache.array();

    let rangiList = '';

    roles.forEach((role) => {
      if (role.name!== '@everyone') {
        rangiList += `${role.name}\n`;
      }
    });

    message.channel.send(`**Twoje Rangi:**\n${rangiList}`);
  }
});



// Chat Help

if (config.chathelp === 'yes') {
  client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.toLowerCase().includes('gangu')) {
      message.channel.send(`<@${message.author.id}> Szukasz gangu? Sprawdź kanał może znajdziesz coś na siebie <#1123254476539707460>`);
    }
  });

  client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.toLowerCase().includes('start')) {
      const currentDate = new Date();
      const dateString = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  
      message.channel.send({
        content: `<@${message.author.id}>`,
        embed: {
          author: {
            name: 'AUTO MODERATOR',
            icon_url: config.welcomeImage
          },
          description: "```Start serwera odbędzie się już XX.XX.XXXX```",
          color: config.kolorservera,
          footer: {
            text: `${dateString} - ${config.servername} - System`,
            icon_url: config.welcomeImage
          }
        }
      });
    }
  });

  client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.toLowerCase().includes('unbana')) {
      message.channel.send(`<@${message.author.id}> Chcesz się odwołać od bana? Zapoznaj się z wzrorem na kanale: <#1123254477059797142> i napisz odwołanie`);
    }
  });

  client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.toLowerCase().includes('sprawdzicie podanie')) {
      message.channel.send(`<@${message.author.id}> Podanie są sprawdzane co trzy dni`);
    }
  });
} else {
  console.log('Chat Help Został Wyłączony!');
}



client.login(config.token)