
export const filterAssets = (data,keyType,key) =>{
    const result = data.filter(item=>item[key]===(keyType))
    if(result.length===0){
        return data
    }else{
        return result

    }
}

export const filterCommonStocksOthers = (data,keyType,key) =>{
    const result = data.filter(item=>item[key]!=='crypto')
    if(result.length===0){
        return data
    }else{
        return result

    }
}

export const getCategories = (data) =>{
    let category = []
    
    
    data.forEach(item=>{
        let isInCat = false
        for (let index = 0; index < category.length; index++) {
            if(item.typeOfAsset===category[index]){
                isInCat = true
            }
        }
        if(!isInCat){
           category.push(item.typeOfAsset)
        }
    })
    return category
}

export const categoriesDistribution = (data,categories,percent=false) =>{
    let result = []
    categories.forEach(item=>{
        
        const catRes =  data.reduce((acc,dataItem) =>{
            if(item===dataItem.typeOfAsset){
                return acc = acc + (dataItem.numOfShares*dataItem.price)
            }else{
                return acc
            }
        },0)        
        result[item]=catRes
    })

    let percentResult = []
    const total = balanceCalculations(data,'price')


    categories.forEach(item=>{
        let percentValue = roundNum(result[item]*100/total)

        percentResult[item]= String(percentValue)
    })

    if(percent){
        return percentResult
    }else{
        return roundNum(result)
    }
 
}



export const uniqueArrayElements = (data) =>{
    let uniqueObjArray = [...new Map(data.map((item) => [item["name"], item])).values()];
    return uniqueObjArray
}


export const calculateValue = (data) =>{
    let finalArray = {}
    data.forEach(item=>{
        if(!(item.name in finalArray)){
        const filter = filterAssets(data,item.ticker,'ticker')
        const reduced = filter.reduce((acc,item)=>{
            return acc = acc + (item.numOfShares*item.price)
        },0)

        finalArray[item.ticker]=reduced
        }
    })

    return finalArray
}

export const balanceCalculations = (data,elementToCalculate) =>{
    const result = data.reduce((acc,item)=>{
        return acc = acc + parseFloat(item[elementToCalculate]*item.numOfShares)
    },0)
    return result
}

export const roundNum = (number) =>{
    const value = (Math.round(number * 100) / 100)
    return value
}

export const prepareDataToGraph = (data) =>{
    let dat=[]
    let lab=[]
        data.forEach(item=>{   
        dat.unshift(item.close)
        lab.unshift(item.datetime)
    })
    return [dat,lab]  
}

export const graphDataTrend = (data) =>{
    const initial = data[0][0]
    const final = data[0][data[0].length-1]
    if(final>initial){
        return 'positive'
    }else{
        return 'negative'
    }
}

export const dummyData = [
    {
    id:1,
    name:'Twitter',
    ticker:'TWTR',
    numOfShares:20,
    entryPrice:39,
    typeOfAsset:'stock',
    date: 'date',
    price:49
    },
    {
    id:2,
    name:'Twitter',
    ticker:'TWTR',
    numOfShares:50,
    entryPrice:20,
    typeOfAsset:'stock',
    date: 'date',
    price:49
    },
    {
    id:3,
    name:'Apple',
    ticker:'AAPL',
    numOfShares:30,
    entryPrice:109,
    typeOfAsset:'stock',
    date: 'date',
    price:49
    },
    {
    id:4,
    name:'Mana',
    ticker:'MANA/USD',
    numOfShares:30,
    entryPrice:1.5,
    typeOfAsset:'crypto',
    date: 'date',
    price:1.05
    },
    {
    id:5,
    name:'SPY ETF',
    ticker:'SPY',
    numOfShares:30,
    entryPrice:400,
    typeOfAsset:'stock',
    date: 'date',
    price:500
    },
    
]

