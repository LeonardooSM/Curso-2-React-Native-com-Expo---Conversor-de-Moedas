const BASE_URL = "https://exchangerate-api.com/v4/latest"

export async function exchangeRateApi(fromCurrency){
    
    const response = await fetch(`${BASE_URL}/${fromCurrency}`)
    const data = await response.json()
    return data


}