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
})



/*     
getCotacaoAPI,
getValorDolar,
getCotacao 
*/