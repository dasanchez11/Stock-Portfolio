import {MainContentActionTypes, OtherInfo, StockAdd} from "./mainContent.types";
import {MainContentActions} from './mainContent.actions'

export type MainContentState = {
    readonly active:string;
    readonly stock:string;
    readonly stockEdit:string;
    readonly stockAdd:string;
    readonly stockAddInfo:OtherInfo
}


const INITIAL_STATE:MainContentState = {
    active:'assets',
    stock:'',
    stockEdit:'',
    stockAdd:'',
    stockAddInfo:{
        name_alpha:'',
        symbol: '',
        type: '',
    }
}

const mainContentReducer = (state=INITIAL_STATE,action:MainContentActions):MainContentState=>{
    switch (action.type) {
        case MainContentActionTypes.ACTIVATE_SPECIFIC_STOCK:
            return{
                ...state,
                active:'specificStock',
                stock:action.payload,
                stockEdit:'',
                stockAdd:''
            }
        case MainContentActionTypes.ACTIVATE_SIDEBAR:
            return{
                ...state,
                active:action.payload,
                stock:'',
                stockEdit:'',
                stockAdd:''
            }
        case MainContentActionTypes.ACTIVATE_STOCK_EDIT:
            return{
                ...state,
                stockEdit:action.payload,
                stockAdd:'',
                stockAddInfo:{name_alpha:'',symbol: '',type: '',}
            }
        case MainContentActionTypes.ACTIVATE_STOCK_ADD:
            return{
                ...state,
                stockEdit:'',
                stockAdd:action.payload.name,
                stockAddInfo:action.payload.info
            }
        default:
            return state
    }
}

export default mainContentReducer;
