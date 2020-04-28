const axios = require('axios')

const dataDia = '04-32-2020'

const url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2704-27-2020%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao"

const url2 = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${dataDia}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

axios.get(url2)
     .then(res => console.log(res.data.value[0].cotacaoCompra))
     .catch( err => console.log(err))

/* const getCotacaoAPI = (data) => axios.get(url2)
const getValorDolarHoje = res => res.data.value[0].cotacaoVenda

const getCotacao = async() => {
    const res = await getCotacaoAPI(dataDia)
    const cotacao = getValorDolarHoje(res)
    console.log(cotacao)
    return cotacao
}

console.log(getCotacao())
console.log(getValorDolarHoje) */