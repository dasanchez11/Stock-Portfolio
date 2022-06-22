import rootReducer from "./root-reducer";
import {createStore,applyMiddleware,Middleware,AnyAction} from 'redux'
import logger from 'redux-logger'
import thunk,{ThunkDispatch,ThunkMiddleware} from 'redux-thunk'

export type RootState = ReturnType<typeof rootReducer>


const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    thunk,
  ].filter((middleware):middleware is Middleware=>Boolean(middleware))

const store = createStore(rootReducer,applyMiddleware(...middleWares))
export type AppDispatch = ThunkDispatch<typeof store.dispatch, any, AnyAction>
export default store;