var axios = require('axios');
axios.defaults.baseURL = 'http://localhost:9001';
//axios.defaults.baseURL = 'http://localhost:9001';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = ""


export function post(url,token,body) {
    axios.defaults.headers.common['Authorization'] = token
    return new Promise (function (resolve,reject) {
        axios.post(url, body)
            .then(function (response,err) {
                if(!err)resolve(response.data)
            })
            .catch(function (error) {
                reject(error)
            });
    })

}
export function get(url,token,params) {
    axios.defaults.headers.common['Authorization'] = token
    return new Promise (function (resolve,reject) {
        axios.get(url,{params:params})
            .then(function (response,err) {
                if(!err)resolve(response.data)

            })
            .catch(function (error) {
                reject(error)
            });
    })

}
export function put(url,token,body,params) {
    axios.defaults.headers.common['Authorization'] = token
    return new Promise (function (resolve,reject) {
        axios.put(url, body,{params:params})
            .then(function (response,err) {
                if(!err)resolve(response)

            })
            .catch(function (error) {
                reject(error)
            });
    })

}
export function _delete(url,token,body,params) {
    axios.defaults.headers.common['Authorization'] = token
    return new Promise (function (resolve,reject) {
        axios.delete(url, body,{params:params})
            .then(function (response,err) {
                if(!err)resolve(response)

            })
            .catch(function (error) {
                reject(error)
            });
    })

}
