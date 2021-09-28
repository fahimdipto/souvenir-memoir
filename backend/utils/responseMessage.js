
const response = (message,route)=>{
    const msg = {
        message,
        timestamp: new Date().getTime(),
        route
    }
    return msg;
}
export default response;