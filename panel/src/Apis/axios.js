
import axios from "axios"

const ip = "127.0.0.1",port=3005;
const domain =`http://${ip}:${port}/`


export const POST = (endpoint,context,h)=>{
    return new Promise((resolve,reject)=>{
         axios
        .post((domain+endpoint).toString(), context, { headers: h })
        .then((response) => { 
          resolve(response.data);
          
        })
        .catch(error => {
            reject(error)
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
             console.error("Error", error.message);
          }
        });
    })
}
