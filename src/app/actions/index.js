import {SET_LOGIN_PENDING,SET_LOGIN_SUCCESS,SET_LOGIN_ERROR,SELECTED_NEWS,SET_NEWS,SET_MY_PROFILE,SET_PROGRESS,
    SET_VIDEO_ERROR,SET_CATEGORIES,SET_LOCALITIES,SET_TYPES,SET_COUNTRIES,SET_NEWS_ERROR} from './types'
import {post,get,put,_delete} from "../service/api";
import {LOGIN_URL,GET_VIDEOS_URL,GET_MY_PROFILE_URL,UPLOAD_VIDEO_URL,UPLOAD_IMAGE_URL,POST_VIDEO_URL,NEWS_URL,
CATEGORIES,COUNTRIES,LOCALITIES,TYPES,GET_USERS_URL,POST_USERS_URL,GET_USER_ROLES,DELETE_USERS_URL,GET_USER_DETAILS_URL,APPLY_FILTER,APP_USERS} from "../service/apiurls"
import {LOGIN_TOKEN_TYPE,ADMIN_TOKEN_TYPE} from "../service/tokenTypes"

import btoa from "btoa"

export function setLoginPending(isLoginPending) {
    return {
        type: SET_LOGIN_PENDING,
        isLoginPending
    };
}

export function setLoginSuccess(isLoginSuccess) {

    return {
        type: SET_LOGIN_SUCCESS,
        isLoginSuccess
    };

}

export function setLoginError(loginError) {
    return {
        type: SET_LOGIN_ERROR,
        loginError
    }
}
export function setNewsError(newsError) {
    return {
        type: SET_NEWS_ERROR ,
        payload:newsError
    }
}
export function setSelectedNews(news) {
    return {
        type: SELECTED_NEWS,
        payload:news
    }
}
export function setNews(news) {
    return {
        type: SET_NEWS,
        payload:news
    }
}export function setCategories(categories) {
    return {
        type: SET_CATEGORIES,
        payload:categories
    }
}export function setCountries(countries) {
    return {
        type: SET_COUNTRIES,
        payload:countries
    }
}
export function setLocalities(locality) {
    return {
        type: SET_LOCALITIES,
        payload:locality
    }
}
export function setTypes(types) {
    return {
        type: SET_TYPES,
        payload:types
    }
}
export function setMyProfile(profile) {
    return {
        type: SET_MY_PROFILE,
        payload:profile
    }
}
export function setProgress(progress) {

    return {
        type: SET_PROGRESS,
        payload:progress
    }
}


export function login(email, password) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            dispatch(setLoginPending(true));
            dispatch(setLoginSuccess(false));
            dispatch(setLoginError(null));
            var base64 = btoa(email+":"+password)
            var authToken = LOGIN_TOKEN_TYPE+" "+base64
            post(LOGIN_URL,authToken,{}).then(function (admin) {
                localStorage.setItem("loginuser",JSON.stringify(admin));
                dispatch(setLoginPending(false));
                dispatch(setLoginSuccess(true));
                resolve(admin)
            }, function (error) {
                if (error.response) {
                    dispatch(setLoginPending(false));
                    dispatch(setLoginError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
                    reject(error)
                }
            });
        })

    }
}
export function postNews(news) {
    console.log("----input news-------",news)
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise(function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
           return post(NEWS_URL,authToken,news).then(function (news) {
                   dispatch(getNews());
               return resolve(news)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Post News-------",error)
                }
               return reject(error)
            });
        })

    }
}

export function setRoles(roles) {

    return {
        type: "SET_ROLES_DATA",
        payload:roles
    }
}

export function getRoles() {
    return  dispatch => {
        axios.get(GET_USER_ROLES)
            .then(function(response) {
                dispatch(setRoles(response.data))
            });
    }
}

export function clearAdminData(flag) {

    return {
        type: "CLEAR_USER_DATA",
        payload:flag
    }
}

export function setAdminError(userError) {

    return {
        type: "SET_ADMIN_ERROR",
        payload:userError
    }
}
export function setUserError(userError) {

    return {
        type: "SET_USER_ERROR",
        payload:userError
    }
}
export function addAdmin(admin) {
    console.log("---admin----",admin)
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            post(POST_USERS_URL,authToken,admin)
                .then(function (response,err) {
                    dispatch(getAdmins());
                    dispatch(clearAdminData(true))
                    dispatch(setAdminError(""));
                    resolve()
                })
                .catch(function (error) {
                    if (error.response) {
                        dispatch(setAdminError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
                    }
                    reject()
                });
        })

    }
}


export function addUser(user) {
    console.log("---user----",user)
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            post(APP_USERS,authToken,user)
                .then(function (response,err) {
                    dispatch(getUsers());
                    dispatch(setUserError(""));
                    resolve()
                })
                .catch(function (error) {
                    if (error.response) {
                        dispatch(setUserError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
                    }
                    reject()
                });
        })

    }
}


