import { POST } from "./axios";


export default function DB() {

    const FIND = async(endpoint,content,h)=>{
      return await POST(endpoint,content,h)
    }
    



    return {FIND}
}