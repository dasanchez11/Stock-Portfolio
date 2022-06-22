import {PortfolioActionTypes} from "./portfolio.types";
import { removeStockFetch,addStockFetch,editStockFetch,findStock } from "../../api/api";
import { createAction } from "../redux.utils";
import { Dispatch,AnyAction } from "redux";
import {ActionWithPayload,Action} from '../redux.utils'
import {Stock,StockModify} from '../mainContent/mainContent.types'
import { HistData,AddStockAsyncData } from "./portfolio.types";


export type FetchPortfolioData = {
    data:Stock[];
    histData:HistData[];
}



// Portfolio Actions
export const fetchPortfolioStart = () => createAction(PortfolioActionTypes.FETCH_PORTFOLIO_START)
export const fetchPortfolioSuccess = (values:FetchPortfolioData) => createAction(PortfolioActionTypes.FETCH_PORTFOLIO_SUCCESS,values)
export const fetchPortfolioFailure = (error:Error) => createAction(PortfolioActionTypes.FETCH_PORTFOLIO_FAILURE,error)
export const togglePortfolio = () => createAction(PortfolioActionTypes.TOGGLE_PORTFOLIO)
export const toggleAddToPortfolio = () => createAction(PortfolioActionTypes.TOGGLE_ADD_TO_PORTFOLIO)

// Types
export type FetchPortfolioStart = Action<PortfolioActionTypes.FETCH_PORTFOLIO_START>
export type FetchPortfolioSuccess = ActionWithPayload<PortfolioActionTypes.FETCH_PORTFOLIO_SUCCESS,FetchPortfolioData>
export type FetchPortfolioFailure = ActionWithPayload<PortfolioActionTypes.FETCH_PORTFOLIO_FAILURE,Error>
export type TogglePortfolio = Action<PortfolioActionTypes.TOGGLE_PORTFOLIO>
export type ToggleAddToPortfolio = Action<PortfolioActionTypes.TOGGLE_ADD_TO_PORTFOLIO>

export type PortfolioFirstActions = FetchPortfolioStart|FetchPortfolioSuccess|FetchPortfolioFailure|TogglePortfolio|ToggleAddToPortfolio

// Portfolio Async
export const fetchPortfolioAsync = () => async (dispatch:Dispatch<AnyAction>) =>{
    try {
        dispatch(fetchPortfolioStart())
        const result = await findStock()
        dispatch(fetchPortfolioSuccess(result.data))
    } catch (error) {
        dispatch(fetchPortfolioFailure(error as Error))
    }
}



// Stock change Actions
// export const removeStockCompletely = (ids:string) => createAction(PortfolioActionTypes.REMOVE_STOCK_COMPLETELY,ids)
export const removeStockPosition = (id:string[]) =>createAction(PortfolioActionTypes.REMOVE_STOCK_POSITION,id)
export const editStock = (id:string,changeData:StockModify) => createAction(PortfolioActionTypes.EDIT_STOCK,[id,changeData])
export const addStock = (values:{data:Stock,histData:HistData}) => createAction(PortfolioActionTypes.ADD_STOCK,values)


export type RemoveStockPosition = ActionWithPayload<PortfolioActionTypes.REMOVE_STOCK_POSITION,string[]>
export type EditStock = ActionWithPayload<PortfolioActionTypes.EDIT_STOCK,[string,StockModify]>
export type AddStock = ActionWithPayload<PortfolioActionTypes.ADD_STOCK,{data:Stock,histData:HistData}>

export type PortfolioChangeActions = RemoveStockPosition|EditStock|AddStock

export type PortfolioActions = PortfolioChangeActions |PortfolioFirstActions


// export const removeStockCompletelyAsync = (ids) => async (dispatch:Dispatch<AnyAction>) =>{
//     try {
//         const result = await removeStockFetch(ids)
//         dispatch(removeStockCompletely(result))
//     } catch (error) {
//         console.log(error.message)
//     }
// }

 
export const removeStockPositionAsync = (id:string[]) => async (dispatch:Dispatch<AnyAction>) =>{
    try {
        removeStockFetch(id)
        dispatch(removeStockPosition(id))
    } catch (error) {
        console.log(error)
    }
}

export const editStockAsync = (id:string,changeData:StockModify) => async (dispatch:Dispatch<AnyAction>) =>{
    try {
        await editStockFetch(id,changeData)
        dispatch(editStock(id,changeData))
    } catch (error) {
        console.log(error)
    }
}



export const addStockAsync = (info:AddStockAsyncData) => async (dispatch:Dispatch<AnyAction>) =>{
    try {
        const {data} = await addStockFetch(info)
        dispatch(addStock(data))
    } catch (error) {
        console.log(error)
    }
}