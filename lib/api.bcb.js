const axios = require('axios')

const getUrl = dataDia => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${dataDia}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = url => axios.get(url)
const getValorDolar = res => res.data.value[0].cotacaoVenda

const getToday = () => {
    const today = new Date()
    return (today.getMonth()+1) +'-'+ today.getDate() +'-'+ today.getFullYear() 
}

const getCotacao = ({ getToday, getUrl, getCotacaoAPI, getValorDolar }) => async() => {
    try {
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)
        const dolarHoje = getValorDolar(res)
        return dolarHoje
    } catch (err) {
        return ''
    }
}

module.exports = {
    getCotacaoAPI,
    getValorDolar,
    getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, getValorDolar }),
    getUrl,
    getToday,
    pure: {
        getCotacao
    }
}