export function editAdmin(userId,admin) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            put(GET_USER_DETAILS_URL+"/"+userId,authToken,admin)
                .then(function (response,err) {
                    dispatch(getMyProfile());
                    dispatch(getAdminDetails(userId));
                    dispatch(clearAdminData(true))
                    dispatch(setAdminError(""));
                    resolve()
                })
                .catch(function (error) {
                    if (error.response) {
                        dispatch(setAdminError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
                    }
                    reject()
                });
        })

    }
}

export function editUser(userId,user) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            put(APP_USERS+"/"+userId,authToken,user)
                .then(function (response,err) {
                    dispatch(getUserDetails(userId));
                    dispatch(setUserError(""));
                    resolve()
                })
                .catch(function (error) {
                    if (error.response) {
                        dispatch(setUserError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
                    }
                    reject()
                });
        })

    }
}






export function selectedUserData(selectedUserData) {

    return {
        type: "SELECTED_USER_DATA",
        payload:selectedUserData
    }
}





export function selectedAdminData(selectedAdminData) {

    return {
        type: "SELECTED_ADMIN_DATA",
        payload:selectedAdminData
    }
}

export function setAdminsData(adminsData) {

    return {
        type: "SET_ADMINS_DATA",
        payload:adminsData
    }
}
export function setUsersData(usersData) {

    return {
        type: "SET_USERS_DATA",
        payload:usersData
    }
}
export function getAdmins() {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
        get(GET_USERS_URL,authToken).then(function (admins) {
            dispatch(setAdminsData(admins));
        }, function (error) {
            if (error.response) {
                console.log("----error in get admins-------",error)
            }
        });
    }
}
export function getUsers() {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
        get(APP_USERS,authToken).then(function (users) {
            dispatch(setUsersData(users));
        }, function (error) {
            if (error.response) {
                console.log("----error in get users-------",error)
            }
        });
    }
}

export function addTypes(type) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            post(TYPES,"",type).then(function (type) {
                dispatch(getTypes());
                resolve(type)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Post Type-------",error)
                }
                reject(error)
            });
        })

    }
}

export function getTypes() {
    return  dispatch => {
        get(TYPES).then(function (types) {
            dispatch(setTypes(types));
        }, function (error) {
            if (error.response) {
                console.log("----error in get Types-------",error)
            }
        });
    }
}

export function deleteType(type) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            _delete(TYPES+"/"+type,"").then(function (type) {
                dispatch(getTypes());
                resolve(type)
            }, function (error) {
                if (error.response) {
                    console.log("----error in delete Type-------",error)
                }
                reject(error)
            });
        })

    }
}
export function editType(type) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            put(TYPES+"/"+type._id,"",type).then(function (type) {
                dispatch(getTypes());
                resolve(type)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Edit Type-------",error)
                }
                reject(error)
            });
        })

    }
}

export function addCategory(category) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            post(CATEGORIES,"",category).then(function (category) {
                dispatch(getCategories());
                resolve(category)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Post Category-------",error)
                }
                reject(error)
            });
        })

    }
}
export function deleteCategory(category) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            _delete(CATEGORIES+"/"+category,"").then(function (category) {
                dispatch(getCategories());
                resolve(category)
            }, function (error) {
                if (error.response) {
                    console.log("----error in delete Category-------",error)
                }
                reject(error)
            });
        })

    }
}
export function editCategory(category) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            put(CATEGORIES+"/"+category._id,"",category).then(function (category) {
                dispatch(getCategories());
                resolve(category)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Edit Subject-------",error)
                }
                reject(error)
            });
        })

    }
}
export function getCategories() {
    return  dispatch => {
        get(CATEGORIES).then(function (categories) {
            dispatch(setCategories(categories));
        }, function (error) {
            if (error.response) {
                console.log("----error in get categories-------",error)
            }
        });
    }
}


export function deleteAdmin(adminId) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            _delete(DELETE_USERS_URL+"/"+adminId,authToken).then(function (result) {
                dispatch(getAdmins());
                resolve(result)
            }, function (error) {
                if (error.response) {
                    console.log("----error in delete admin-------",error)
                }
                reject(error)
            });
        })

    }
}

export function deleteUser(userId) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            _delete(APP_USERS+"/"+userId,authToken).then(function (result) {
                dispatch(getUsers());
                resolve(result)
            }, function (error) {
                if (error.response) {
                    console.log("----error in delete admin-------",error)
                }
                reject(error)
            });
        })

    }
}

export function getCountries() {
    return  dispatch => {
        get(COUNTRIES).then(function (countries) {
            dispatch(setCountries(countries));
        }, function (error) {
            if (error.response) {
                console.log("----error in get countries-------",error)
            }
        });
    }
}

