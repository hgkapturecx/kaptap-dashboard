const getAuthToken = (type) => {
    const tokens = {
        usertype : localStorage.getItem("KT_UT") ,
        projectID : localStorage.getItem("KT_ID"),
        secretToken : localStorage.getItem("KT_TOKEN")
    }

    return tokens[type] 
}


const isAuthenticated = () => {
    return localStorage.getItem("KT_ID") && localStorage.getItem("KT_TOKEN") && localStorage.getItem("KT_UT") 
}

const storeProjectID = (projectID)=>{
    localStorage.setItem("KT_ID" , projectID)

}
const storeUserType = (usertype)=>{
    localStorage.setItem("KT_UT" , usertype)

}
const storeSecretToken = (secretToken)=>{
    localStorage.setItem("KT_TOKEN" , secretToken)

}

const  Logout = () => {
    localStorage.clear()
}


export {
    getAuthToken,
    storeProjectID, storeUserType, storeSecretToken,  isAuthenticated , Logout
}