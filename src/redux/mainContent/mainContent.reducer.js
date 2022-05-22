import mainContentActionTypes from "./mainContent.types";


const INITIAL_STATE = {
    active:'assets',
    stock:'',
    stockEdit:'',
    stockAdd:'',
    stockAddInfo:[]

}

const mainContentReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case mainContentActionTypes.ACTIVATE_SPECIFIC_STOCK:
            return{
                ...state,
                active:'specificStock',
                stock:action.payload,
                stockEdit:'',
                stockAdd:''
            }
        case mainContentActionTypes.ACTIVATE_SIDEBAR:
            return{
                ...state,
                active:action.payload,
                stock:'',
                stockEdit:'',
                stockAdd:''
            }
        case mainContentActionTypes.ACTIVATE_STOCK_EDIT:
            return{
                ...state,
                stockEdit:action.payload,
                stockAdd:'',
                stockAddInfo:[]
            }
        case mainContentActionTypes.ACTIVATE_STOCK_ADD:
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
