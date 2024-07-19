import axios from 'axios'
import router from "@/router/index.js";

const http = axios.create({
    baseURL: window.location.protocol + '//' + window.location.host + '/api', timeout: 99999
})

let isRefreshing = false
let requestQueue = []

http.interceptors.request.use((config) => {
    config.headers.Authorization = 'bearer ' + localStorage.getItem('token') || ''
    return config
})

http.interceptors.response.use(function (response) {
    return response
}, async function (error) {
    console.log('响应拦截器', error)
    const {config, response} = error;
    if (response.status === 401 && !config.url.endsWith('/login')) {
        console.log('错误-401')
        return new Promise(async (resolve) => {
            requestQueue.push({config, resolve})
            if (isRefreshing) {
                return
            }

            isRefreshing = true

            try {
                await refreshToken()
            } catch (error) {
                // const backtoUrl = encodeURIComponent(router.currentRoute.fullPath)
                // await router.push('/login?backto=' + backtoUrl)
                await router.push({name: 'Home'});
                return Promise.reject(error)
            }

            isRefreshing = false
            for (const {resolve, config} of requestQueue) {
                resolve(http(config))
            }
            requestQueue = [];
        })
    }
    return Promise.reject(error)
})

const refreshToken = async () => {
    const {data} = await axios.get('http://localhost:3000/refreshToken', {
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
