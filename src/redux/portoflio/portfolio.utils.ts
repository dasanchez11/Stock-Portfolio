import { Stock } from "../mainContent/mainContent.types"
import { StockModify } from "../mainContent/mainContent.types"

export const removeFromPortfolio = (id:string[],data:Stock[]) =>{
    let result = data
    for (let index = 0; index < id.length; index++) {
        let solution = result.filter(item => item._id !== id[index])
        result = solution

    }
   return result
}

export const getIndex = (data:Stock[]):string[] =>{
    let array:string[]=[]
    data.forEach(element => {
        array.push(element._id)
    });
    return array
}

export const editSpecificStock = (changeData:[string,StockModify],currentData:Stock[]) =>{
    const {entryPrice,numOfShares} = changeData[1]
    let idx = 0
    const idChange = changeData[0].toString()
    for (let index = 0; index < currentData.length; index++) {
        if(currentData[index]._id.toString()===idChange){
            idx = index
        }
    }
    
    if(entryPrice){
        currentData[idx].entryPrice = +entryPrice
    }
    if(numOfShares){
        currentData[idx].numOfShares = +numOfShares    
    }

    return currentData
}