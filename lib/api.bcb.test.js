const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')



test('getcotacaoAPI', () => {
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
        console.log(axios.get.mock)
    })
})



/*     
getCotacaoAPI,
getValorDolar,
getCotacao 
*/