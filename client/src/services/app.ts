import { get } from './http';
// import axios from 'axios';

export interface Category {
  name: string,
  icon: string,
  _id?: string,
}

interface User {
  username: string,
}

export interface App {
  logo: string,
  name: string,
  description: string,
  category: Category,
  website: string,
  device: string[],
  recommended: boolean,
  creator: User,
  wishUser: string[],
  reviews: [
    value: string,
    user: User,
  ],
  editors: User[],
  _id: string,
}

export const fetchAllApps = async () : Promise<App[]> => await get('/apps') as App[];

export const fetchAllCategories = async () : Promise<Category[]> => await get('/categories') as Category[];

// export async function fetchAllApps() : Promise<App[]> {
//   const response = await get('/apps');
//   return response as App[]; // 'as' to sepecify response.data type to TS complier
// }

// async function fetchAllAppsIII() : Promise<App[]> {
//   return await get('/apps') as App[]; 
// }

// Gerrit's 
// export async function fetchAllApps() : Promise<App[]> {
//   const response = await axios.get<unknown, App[]>('/apps');
//   return response;
// }
