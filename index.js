const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const sendMessage = require('./send-message')

client.on('ready', () => {
    console.log('The client is ready!')

    const guild = client.guilds.cache.get('865580387421913118')
    const channel = guild.channels.cache.get('865964283410120726')
  
    sendMessage(channel, 'hello world', 10)

    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong!')
    })
    command(client, 'servers',async (message) => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members`
            )
        })
    })
    command(client, 'ban', (message) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')
        ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`${tag} That user has been`)
            } else {
                message.channel.send(`${tag} Please specify someone to ban.`)
            }
        } else {
            message.channel.send(
                `${tag} You do not have permission to use this command.`
            )
        }
    })
    command(client, 'kick', (message) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${tag} That user has kicked`)
            } else {
                message.channel.send(`${tag} Please specify someone to kick.`)
            }
        } else {
            message.channel.send(
                `${tag} You do not have permission to use this command.`
            )
        }
    })
    command(client, 'serverinfo', (message) => {
        const { guild } = message

        const { name, region, memberCount, owner, afkTimeout, maximumMembers } = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()

            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields(
                {
                    name: 'Region',
                    value: region,
                },
                {
                    name: 'Members',
                    value: memberCount,
                },
                {
                    name: 'Owner',
                    value: owner.user.tag,
                },
                {
                    name: 'AFK Timeout',
                    value: afkTimeout / 60,
                }
                ,
                {
                    name: 'maximumMembers',
                    value: maximumMembers
                }

            )

        message.channel.send(embed)
    })
    command(client, 'help', (message) => {
        message.channel.send(`
    These are my supported commands:
    **!help** - Displays the help menu
    **!add <num1> <num2>** - Adds two numbers
    **!sub <num1> <num2>** - Subtracts two numbers
    `)
    })
    command(client, 'lsc', (message) => {
        message.channel.send(`

>>> 
***__These are the rules to follow :-__***
**
    you dont have to spam in this Discord Chanal

    You have to use slam words

    please during the exame plese don't send any message
    **
***
         OWENER
︻╦╤─    ︻╦╤─    ︻╦╤─    ︻╦╤─    ︻╦╤─

     NEEV LOKCHANDANI 
***
__
__


    `)
    })
    command(client, 'status', (message) => {
        const content = message.content.replace('!status ', '')
        // "!status hello world" -> "hello world"

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })
})

client.login(config.token)