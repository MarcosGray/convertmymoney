const express = require('express')
const app =  express()
const path = require('path')
const convert = require('./lib/convert')
const apiBCB = require('./lib/api.bcb')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res) => {
    const cotacao = await apiBCB.getCotacao()
    res.render('home', { cotacao })
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    const conversao = convert.convert(cotacao, quantidade)

    if (cotacao && quantidade) {
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao), 
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })        
    } else {
        res.render('cotacao', {
            error: 'Valores inválidos.'            
        })
    }
})

app.listen(3000, err => {
    if (err) {
        console.log('Erro ao iniciar o servidor.')
    } else {
        console.log('Servidor iniciado com sucesso.')
    }
})