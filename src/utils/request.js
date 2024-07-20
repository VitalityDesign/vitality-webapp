import axios from 'axios'
import router from "@/router/index.js";

const http = axios.create({
    baseURL: (import.meta.env.DEV ? import.meta.env.VITE_BASE_URL : window.location.protocol + '//' + window.location.host) + '/api',
    timeout: 99999
})

let isRefreshing = false
let requestQueue = []

http.interceptors.request.use((config) => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token') || ''
    return config
})

http.interceptors.response.use(function (response) {
    return response
}, async function (error) {
    console.log('响应拦截器', error)
    const {config, response} = error;
    if (response.status === 401) {
        if (!config.url.endsWith('/login')) {
            console.log('错误-401')
            return new Promise(async (resolve, reject) => {
                requestQueue.push({config, resolve})
                if (isRefreshing) {
                    return
                }
                isRefreshing = true

                refreshToken().then(res => {
                    console.log('刷新token成功')
                }).catch(err => {
                    const backUrl = encodeURIComponent(router.currentRoute.fullPath)
                    router.push('/login?back=' + backUrl)
                    reject(error)
                })

                isRefreshing = false
                for (const {config, resolve} of requestQueue) {
                    resolve(http(config))
                }
                requestQueue = [];
            })
        }
    }
    if (response.status === 404) {
        response.statusText = `Server not found 404`;
        return Promise.reject(error)
    }
    return Promise.reject(error)
})

const refreshToken = async () => {
    const {data} = await http.get('/refresh_token', {
        params: {
            refresh_token: localStorage.getItem('refresh_token')
        }
    })

    if (data.accessToken && data.refreshToken) {
        localStorage.setItem('access_token', data.accessToken)
        localStorage.setItem('refresh_token', data.refreshToken)
    }
}

export default http
