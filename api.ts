import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const PUBLIC_API = process.env.NEXT_PUBLIC_API;
const API = process.env.NEXT_API;

class Api{
    api: AxiosInstance;
    
    constructor(){
        this.api = axios.create({baseURL: API || PUBLIC_API})
    }

    async get<Model>(url: string){
        try{
            console.log(this.api, url);
            let res = await (await this.api.get<Model>(`${url}`)).data;
            return res
        }catch(err){
            console.log("what is this error!?", err)
            throw err;
        }
    }
    async post<Model>(url: string, data: Model, options: AxiosRequestConfig = {}){
        let res = await this.api.post(`${url}`, data, options)
        return res.data;
    }

    async patch<Model>(url: string, id:string, data: Model, options?: AxiosRequestConfig){
        let res = await this.api.patch<Model>(`${url}/${id}`, data, options);
        return res.data;
    }
    async delete<Model>(url: string, id: string, options?: AxiosRequestConfig){
        let res = await this.api.delete<Model>(`${url}/${id}`, options);
        return res.data;
    }
}


export default new Api()