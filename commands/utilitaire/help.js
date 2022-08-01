const disbutpages = require("discord-embeds-pages-buttons")
const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons-fixed');


module.exports = {
    name: 'help',
    aliases: [],
    run: async (client, message, args, prefix, color) => {
      if(args[0] === "all") {

        const public = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(`Prefix : ${prefix} • ${client.config.name}`)
        .setTitle("Liste des commandes par permissions")
        .setDescription(`
**- __Public__**
- \`${client.config.prefix}banner [membre]\`
- \`${client.config.prefix}calc <calcul>\`
- \`${client.config.prefix}image <function>\`
- \`${client.config.prefix}invite [membre]\`
- \`${client.config.prefix}pic [membre]\`
- \`${client.config.prefix}porngif [functions]\` (*Salon nsfw*)
- \`${client.config.prefix}rank [membre]\`
- \`${client.config.prefix}snipe\`
- \`${client.config.prefix}top [invite/rank]\`
        `)
   
            let perm = ""
            message.member.roles.cache.forEach(role => {
                if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
                if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
            if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
            })
            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
           
                const mods = new Discord.MessageEmbed()
                .setColor(color)
                .setFooter(`Prefix : ${prefix} • ${client.config.name}`)
                .setTitle("Liste des commandes par permissions")
                .setDescription(`*Les commandes public sont aussi disponible pour la permissions Mods*
                
**- __Mods__**
- \`${client.config.prefix}addrole <membre> <rôle>\` (*Seulement les rôles sans permissions dangereuse*)        
- \`${client.config.prefix}banlist\`
- \`${client.config.prefix}lock [salon]\`
- \`${client.config.prefix}mute <membre> [temps/raison]\`
- \`${client.config.prefix}mutelist\`
- \`${client.config.prefix}unban <ID>\`
- \`${client.config.prefix}unlock [salon]\`
- \`${client.config.prefix}unmute <membre>\`
- \`${client.config.prefix}voice [info all/all]\`
- \`${client.config.prefix}warn [add/remove/clear/list]\`
                `)   

                const admin = new Discord.MessageEmbed()
                .setColor(color)
                .setFooter(`Prefix : ${prefix} • ${client.config.name}`)
                .setTitle("Liste des commandes par permissions")
                .setDescription(`*Les commandes disponible pour les permissions mods sont aussi disponible pour la permissions Admin*
                
**- __Admin__**
- \`${client.config.prefix}alladmin\`
- \`${client.config.prefix}allbot\`
- \`${client.config.prefix}allbotadmin\`
- \`${client.config.prefix}ban <membre> [temps/raison]\`
- \`${client.config.prefix}clear [message/membre]\`
- \`${client.config.prefix}embed\`
- \`${client.config.prefix}kick <membre> [raison]\`
- \`${client.config.prefix}muterole [rôle]\`
- \`${client.config.prefix}perm\`   
- \`${client.config.prefix}renew [salon]\`
- \`${client.config.prefix}say <message>\`
- \`${client.config.prefix}unmute <membre/all>\`
`)         

                const owner = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("Liste des commandes par permissions")
                .setDescription(`*Les commandes disponible pour les permissions admin sont aussi disponible pour la permissions Owner*
                
**- __Owner__**
- \`${client.config.prefix}counter\`
- \`${client.config.prefix}derank <membre>\`
- \`${client.config.prefix}emoji <add/remove> <emoji>\`
- \`${client.config.prefix}giveaway [reroll]\` 
- \`${client.config.prefix}leave\` 
- \`${client.config.prefix}levels\`
- \`${client.config.prefix}lock [salon/all]\`
- \`${client.config.prefix}logs\`
- \`${client.config.prefix}massrole <add/remove> <role>\`
- \`${client.config.prefix}renew [salon/all]\`
- \`${client.config.prefix}rolemenu\`
- \`${client.config.prefix}reward <invite/rank> <add/remove/list/clear>\`
- \`${client.config.prefix}setpp\`
- \`${client.config.prefix}setradio\`
- \`${client.config.prefix}tempvoc\`
- \`${client.config.prefix}unban <ID/all>\` 
- \`${client.config.prefix}unlock [salon/all]\`
- \`${client.config.prefix}welcome\`
                `)


                const owner2 = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("Liste des commandes par permissions")
                .setDescription(`*Les commandes disponible pour toute les permissions sont aussi disponible pour les personnes étant owner du bot*
                
**- __Owner bot__**
- \`${client.config.prefix}antiraid [config]\`
- \`${client.config.prefix}backup <serveur/emoji> <create/remove/list/clear>\`
- \`${client.config.prefix}blacklist <add/remove/clear/list>\`
- \`${client.config.prefix}blacklistrank <add/remove/clear/list>\`
- \`${client.config.prefix}owner [clear/list/add/remove <membre>]\` (*Seulement pour les vrais owners*)
- \`${client.config.prefix}perm [clear/set/del <perm> <rôle>]\` 
- \`${client.config.prefix}public <add/clear/list/remove>\` 
- \`${client.config.prefix}raidlog <on/off/salon>\`
- \`${client.config.prefix}server [list/leave/invite]\`
- \`${client.config.prefix}botconfig\`
- \`${client.config.prefix}wl [clear/list/add/remove <membre>]\` (*La whitlist ne donne aucune permissions sur le bot*)
                `)
                .setFooter(`Prefix : ${prefix} • ${client.config.name}`)

                const embedPages = [public, mods, admin, owner, owner2];
                ButtonPages(client.interaction, message, embedPages, 60 * 1000, "gray", "▶", "◀");
            }


      } else  if (!args[0]) {

            const util = new Discord.MessageEmbed()
            util.setColor(color)
            util.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
            util.setTitle("Utilitaire")
            util.setDescription("*Les paramètres entre **`<...>`** sont obligatoire, alors que les paramètres entre **`[...]`** eux sont facultatifs*")
            util.addField(`\`${prefix}alladmin\``, "Permet de voir tout les administrateurs présents sur le serveur")
            util.addField(`\`${prefix}allbot\``, "Permet de voir tout les bots présents sur le serveur")
            util.addField(`\`${prefix}allbotadmin\``, "Permet de voir tout les bots administrateurs présents sur le serveur")
            util.addField(`\`${prefix}banner [membre]\``, "Permet de voir la bannière d'un utilisateur")
            util.addField(`\`${prefix}calc <calcul>\``, "Permet de résoudre une équation en mathématique via le bot")
            util.addField(`\`${prefix}channelinfo [salon]\``, "Permet de d'avoir des informations sur un salon")
            util.addField(`\`${prefix}help\``, "Permet de voir la liste des commandes du bot")
            util.addField(`\`${prefix}help all\``, "Permet de voir les commandes du bot via les permissions")
            util.addField(`\`${prefix}image <fonctions>\``, "Permet de chercher une image sur google via le bot")
            util.addField(`\`${prefix}invite [membre]\``, "Permet de voir le nombre d'invtations que possède un utilisateur")
            util.addField(`\`${prefix}pic [membre]\``, "Permet de voir la photo de profil d'un utilisateur")
            util.addField(`\`${prefix}pornigf [fonctions]\``, "Permet de voir des images nsfw")
            util.addField(`\`${prefix}ping\``, "Permet de voir la latence du bot et du websocket en ms")
            util.addField(`\`${prefix}rank [membre]\``, "Permet de voir le rank d'un membres")
            util.addField(`\`${prefix}roleinfo <rôle>\``, "Permet de d'avoir des informations sur un rôle")
            util.addField(`\`${prefix}serverinfo [guild]\``, "Permet de d'avoir des informations sur un serveur où ce trouve le bot")
            util.addField(`\`${prefix}snipe\``, "Permet de voir le dernier message supprimés")
            util.addField(`\`${prefix}top [invite/rank]\``, "Permet de voir un classement sois d'invitations, sois de rank")
            util.addField(`\`${prefix}userinfo [user]\``, "Permet de d'avoir des informations sur un utilisateur")
            util.addField(`\`${prefix}voice [info all/all]\``, "Permet de voir des informations sur les les membres en vocal sur le serveur")


            const mods = new Discord.MessageEmbed()
            mods.setColor(color)
            mods.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
            mods.setTitle("Modération")
            mods.setDescription("*Les paramètres entre **`<...>`** sont obligatoire, alors que les paramètres entre **`[...]`** eux sont facultatifs*")
            mods.addField(`\`${prefix}addrole <membre> <rôle>\` (*Seulement les rôles sans permissions dangereuse*)`, "Permet de donner un rôle à un membre sur le serveur")
            mods.addField(`\`${prefix}ban <membre> [temps/raison]\``, "Permet de bannir un membre du serveur")
            mods.addField(`\`${prefix}banlist\``, "Permet de voir tout les membres bannis sur le serveur")
            mods.addField(`\`${prefix}clear [membre/message]\``, "Permet de supprimés des messages dans un salon")
            mods.addField(`\`${prefix}derank <membre>\``, "Permet d'enlever tout les rôles d'un membre")
            mods.addField(`\`${prefix}kick <membre> [raison]\``, "Permet d'expulser un membre du serveur")
            mods.addField(`\`${prefix}lock [salon]\``, "Permet de fermé un salon du serveur")
            mods.addField(`\`${prefix}lock all\``, "Permet de fermé tout les salons du serveur")
            mods.addField(`\`${prefix}mute <membre> [temps/raison]\``, "Permet de rendre muet un membre sur le serveur")
            mods.addField(`\`${prefix}mutelist\``, "Permet de voir les membres muet en direct")
            mods.addField(`\`${prefix}muterole [rôle]\``, "Permet de définir un rôle muet ou d'en crée un")
            mods.addField(`\`${prefix}renew [salon]\``, "Permet de recrée un salon du serveur")
            mods.addField(`\`${prefix}renew all\``, "Permet de recrée tout les salons du serveur")
            mods.addField(`\`${prefix}unban <membre>\``, "Permet de debannir un membre du serveur")
            mods.addField(`\`${prefix}unban all\``, "Permet de debannir tout les membres du serveur")
            mods.addField(`\`${prefix}unlock [salon]\``, "Permet d'ouvir un salon du serveur")
            mods.addField(`\`${prefix}unmute <membre>\``, "Permet de demuet un membre du serveur")
            mods.addField(`\`${prefix}unmute all\``, "Permet de demuet tout les membres muet sur le serveur")
            mods.addField(`\`${prefix}voice move\``, "Permet de move toute les personnes d'un salon vers un autre")
            mods.addField(`\`${prefix}voice move all\``, "Permet de move toute les personnes en vocal dans un salon")
            mods.addField(`\`${prefix}warn <add/remove/list/clear> <add/remove: membre> <remove: warnID>\``, "Permet de gérer les sanctions d'un membre")


            const gestion = new Discord.MessageEmbed()
            gestion.setColor(color)
            gestion.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
            gestion.setTitle("Serveur Gestion")
            gestion.setDescription("*Les paramètres entre **`<...>`** sont obligatoire, alors que les paramètres entre **`[...]`** eux sont facultatifs*")
            gestion.addField(`\`${prefix}antiraid\``, "Permet de gérer les modules d'antiraid sur le serveur")
            gestion.addField(`\`${prefix}counter\``, "Permet de gérer les compteurs personnalisés sur le serveur")
            gestion.addField(`\`${prefix}embed\``, "Permet de crée un embed personalisé")
            gestion.addField(`\`${prefix}emoji <add/remove> <emoji>\``, "Permet d'ajouté ou d'enlevé un emoji du serveur")
            gestion.addField(`\`${prefix}giveaway\``, "Permet de crée un giveaway")
            gestion.addField(`\`${prefix}giveaway reroll\``, "Permet de re choisir le gagnant d'un giveaway")
            gestion.addField(`\`${prefix}leave\``, "Permet de paramétrer les actions à effectuer quand un membre quitte le serveur")
            gestion.addField(`\`${prefix}levels\``, "Permet de paramétrer les actions à effectuer quand un membre gagne un niveau sur le serveur")
            gestion.addField(`\`${prefix}logs\``, "Permet de définir les salons de logs")
            gestion.addField(`\`${prefix}massrole <add/remove> <rôle>\``, "Permet d'ajouté ou d'enlevé un rôle à tout les membres du serveur")
            gestion.addField(`\`${prefix}perm\``, "Affiche la liste des rôles ayant des permissions sur le bot")
            gestion.addField(`\`${prefix}public <add/clear/list/remove> <add/remove: salon>\``, "Permet de gérer les salons où les commandes public sont autorisés")
            gestion.addField(`\`${prefix}prefix <prefix>\``, "Permet de changer le prefix du bot")
            gestion.addField(`\`${prefix}reward <invite/level> <add/clear/list/remove> <add/remove: rôle> <add: requis>\``, "Permet de gérer les rôles à récompense")
            gestion.addField(`\`${prefix}rolemenu\``, "Affiche un menu interactif pour créer ou modifier un reactionrole/boutonrole ")
            gestion.addField(`\`${prefix}raidlog <on/off/salon>\``, "Permet de définir le salon de raidlog")
            gestion.addField(`\`${prefix}say <message>\``, "Permet d'envoyer un message avec le bot")
            gestion.addField(`\`${prefix}setpp\``, "Permet d'envoyer automatiquement les photos de profils de membres aléatoires dans un salon ")
            gestion.addField(`\`${prefix}setradio\``, "Affiche un menu interactif pour lancer des bots radios sur le serveur")
            gestion.addField(`\`${prefix}soutien\``, "Permet de donner automatiquement un rôle aux membres ayant un message dans leurs statuts ")
            gestion.addField(`\`${prefix}tempvoc\``, "Affiche un menu interactif pour gérer les vocaux temporaires sur le serveur")
            gestion.addField(`\`${prefix}welcome\``, "Permet de paramétrer les actions à effectuer quand un membre rejoint le serveur")
            gestion.addField(`\`${prefix}whitelist <add/clear/list/remove>\``, "Permet de gérer les utilisateurs whitelist")
            gestion.addField(`\`${prefix}theme <color>\``, "Permet de changer la couleur d'embed du bot")

            const bot = new Discord.MessageEmbed()
            bot.setColor(color)
            bot.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
            bot.setTitle("Bot")
            bot.setDescription("*Les paramètres entre **`<...>`** sont obligatoire, alors que les paramètres entre **`[...]`** eux sont facultatifs*")
            bot.addField(`\`${prefix}backup <serveur/emoji> <clear/create/list/load/remove>> <2/3/4: code>\``, "Permet de gérer les backup sur le bot")
            bot.addField(`\`${prefix}blacklist <add/clear/list/remove> <add/remove: membre>\``, "Permet de gérer les utilisateurs blacklist")
            bot.addField(`\`${prefix}blacklistrank <add/clear/list/remove> <add/remove: membre>\``, "Permet de gérer les utilisateurs blacklistrank")
            bot.addField(`\`${prefix}custom <nom/list/delete> <delete: nom>\` (*Custom sur le Bot*)`, "Permet de gérer les commandes personaliser sur le bot")
            bot.addField(`\`${prefix}owner <add/clear/list/remove> <add/remove: membre>\``, "Permet de gérer les utilisateurs owners")
            bot.addField(`\`${prefix}server <invite/leave/list> <leave/invite: ID>\``, "Permet de gérer les serveurs où ce trouve le bot")
            bot.addField(`\`${prefix}botconfig\``, "Permet de gérer le profil du bot")
            bot.addField(`\`${prefix}whitelist <add/clear/list/remove> <add/remove: membre>\``, "Permet de gérer les utilisateurs whitelist")

            var pages = [util, mods, gestion, bot]

            disbutpages.pages(message, pages, {
                timeout: 60*1000,
                  buttons: {
                      delete: {
                          style: "grey",
                          emoji: "❌",
                          text: ""
                      },
                      forward: {
                          style: "grey",
                          emoji: "▶",
                          text: ""
                      },
                      backward: {
                          style: "grey",
                          emoji: "◀",
                          text: ""
                      }
                  },
                  extraRows: [],
                  extraPos: "below",
                  message: "",
                  ephemeral: "Vous ne possèdez pas accès à l'embed"
              })

        }



    }}
