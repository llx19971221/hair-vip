import api from "@/api"
import axios from "axios"
import qss from 'querystring'
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
    [key: string]: (params: { [key: string]: any }) => any
} = {}

for (let key in api) {
    fnObj[key] = (params: {} = {}) => {
        let url_method: string = api[key]
        const url_method_arr: Array<string> = url_method.split(" ")
        const url: string = url_method_arr[0]
        const method: string = url_method_arr[1]
        const methodLower = method.toLowerCase()
        let data: {[key:string]: any};
        if (methodLower === 'get') {
            data = {
                url,
                method,
                params,
                headers: {}
            }
        } else {
            data = {
                url,
                method,
                data: params,
                headers: {}
            }

        }
        data = {
            ...data
        }
        if (key !== 'login') {
            let token = localStorage.getItem('token')
            token = token ? token : ''
            data['headers']['token'] = token
        }
        return axios(data).catch((err: any) => {
            const code = err.response.status
            switch (code) {
                case 401:
                    router.replace({
                        name: "login"
                    })
                    break
                default:
                    ElMessage.error('服务端错误');
                    break
            }
            ElMessage.error('登录失效!');
        })
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
    }
    return {
        flag,
        data: res.data
    }
})

export default fnObj

