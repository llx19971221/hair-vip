import api from "@/api"
import axios, { AxiosPromise } from "axios"
import { ElMessage } from "element-plus"
import router from "@/router"
interface InterceptorsResponseData {
    data: {
        code: string,
        msg: string
    },
    [key: string]: any
}

const fnObj: {
    [key: string]: (params: []|{[key: string]: any}) => AxiosPromise<unknown>
} = {}

for(let key in api) {
    fnObj[key] = (params: {} = {}) => {
        let url_method: string = api[key]
        const url_method_arr: Array<string> = url_method.split(" ")
        const url: string = url_method_arr[0]
        const method: string = url_method_arr[1]
        let data: {};
        if(method.toLowerCase() === 'get') {
            data = {
                url,
                method,
                params
            }
        }else {
            data = {
                url,
                method,
                data: params
            }
        }
        if(key !== 'login') {
            data = {
                ...data,
                headers: {
                    'token': '123123'
                }
            }
        }
        return axios(data)
    }
}

axios.interceptors.response.use((res) => {
    const {
        data: {
            code,
            msg
        }
    } = res as InterceptorsResponseData
    let flag: boolean = true
    if (code !== '200') {
        flag = false
        ElMessage.error(msg)
        switch(code) {
            case '401':
                router.replace({
                    name: "login"
                })
                break
            default:
                break
        }
    }
    return {
        flag,
        data: res.data
    }
})
export default fnObj