export function deleteCountry(country) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            _delete(COUNTRIES+"/"+country,"").then(function (country) {
                dispatch(getCountries());
                resolve(country)
            }, function (error) {
                if (error.response) {
                    console.log("----error in delete Country-------",error)
                }
                reject(error)
            });
        })

    }
}

export function editCountry(country) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            put(COUNTRIES+"/"+country._id,"",country).then(function (country) {
                dispatch(getCountries());
                resolve(country)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Edit Country-------",error)
                }
                reject(error)
            });
        })

    }
}

export function addCountry(country) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            post(COUNTRIES,"",country).then(function (country) {
                dispatch(getCountries());
                resolve(country)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Post Country-------",error)
                }
                reject(error)
            });
        })

    }
}

export function deleteLocality(locality) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            _delete(LOCALITIES+"/"+locality,"").then(function (locality) {
                dispatch(getLocalities());
                resolve(locality)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Delete Locality-------",error)
                }
                reject(error)
            });
        })

    }
}

export function editLocality(locality) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            put(LOCALITIES+"/"+locality._id,"",locality).then(function (locality) {
                dispatch(getLocalities());
                resolve(locality)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Edit Locality-------",error)
                }
                reject(error)
            });
        })

    }
}
export function addLocality(locality) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            post(LOCALITIES,"",locality).then(function (locality) {
                dispatch(getLocalities());
                resolve(locality)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Post Locality-------",error)
                }
                reject(error)
            });
        })

    }
}

export function getLocalities() {
    return  dispatch => {
        get(LOCALITIES).then(function (localities) {
            dispatch(setLocalities(localities));
        }, function (error) {
            if (error.response) {
                console.log("----error in get localities-------",error)
            }
        });
    }
}

export function addType(type) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            post(TYPES,"",type).then(function (type) {
                dispatch(getTypes());
                resolve(type)
            }, function (error) {
                if (error.response) {
                    console.log("----error in Post Type-------",error)
                }
                reject(error)
            });
        })

    }
}


export function getUserDetails(userId) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
        get(APP_USERS+"/"+userId,authToken).then(function (user) {
            dispatch(selectedUserData(user));
        }, function (error) {
            if (error.response) {
                console.log("----error in get User Details-------",error)
            }
        });
    }
}


export function getAdminDetails(email) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
        get(GET_USER_DETAILS_URL+"/"+email,authToken).then(function (admin) {
            dispatch(selectedAdminData(admin));
        }, function (error) {
            if (error.response) {
                console.log("----error in get videos-------",error)
            }
        });
    }
}

export function setLoader(value) {
    return {
        type: "SET_LOADER",
        payload:value
    }

}

export function applyFilter(filterData) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            post(APPLY_FILTER,authToken,filterData).then(function (news) {
                dispatch(setNews(news));
                resolve("Success");
            }, function (error) {
                if (error.response) {
                    console.log("----error in apply filter news-------",error)
                    reject(error.response)
                }
                reject(error)
            });
        })
    }
}



export function getNews() {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
       return get(NEWS_URL,authToken).then(function (news) {
           return dispatch(setNews(news));
        }, function (error) {
            if (error.response) {
               console.log("----error in get News-------",error)
            }
        });
    }
}


export function getMyProfile() {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
        get(GET_MY_PROFILE_URL,authToken).then(function (profile) {
            dispatch(setMyProfile(profile));
        }, function (error) {
            if (error.response) {
               console.log("----error in get profile-------",error)
            }
        });
    }
}


export function uploadImage(file) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise(function (resolve,reject) {
            var formData = new FormData();
            formData.append("file", file);
            var xhr = new XMLHttpRequest();
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            xhr.open('POST', UPLOAD_IMAGE_URL);
            xhr.setRequestHeader("Authorization",authToken );

            function progressFunction(evt){
                if (evt.lengthComputable) {
                    dispatch(setProgress((Math.round(evt.loaded / evt.total * 100))))
                }
            }

            xhr.upload.addEventListener("progress", progressFunction, false);

            xhr.onprogress = function () {

            };

            xhr.onreadystatechange = function () {

                if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

                    resolve(xhr.responseText)

                }
            };
            xhr.onerror = function (error) {

                reject(error)
            };

            xhr.onload = function () {

            };

            xhr.send(formData);

        })
    }

}

export function editNews(news) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            put(NEWS_URL+"/"+news.videoId,authToken,news).then(function (news) {
                dispatch(getNews());
                resolve()
            },function (error) {
                if (error.response) {
                    console.log("----error in Edit News-------",error)
                    reject(error.response)
                }
            });
        })

    }
}


export function deleteNews(news) {
    var AUTH_TOKEN = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            var authToken = ADMIN_TOKEN_TYPE+" "+AUTH_TOKEN
            _delete(NEWS_URL+"/"+news._id,authToken).then(function (news) {
                dispatch(getNews());
                resolve(news)
            },function (error) {
                if (error.response) {
                    console.log("----error in Delete News-------",error)
                    reject(error.response)
                }
            });
        })

    }
}


