import axios from "axios";

// 响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('响应拦截器', response)
    return response
}, async function (error) {
    console.dir(error)
    if (error.response.status === 401) {
        // 开始处理
        console.log('响应拦截器-错误-401')
        const refreshToken = store.state.tokenInfo.refresh_token
        // if (有refresh_token) {
        if (refreshToken) {
            // 1. 请求新token
            try {
                const res = await axios({
                    url: 'http://localhost:8000/v1_0/authorizations',
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                })
                console.log('请求新token', res.data.data.token)
                // 2. 保存到vuex
                store.commit('mSetToken', {
                    refresh_token: refreshToken,
                    token: res.data.data.token
                })
                // 3. 重发请求
                //    request是上面创建的axios的实例，它会自动从vuex取出token带上
                return request(error.config)
            } catch (error) {
                // 清除token
                store.commit('mSetToken', {})
                // 去到登录页(如果有token值，就不能到login)
                const backtoUrl = encodeURIComponent(router.currentRoute.fullPath)
                router.push('/login?backto=' + backtoUrl)
                return Promise.reject(error)
            }
        } else {
            // 去到登录页
            // 清除token
            store.commit('mSetToken', {})
            const backtoUrl = encodeURIComponent(router.currentRoute.fullPath)
            router.push('/login?backto=' + backtoUrl)
            return Promise.reject(error)
        }
    } else {
        return Promise.reject(error)
    }
})
