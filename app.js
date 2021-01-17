const { Telegraf } = require('telegraf');
const covidApi = require('covid19-api');
const COUNTRIES_LIST = require('./countr')
const bot = new Telegraf("1587490289:AAHwEh9U8uf-CnO5WPvRieQGQULhenoG-qY")
bot.start( ctx => ctx.reply(`
    Привет ${ctx.from.first_name}! 
    Узнай статистику по Коронавирусу. 
    Введи страну на английском языке и получи статистику.
    Получить весь список стран можно по команде /help."
`))
bot.help( ctx => ctx.reply(COUNTRIES_LIST)) // список всіх країн англійською мовою
bot.on('text', async (ctx) => {
    try {
        const userText = ctx.message.text
        const covidData = await covidApi.getReportsByCountries(userText)
        const countryData = covidData[0][0]
        const formatData = `
            Страна: ${countryData.country},
            Случаи: ${countryData.cases},
            Смерти: ${countryData.deaths},
            Выздоровело: ${countryData.recovered}`
        ctx.reply(formatData)
    } catch(e) {
        ctx.reply('Такой страны не существует, для получения списка стран используй команду /help')
    }
})
bot.launch()