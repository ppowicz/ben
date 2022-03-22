require("dotenv").config()
const Discord = require("discord.js")

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  setPresence()
})

client.on("message", msg => {
  let msgArgs = msg.content.split(" ")
  if (msgArgs.includes("ben")) {
    ben(msg)
  } else if (msgArgs.includes("doxx")) {
    if (Array.from(msg.mentions.users).length != 0) {
      if (msg.content.includes("<@!955597739104825455>")) {
        msg.channel.send("what")
        return
      }
      ip(msg)
    } else {
      msg.channel.send("who")
    }
  }
})


const responses = ["yes", "no", "ughh", "hohoho"]

function ben(msg) {
  msg.channel.send(responses[Math.floor(Math.random() * responses.length)])
}

function ip(msg) {
  msg.channel.send(Math.floor(Math.random() * 254 + 1) + "." + Math.floor(Math.random() * 254 + 1) + "." + Math.floor(Math.random() * 254 + 1) + "." + Math.floor(Math.random() * 254 + 1))
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