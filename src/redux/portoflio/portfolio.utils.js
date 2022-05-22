
export const removeFromPortfolio = (id,data) =>{
    let result = data
    for (let index = 0; index < id.length; index++) {
        let solution = result.filter(item => item._id != id[index])
        result = solution

    }
   return result
}

export const getIndex = (data) =>{
    let array =[]
    data.forEach(element => {
        array.push(element.id)
    });
    return array
}

export const editSpecificStock = (changeData,currentData) =>{
    const {entryPrice,numOfShares} = changeData[1]
    let idx = 0
    const idChange = changeData[0].toString()
    for (let index = 0; index < currentData.length; index++) {
        if(currentData[index]._id.toString()===idChange){
            idx = index
        }
    }
    
    if(entryPrice){
        currentData[idx].entryPrice = entryPrice
    }
    if(numOfShares){
        currentData[idx].numOfShares = numOfShares    
    }

    return currentData
}