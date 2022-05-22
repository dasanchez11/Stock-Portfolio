import mainContentActionTypes from "./mainContent.types";

export const activateSidebar = (value) =>{
    return {
        type:mainContentActionTypes.ACTIVATE_SIDEBAR,
        payload:value
    }
}

export const activateSpecificStock = (stock)=>{
    return{
        type:mainContentActionTypes.ACTIVATE_SPECIFIC_STOCK,
        payload:stock
    }
}

export const activateStockEdit = (stock) =>{
    return{
        type:mainContentActionTypes.ACTIVATE_STOCK_EDIT,
        payload:stock
    }
}

export const activateStockAdd = (stock) =>{
    return{
        type:mainContentActionTypes.ACTIVATE_STOCK_ADD,
        payload:stock
    }
}
