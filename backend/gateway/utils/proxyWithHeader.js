import proxy from "express-http-proxy"

export const proxyWithHeader= (serviceUrl) => {
    return proxy(serviceUrl,{
        proxyReqOptDecorator:(proxyRqOpts,srcReq)=>{
            if(srcReq.user){
                proxyRqOpts.headers["x-user-id"]=srcReq.user.userId
            }
            return proxyRqOpts
        } 
    })
}