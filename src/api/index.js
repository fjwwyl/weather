import axios from 'axios'


const myAxios = axios.create();

myAxios.interceptors.request.use(request => request, error => Promise.reject(error));

myAxios.interceptors.response.use(response => {
        if (response.data.code === 401) {
            alert("无权限操作")
        }
        if (response.data.code === 400) {
            alert("请求网络失败")
        }
        if (response.data.code === 404) {
            alert("请求网络失败")
        }
        return response;
    },
    error => Promise.reject(error)
)

const http = {
    get: (url = "", params = {}) => {
        return new Promise((resolve, reject) => {
            myAxios.get(url, {
                params,
            }).then(res => {
                resolve(res);
            }).catch(res => {
                reject(res);
            })
        })

    },
    post: (url = "", params = {}) => {
        return new Promise((resolve, reject) => {
            myAxios.post(url, {
                params,
            }).then(res => {
                resolve(res);
            }).catch(res => {
                reject(res);
            })
        })
    }
}
export default http;