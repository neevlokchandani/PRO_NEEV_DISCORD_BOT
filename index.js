const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()


const config = require('./config.json')
const command = require('./command')
const sendMessage = require('./send-message')

let date_ob = new Date();
const timm =date_ob

client.on('ready', () => {
    const guild = client.guilds.cache.get('865580387421913118')
    const channel = guild.channels.cache.get('865964283410120726')
    console.log(`${client.user.tag} is Online`)
    sendMessage(channel, 'hello world', 10)
    client.on('message', async (message) => {
        let ar2 = {[`>${message.author.tag}  ${timm.getHours()}:${timm.getMinutes()}:${timm.getSeconds()}  ${timm.getDate()}/${[timm.getMonth()+1]}/${timm.getTime()}`] : `${message.content}`}
        let ar1 = require(`./test.json`);

        ar1.push(ar2)
            fs.writeFile("test.json", JSON.stringify(ar1,null,4), err => {
                if (err) throw err; 
            });
            console.log(`> ${message.author.tag}  ${timm.getHours()}:${timm.getMinutes()}:${timm.getSeconds()}  ${timm.getDate()}/${[timm.getMonth()+1]}/${timm.getFullYear()-2000} :- ${message.content}`)
    })    
    command(client, 'cc', (message) => {
        fs.writeFile("test.json", JSON.stringify([]), err => {
            if (err) throw err; 
            console.log("%c> clear_test.json","color:red")
        });
    })
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