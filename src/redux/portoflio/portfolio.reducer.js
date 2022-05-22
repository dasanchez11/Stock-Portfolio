import portfolioActionTypes from "./portfolio.types";
import {removeFromPortfolio,editSpecificStock} from './portfolio.utils'

const INITIAL_STATE ={
    data:[],
    histData:[],
    isLoading:false,
    modalActive:false,
    addModalActive:false
}

const portfolioReducer =(state=INITIAL_STATE,action) =>{
    switch (action.type) {
        case portfolioActionTypes.FETCH_PORTFOLIO_START:
            return{
                ...state,
                isLoading:true
            }
        case portfolioActionTypes.FETCH_PORTFOLIO_SUCCESS:
            return{
                ...state,
                isLoading:false,
                data:action.payload.data,
                histData:action.payload.histData
            }
        case portfolioActionTypes.FETCH_PORTFOLIO_FAILURE:
            return{
                ...state,
                isLoading:false,
            }
        
        case portfolioActionTypes.TOGGLE_PORTFOLIO:
            return{
                ...state,
                modalActive:!state.modalActive,
            }
        case portfolioActionTypes.TOGGLE_ADD_TO_PORTFOLIO:
            return{
                ...state,
                modalActive:false,
                addModalActive:!state.addModalActive,
            }
        case portfolioActionTypes.REMOVE_STOCK_COMPLETELY:
        case portfolioActionTypes.REMOVE_STOCK_POSITION:
            return{
                ...state,
                data:removeFromPortfolio(action.payload,state.data),
            }
        case portfolioActionTypes.ADD_STOCK:
            return{
                ...state,
                data: [...state.data,action.payload.data.data],
                histData:{...state.histData,[action.payload.data.data.ticker]:action.payload.data.histData.result}
            }
        case portfolioActionTypes.EDIT_STOCK:
            return{
                ...state,
                data: editSpecificStock(action.payload,state.data) 
            }

    
        default:
            return state
    }
}

export default portfolioReducer