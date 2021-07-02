export interface IConfig {
  persistanceMode: string;
}

export const config: IConfig  = {
  persistanceMode: process.env.REACT_APP_PERSISTANCE_MODE || 'localStorage'
}