import { BASE_URL } from "./base_url"
import axios from "axios";


export const getAllOrders = async() => {
    let globalData;
    await axios.get(`${BASE_URL}/orders`)
    .then(res => {
        globalData = res.data
    })
    return globalData;
}