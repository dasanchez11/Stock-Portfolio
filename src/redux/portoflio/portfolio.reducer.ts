import {PortfolioActionTypes,HistData} from "./portfolio.types";
import {removeFromPortfolio,editSpecificStock} from './portfolio.utils'
import {PortfolioActions} from './portfolio.actions'
import { Stock } from "../mainContent/mainContent.types";

export type PortfolioState = {
    readonly data:Stock[],
    readonly histData:HistData[]
    readonly isLoading:boolean,
    readonly modalActive:boolean,
    readonly addModalActive:boolean,
    readonly errorMessage:Error|null
}





const INITIAL_STATE:PortfolioState ={
    data:[],
    histData:[],
    isLoading:false,
    modalActive:false,
    addModalActive:false,
    errorMessage:null
}

const portfolioReducer =(state=INITIAL_STATE,action:PortfolioActions):PortfolioState =>{
    switch (action.type) {
        case PortfolioActionTypes.FETCH_PORTFOLIO_START:
            return{
                ...state,
                isLoading:true
            }
        case PortfolioActionTypes.FETCH_PORTFOLIO_SUCCESS:
            return{
                ...state,
                isLoading:false,
                data:action.payload.data,
                histData:action.payload.histData
            }
        case PortfolioActionTypes.FETCH_PORTFOLIO_FAILURE:
            return{
                ...state,
                isLoading:false,
                errorMessage:action.payload
            }
        
        case PortfolioActionTypes.TOGGLE_PORTFOLIO:
            return{
                ...state,
                modalActive:!state.modalActive,
            }
        case PortfolioActionTypes.TOGGLE_ADD_TO_PORTFOLIO:
            return{
                ...state,
                modalActive:false,
                addModalActive:!state.addModalActive,
            }
        case PortfolioActionTypes.REMOVE_STOCK_POSITION:
            return{
                ...state,
                data:removeFromPortfolio(action.payload,state.data),
            }
        case PortfolioActionTypes.ADD_STOCK:
            return{
                ...state,
                data: [...state.data,action.payload.data],
                histData:{...state.histData,[action.payload.data.ticker]:action.payload.histData.result}
            }
        case PortfolioActionTypes.EDIT_STOCK:
            return{
                ...state,
                data: editSpecificStock(action.payload,state.data) 
            }

    
        default:
            return state
    }
}

export default portfolioReducer