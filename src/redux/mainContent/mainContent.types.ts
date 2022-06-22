export enum MainContentActionTypes  {
    ACTIVATE_SIDEBAR='ACTIVATE_SIDEBAR',
    ACTIVATE_SPECIFIC_STOCK='ACTIVATE_SPECIFIC_STOCK',
    ACTIVATE_STOCK_EDIT='ACTIVATE_STOCK_EDIT',
    ACTIVATE_STOCK_ADD='ACTIVATE_STOCK_ADD',
}


export type Stock = {
    date:string;
    entryPrice:number;
    name:string;
    name_alpha:string;
    numOfShares:number;
    price:number;
    ticker:string;
    typeOfAsset:string;
    _id:string;
}


export type OtherInfo = {
    name_alpha:string;
    symbol:string;
    type:string
}
export type StockAdd =  {
    name:string
    info:OtherInfo
}

export type StockModify = {
    numOfShares:number|string;
    entryPrice:number|string
}