export const dummy2 = {
'data':[
        {
            "id": "62826defe4da368a8242d2bd",
            "name": "Twitter",
            "ticker": "TWTR",
            "numOfShares": 2,
            "entryPrice": 40,
            "typeOfAsset": "stock",
            "date": "2022-05-16T15:29:51.578Z",
            "price": "36.86000"
        },
        {
            "id": "6285926d2ba567d2dd1e3f80",
            "name": "Mana",
            "ticker": "Mana/USD",
            "numOfShares": 15,
            "entryPrice": 1.19,
            "typeOfAsset": "crypto",
            "date": "2022-05-19T00:42:21.769Z",
            "price": "1.04320"
        },
        {
            "id": "6285941789548a7b1ce7166e",
            "name": "Apple",
            "ticker": "aapl",
            "numOfShares": 7,
            "entryPrice": 200,
            "typeOfAsset": "stock",
            "date": "2022-05-19T00:49:27.961Z",
            "price": "140.82001"
        },
        {
            "id": "6285942d85dde29b0ddd9111",
            "name": "Mana",
            "ticker": "Mana/USD",
            "numOfShares": 15,
            "entryPrice": 1.19,
            "typeOfAsset": "crypto",
            "date": "2022-05-19T00:49:49.197Z",
            "price": "1.04320"
        }
    ],
"histData": {
    "Mana/USD": {
        "meta": {
            "symbol": "MANA/USD",
            "interval": "1h",
            "currency_base": "Decentraland",
            "currency_quote": "US Dollar",
            "exchange": "Binance",
            "type": "Digital Currency"
        },
        "values": [
            {
                "datetime": "2022-05-19 01:00:00",
                "open": "1.03520",
                "high": "1.04340",
                "low": "1.03520",
                "close": "1.04320"
            },
            {
                "datetime": "2022-05-19 00:00:00",
                "open": "1.04190",
                "high": "1.05340",
                "low": "1.02990",
                "close": "1.03500"
            },
            {
                "datetime": "2022-05-18 23:00:00",
                "open": "1.06290",
                "high": "1.06730",
                "low": "1.03060",
                "close": "1.03380"
            },
            {
                "datetime": "2022-05-18 22:00:00",
                "open": "1.06020",
                "high": "1.07190",
                "low": "1.05590",
                "close": "1.06080"
            },
            {
                "datetime": "2022-05-18 21:00:00",
                "open": "1.07000",
                "high": "1.07290",
                "low": "1.05580",
                "close": "1.05990"
            },
            {
                "datetime": "2022-05-18 20:00:00",
                "open": "1.07250",
                "high": "1.07420",
                "low": "1.05760",
                "close": "1.06890"
            },
            {
                "datetime": "2022-05-18 19:00:00",
                "open": "1.06060",
                "high": "1.07760",
                "low": "1.06060",
                "close": "1.07400"
            },
            {
                "datetime": "2022-05-18 18:00:00",
                "open": "1.05050",
                "high": "1.06570",
                "low": "1.04610",
                "close": "1.05980"
            }
        ],
        "status": "ok"
    },
    "TWTR": {
        "meta": {
            "symbol": "TWTR",
            "interval": "1h",
            "currency": "USD",
            "exchange_timezone": "America/New_York",
            "exchange": "NYSE",
            "mic_code": "XNYS",
            "type": "Common Stock"
        },
        "values": [
            {
                "datetime": "2022-05-18 15:30:00",
                "open": "36.81000",
                "high": "37.00000",
                "low": "36.73500",
                "close": "36.86000",
                "volume": "2615419"
            },
            {
                "datetime": "2022-05-18 14:30:00",
                "open": "36.85500",
                "high": "37.02500",
                "low": "36.69000",
                "close": "36.80500",
                "volume": "1913396"
            },
            {
                "datetime": "2022-05-18 13:30:00",
                "open": "37.01000",
                "high": "37.03000",
                "low": "36.57500",
                "close": "36.85880",
                "volume": "2521107"
            },
            {
                "datetime": "2022-05-18 12:30:00",
                "open": "37.08820",
                "high": "37.30000",
                "low": "36.87000",
                "close": "37.01000",
                "volume": "1990978"
            },
            {
                "datetime": "2022-05-18 11:30:00",
                "open": "37.22600",
                "high": "37.33000",
                "low": "37.05500",
                "close": "37.08500",
                "volume": "2527070"
            },
            {
                "datetime": "2022-05-18 10:30:00",
                "open": "37.75500",
                "high": "38.07000",
                "low": "37.18270",
                "close": "37.21990",
                "volume": "3067556"
            },
            {
                "datetime": "2022-05-18 09:30:00",
                "open": "37.42000",
                "high": "38.72000",
                "low": "37.36800",
                "close": "37.75500",
                "volume": "7028601"
            },
            {
                "datetime": "2022-05-17 15:30:00",
                "open": "38.55500",
                "high": "38.62000",
                "low": "38.17000",
                "close": "38.30000",
                "volume": "2708207"
            }
        ],
        "status": "ok"
    },
    "aapl": {
        "meta": {
            "symbol": "AAPL",
            "interval": "1h",
            "currency": "USD",
            "exchange_timezone": "America/New_York",
            "exchange": "NASDAQ",
            "mic_code": "XNGS",
            "type": "Common Stock"
        },
        "values": [
            {
                "datetime": "2022-05-18 15:30:00",
                "open": "140.57001",
                "high": "141.20000",
                "low": "140.21001",
                "close": "140.82001",
                "volume": "14084904"
            },
            {
                "datetime": "2022-05-18 14:30:00",
                "open": "141.16000",
                "high": "141.33000",
                "low": "139.89999",
                "close": "140.56000",
                "volume": "15639808"
            },
            {
                "datetime": "2022-05-18 13:30:00",
                "open": "142.03000",
                "high": "142.37000",
                "low": "141.08000",
                "close": "141.17000",
                "volume": "11839356"
            },
            {
                "datetime": "2022-05-18 12:30:00",
                "open": "142.52000",
                "high": "143.69000",
                "low": "141.94000",
                "close": "142.03500",
                "volume": "10160730"
            },
            {
                "datetime": "2022-05-18 11:30:00",
                "open": "143.43500",
                "high": "144.14000",
                "low": "142.14000",
                "close": "142.52000",
                "volume": "12041489"
            },
            {
                "datetime": "2022-05-18 10:30:00",
                "open": "145.60001",
                "high": "145.69000",
                "low": "143.37000",
                "close": "143.44901",
                "volume": "13763246"
            },
            {
                "datetime": "2022-05-18 09:30:00",
                "open": "146.85001",
                "high": "147.36011",
                "low": "145.59000",
                "close": "145.59000",
                "volume": "17857603"
            },
            {
                "datetime": "2022-05-17 15:30:00",
                "open": "149.50000",
                "high": "149.63000",
                "low": "148.78999",
                "close": "149.25000",
                "volume": "7579110"
            }
        ],
        "status": "ok"
    }
}
}


