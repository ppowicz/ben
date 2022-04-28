require("dotenv").config()
const Discord = require("discord.js")
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice")

const client = new Discord.Client({ intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
  ] 
})

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  setPresence()
})

client.on("messageCreate", msg => {
  let msgArgs = msg.content.toLowerCase().split(" ")
  if (msgArgs.includes("doxx")) {
    doxx(msg)
    return
  }

  if (msgArgs.includes("ben") || msgArgs.includes("ben?")) {
    if (msgArgs.includes("join")) {
      voiceJoin(msg)
      return
    } 
    if (msgArgs.includes("leave")) {
      voiceLeave(msg)
      return
    }

    ben(msg)
  }
})


const responses = ["yes", "no", "ughh", "hohoho"]

function ben(msg) {
  msg.channel.send(responses[Math.floor(Math.random() * responses.length)])
}

function random255() {
  return Math.floor(Math.random() * 254 + 1)
}

var doxxed = {}

function doxx(msg) {
  let mentions = Array.from(msg.mentions.users)

  if (mentions.length != 1) {
    msg.channel.send("who")
    return
  }

  let targetId = mentions[0][0]

  if (msg.content.includes(client.user.id)) {
    msg.channel.send("what")
    return
  }

  if (doxxed[targetId]) {
    msg.channel.send(doxxed[targetId])
    return
  }

  let ip = [random255(), random255(), random255(), random255()].join(".")
  doxxed[targetId] = ip
  msg.channel.send("`" + ip + "`")
}

var connection
const player = createAudioPlayer()

function voiceJoin(msg) {
  var voiceChannel = msg.member.voice.channel

  if (!voiceChannel) {
    msg.channel.send("no")
    return
  }

  if (voiceChannel.members.has(client.user.id)) {
    msg.channel.send("im already talking there")
    return
  }

  connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: msg.guild.id,
    adapterCreator: msg.guild.voiceAdapterCreator,
    selfDeaf: false
  })
  player.play(createAudioResource("./sounds/ben.mp3"))
  connection.subscribe(player)
}

function voiceLeave(msg) {
  try {
    connection.destroy()
  } catch {
    msg.channel.send("im not even talking")
  }
}

const dirthday = Date.parse("June 18, 2022")

function setPresence() {
  let now = Date.now()
  let timeUntilBirthday = dirthday - now
  let timeParseDays = Math.floor(timeUntilBirthday / 1000 / 60 / 60 / 24)
  client.user.setActivity(
    timeParseDays.toString() + "d till 18!",
    {
      type: "STREAMING",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  )
  console.log(new Date().toLocaleString().replace(',','') + " - updated presence")
}

setInterval(setPresence, 1000 * 60 * 60)

client.login(process.env.CLIENT_TOKEN)