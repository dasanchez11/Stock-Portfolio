import axios from "axios";
import store from '../redux/store'
import { StockModify } from "../redux/mainContent/mainContent.types";
import {AddStockAsyncData} from"../redux/portoflio/portfolio.types"

const accessToken = store.getState().user.token




const BASE_URL = 'https://stocks-api-die.herokuapp.com'
// const BASE_URL = 'http://localhost:3001'

export default axios.create({
    baseURL: BASE_URL
})




export const authAxios = axios.create({
    baseURL:BASE_URL,
    // headers:{
    //     Authorization:`Bearer ${accessToken}`
    // }
})

if(accessToken){
    authAxios.defaults.headers.common['Authorization'] = `Bearer `+accessToken
}


// authAxios.interceptors.request.use(
//     config=>{
//         config.headers.Authorization = `Bearer ${accessToken}`;
//         return config
//     },
//     error =>{
//         return Promise.reject(error)
//     }
// )




// Authorization Routes
export const getStock = (tickerName:string,interval:string) => authAxios.post(`${BASE_URL}/stock/getstock`,{tickerName,interval});
export const getStocks = () =>authAxios.get(`${BASE_URL}/stock/getstocks`);
export const addStockFetch = (info:AddStockAsyncData) => authAxios.post(`${BASE_URL}/stock/addstock`,{data:info})
export const findStock = () => authAxios.get(`${BASE_URL}/stock/findstocks`)
export const removeStockFetch = (id:string[]) => authAxios.delete(`${BASE_URL}/stock/removestock`,{data:{id}})
export const editStockFetch = (id:string,data:StockModify) => authAxios.patch(`${BASE_URL}/stock/editstock`,{data:{id:id,data:data}})
export const searchStockFetch = (query:string) => authAxios.post(`${BASE_URL}/stock/searchstock`,{data:{query:query}})






