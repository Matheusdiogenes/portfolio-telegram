const dotenv = require('dotenv')
dotenv.config()
const { Telegraf } = require('telegraf')
const TOKEN = process.env.BOT_TOKEN

const { about } = require('./info/about')
const { social } = require('./info/social')
const { hardSkills } = require('./info/hardSkills')
const bot = new Telegraf(TOKEN)

const welcome = `Bem vindo ao meu portfólio aqui no Telegram.
Para me conhecer melhor basta clicar em um dos tópicos ou digitar alguma dessas palavras chaves a seguir.
\nPalavras chaves: Sobre, Contato, Hard Skills, Github`

bot.command('start', (ctx) => {
  ctx.telegram.sendMessage(ctx.message.chat.id, welcome, {
    reply_markup: {
      keyboard: [
        [
          { text: 'Sobre' },
          { text: 'Contato' },          
        ],
        [
          { text: 'Hard Skills' },
          { text: 'Github' }
        ],
        [
          { text: 'Atualizar Informações'}
        ]
      ],
      resize_keyboard: true,
      // one_time_keyboard: true
    }
  })

  
})

bot.hears('Atualizar Informações', ctx => {
  ctx.reply(`Para atualizar é preciso reiniciar o bot. \nPara isso, basta clicar aqui: /start \n`)
})

bot.hears('Hard Skills', ctx => {
  ctx.reply(`${hardSkills}`)
})

bot.hears('Sobre', ctx => {
  ctx.reply(`${about}`)
})

bot.hears('Contato', ctx => {
  ctx.reply(`${social}`)
})

bot.hears('Github', ctx => {
  const github = 'Github: github.com/Matheusdiogenes'
  ctx.reply(`${github}`)
})

bot.launch({
  webhook: {
    domain: process.env.DOMAIN,
    port: 3000 || process.env.PORT
  }
})
