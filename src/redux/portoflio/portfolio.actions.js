import portfolioActionTypes from "./portfolio.types";
import { removeStockFetch,addStockFetch,editStockFetch,findStock } from "../../api/api";

export const fetchPortfolioStart =() =>{
    return{
        type:portfolioActionTypes.FETCH_PORTFOLIO_START
    }
}

export const fetchPortfolioSuccess =(value) =>{
    return{
        type:portfolioActionTypes.FETCH_PORTFOLIO_SUCCESS,
        payload:value
    }
}

export const fetchPortfolioFailure =() =>{
    return{
        type:portfolioActionTypes.FETCH_PORTFOLIO_FAILURE,
    }
}

export const togglePortfolio = () =>{
    return{
        type:portfolioActionTypes.TOGGLE_PORTFOLIO
    }
}

export const toggleAddToPortfolio = () =>{
    return{
        type:portfolioActionTypes.TOGGLE_ADD_TO_PORTFOLIO
    }
}

export const fetchPortfolioAsync = () => async (dispatch) =>{
    try {
        dispatch(fetchPortfolioStart())
        const result = await findStock()
        dispatch(fetchPortfolioSuccess(result.data))
        
    } catch (error) {
        dispatch(fetchPortfolioFailure())
        console.log(error)
    }
}




export const removeStockCompletely = (ids) =>{
    return {
        type:portfolioActionTypes.REMOVE_STOCK_COMPLETELY,
        payload:ids
    }
}

export const removeStockCompletelyAsync = (ids) => async (dispatch) =>{
    try {
        const result = await removeStockFetch(ids)
        dispatch(removeStockCompletely(result))
    } catch (error) {
        console.log(error.message)
    }
}

export const removeStockPosition = (id) =>{
    return {
        type:portfolioActionTypes.REMOVE_STOCK_POSITION,
        payload:id
    }
}

export const removeStockPositionAsync = (id) => async (dispatch) =>{
    try {
        removeStockFetch(id)
        dispatch(removeStockPosition(id))
    } catch (error) {
        console.log(error.message)
    }
}



export const editStock = (id,changeData) =>{
    return {
        type:portfolioActionTypes.EDIT_STOCK,
        payload:[id,changeData]
    }
}

export const editStockAsync = (id,changeData) => async (dispatch) =>{
    try {
        await editStockFetch(id,changeData)
        dispatch(editStock(id,changeData))
    } catch (error) {
        console.log(error.message)
    }
}



export const addStock = (data) =>{
    return {
        type:portfolioActionTypes.ADD_STOCK,
        payload:data
    }
}

export const addStockAsync = (info) => async (dispatch) =>{
    try {
        const data = await addStockFetch(info)
        dispatch(addStock(data))
    } catch (error) {
        console.log(error.message)
    }
}