import {get} from 'lodash';
import {HTTP_STATUS} from './http-status';
// import {BaseResponseAPI} from 'core/utils/handleApiSuccess';
import axios, {Method, AxiosInstance, AxiosRequestConfig} from 'axios';

export interface PropsParams {
  actionURL: string;
  headers: any;
  method: Method;
  dataBody: any;
  timeout?: number;
  params?: any;
}

const handleError = async (error: {
  config?: any;
  response?: any;
  message?: any;
}) => {
  let result;
  let data;
  const {response} = error;
  console.log('error', response);

  if (response) {
    data = await get(response, 'data');
    switch (response.status) {
      case HTTP_STATUS?.notFound?.code:
        result = {...HTTP_STATUS.notFound, data};
        break;
      case HTTP_STATUS.forbidden?.code:
        result = {...HTTP_STATUS.forbidden, data};
        break;
      case HTTP_STATUS.unauthorized?.code:
        // handle logout
        return {...HTTP_STATUS.unauthorized, data};
      case HTTP_STATUS.badRequest?.code:
        result = {...HTTP_STATUS.badRequest, data};
        break;
      case HTTP_STATUS.upgradeRequired?.code:
        result = {...HTTP_STATUS.upgradeRequired, data};
        break;
      case HTTP_STATUS.notAcceptable?.code:
        // handle error
        return {...HTTP_STATUS.notAcceptable};
      default:
        result = {message: 'server error', data};
        break;
    }
  } else {
    result = {message: error.message, data};
  }
  return result;
};
interface AxiosRequestConfigWithMetadata<T = unknown>
  extends AxiosRequestConfig<T> {
  metadata?: any;
}

export class BaseAPIClass {
  axiosApiInstance: AxiosInstance;
  constructor(baseURL: string) {
    this.axiosApiInstance = axios.create();
    this.axiosApiInstance.interceptors.request.use(
      async (config: AxiosRequestConfigWithMetadata): Promise<any> => {
        // const accessToken = localStorage.getByKey<string>(
        //   GlobalAuthStoreKey.ACCESS_TOKEN,
        // );
        // const token = accessToken ?? Config.GUEST_TOKEN;
        // const token = localService.loginSession?.access_token;
        // if (token) {
        //   config.headers = {
        //     Authorization: `Bearer ${token}`,
        //   };
        // }
        config.headers = {
          // Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'App-Name': 'PETX-WEB-APP',
          lang: 'vi',
          ...config.headers,
        };
        config.timeout = 10000;
        config.baseURL = baseURL;
        return config;
      },
      async (error: {config?: any; response?: any; message?: any}) => {
        const originalRequest = error?.config;
        if (error?.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          // const access_token = await refreshAccessToken();
          // axios.defaults.headers.common.Authorization = 'Bearer ' + access_token;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
          return this.axiosApiInstance(originalRequest);
        }
        void handleError(error);
        return Promise.reject(error);
      },
    );
    this.axiosApiInstance.interceptors.response.use(
      async (response: any) => {
        return response;
      },
      async error => {
        return Promise.reject(error);
      },
    );
  }

  public get<T = any>(actionURL: string, config?: AxiosRequestConfig) {
    return this.axiosApiInstance.get<any>(actionURL, config);
  }

  public post<T = any>(
    actionURL: string,
    bodyRequest?: any,
    config?: AxiosRequestConfig,
  ) {
    return this.axiosApiInstance.post<any>(
      actionURL,
      bodyRequest,
      config,
    );
  }

  public put<T = any>(
    actionURL: string,
    bodyRequest?: any,
    config?: AxiosRequestConfig,
  ) {
    return this.axiosApiInstance.put<any>(
      actionURL,
      bodyRequest,
      config,
    );
  }

  public delete<T = any>(actionURL: string, config?: AxiosRequestConfig) {
    return this.axiosApiInstance.delete<any>(actionURL, config);
  }

  public patch<T = any>(
    actionURL: string,
    bodyRequest?: any,
    config?: AxiosRequestConfig,
  ) {
    return this.axiosApiInstance.patch<any>(
      actionURL,
      bodyRequest,
      config,
    );
  }
}
