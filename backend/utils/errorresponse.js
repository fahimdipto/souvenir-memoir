
const errorresponse = (message,err)=>{
    const msg = {
        message,
        timestamp: new Date().getTime(),
        err
    }
    return msg;
}
export default errorresponse;