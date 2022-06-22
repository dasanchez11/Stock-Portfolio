import {combineReducers} from 'redux'
import mainContentReducer from './mainContent/mainContent.reducer'
import portfolioReducer from './portoflio/portfolio.reducer'
import userReducer from './user/user.reducer'

const rootReducer = combineReducers({
    mainContent:mainContentReducer,
    user: userReducer,
    portfolio:portfolioReducer
})

export default rootReducer