const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')



test('getCotacaoAPI', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 5.57 }
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    api.getCotacaoAPI('url').then( resp => {
        expect(resp).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })
})

test('getValorDolar', () => {
    const cotacao = api.getValorDolar({
        data: {
            value: [
                { cotacaoVenda: 5.57 }
            ]
        }
    })
    expect(cotacao).toBe(5.57)
})

describe('getToday', () => {

    const RealDate = Date

    function mockDate(date){
        global.Date = class extends RealDate{
            constructor(){
                return new RealDate(date)
            }
        }
    }

    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2020-04-28T10:00:00z')
        const today = api.getToday()
        expect(today).toBe('4-28-2020')
    })
})

test('getUrl', () => {
    const url = api.getUrl('MINHA-URL')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-URL%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
    // console.log(url)
})

test('getCotacao', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 5.57 }
            ]
        }
    }

    const getToday = jest.fn()
    getToday.mockReturnValue('04-28-2020')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockResolvedValue(res)

    const getValorDolar = jest.fn()
    getValorDolar.mockReturnValue(5.57)

    api.pure
        .getCotacao({ getToday, getUrl, getCotacaoAPI, getValorDolar })()
        .then( res => {
            expect(res).toBe(5.57)
        })
})


test('getCotacao', () => {
    const res = {}

    const getToday = jest.fn()
    getToday.mockReturnValue('04-28-2020')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockReturnValue(Promise.reject('err'))

    const getValorDolar = jest.fn()
    getValorDolar.mockReturnValue(5.57)

    api.pure
        .getCotacao({ getToday, getUrl, getCotacaoAPI, getValorDolar })()
        .then( res => {
            expect(res).toBe('')
        })
})


/*     
getCotacaoAPI,
getValorDolar,
getCotacao 
*/