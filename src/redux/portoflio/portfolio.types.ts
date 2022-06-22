import { OtherInfo, StockModify } from "../mainContent/mainContent.types";

export enum PortfolioActionTypes {
    FETCH_PORTFOLIO_START='FETCH_PORTFOLIO_START',
    FETCH_PORTFOLIO_SUCCESS='FETCH_PORTFOLIO_SUCCESS',
    FETCH_PORTFOLIO_FAILURE='FETCH_PORTFOLIO_FAILURE',
    FETCH_PORTFOLIO='FETCH_PORTFOLIO',
    EDIT_STOCK='EDIT_STOCK',
    REMOVE_STOCK_POSITION='REMOVE_STOCK_POSITION',
    REMOVE_STOCK_COMPLETELY='REMOVE_STOCK_COMPLETELY',
    ADD_STOCK='ADD_STOCK',
    TOGGLE_PORTFOLIO='TOGGLE_PORTFOLIO',
    TOGGLE_ADD_TO_PORTFOLIO='TOGGLE_ADD_TO_PORTFOLIO',

}


export type HistData = {
    [key:string]:{
        meta:any[];
        status:string;
        values:HistDataValues[]
    }
}

export type HistDataValues = {
    close:string; 
    datetime:string;  
    high:string; 
    low:string; 
    open:string; 
    volume:string;
}

export type AddStockAsyncData = {
    name:string
    ticker:string;
    typeOfAsset:string;
    addValues:StockModify;
    name_alpha:string;
}