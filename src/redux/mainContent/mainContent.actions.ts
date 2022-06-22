import {MainContentActionTypes,StockAdd} from "./mainContent.types";
import {ActionWithPayload,createAction} from '../redux.utils'




export const activateSidebar = (value:string) => createAction(MainContentActionTypes.ACTIVATE_SIDEBAR,value)
export const activateSpecificStock = (stock:string)=> createAction(MainContentActionTypes.ACTIVATE_SPECIFIC_STOCK,stock)
export const activateStockEdit = (stock:string) => createAction(MainContentActionTypes.ACTIVATE_STOCK_EDIT,stock)
export const activateStockAdd = (stock:StockAdd) =>createAction(MainContentActionTypes.ACTIVATE_STOCK_ADD,stock)

// Types

export type ActivateSidebar = ActionWithPayload<MainContentActionTypes.ACTIVATE_SIDEBAR,string>
export type ActivateSpecificStock = ActionWithPayload<MainContentActionTypes.ACTIVATE_SPECIFIC_STOCK,string>
export type ActivateStockEdit = ActionWithPayload<MainContentActionTypes.ACTIVATE_STOCK_EDIT,string>
export type ActivateStockAdd = ActionWithPayload<MainContentActionTypes.ACTIVATE_STOCK_ADD,StockAdd>


export type MainContentActions = ActivateSidebar|ActivateSpecificStock|ActivateStockEdit|ActivateStockAdd


