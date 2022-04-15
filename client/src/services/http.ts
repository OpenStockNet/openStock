import axios from 'axios';

// create this file because axios interceptor is aanoying to type check. 
// instead of using interceptor, using this axios wrapper (not using axios directly)

// instance without interceptor
const instance = axios.create()
instance.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`;
// create a wrapper
export async function get(url : string) : Promise<unknown> {
    const response = await instance.get(url)
    return response.data as unknown;
}

export async function post(url: string, body: unknown) : Promise<unknown> {
    const response = await instance.post(url, body)
    return response.data as unknown;
}
