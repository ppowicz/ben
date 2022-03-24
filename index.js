require("dotenv").config()
const Discord = require("discord.js")

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  setPresence()
})

client.on("messageCreate", msg => {
  let msgArgs = msg.content.toLowerCase().split(" ")
  if (msgArgs.includes("ben") || msgArgs.includes("ben?")) {
    ben(msg)
  } else if (msgArgs.includes("doxx")) {
    doxx(msg)
  }
})


const responses = ["yes", "no", "ughh", "hohoho"]

function ben(msg) {
  msg.channel.send(responses[Math.floor(Math.random() * responses.length)])
}

var doxxed = {}

function random255() {
  return Math.floor(Math.random() * 254 + 1)
}

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
  msg.channel.send(ip)
}


function setPresence() {
  client.user.setActivity(
    "my talking ben",
    {
      type: "STREAMING",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  )
}

client.login(process.env.CLIENT_TOKEN)