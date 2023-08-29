import axios, {AxiosInstance, AxiosRequestConfig} from "axios"
import {api_url} from "@/assets/lib/settings";

interface Request<T> {
  code: number
  msg: string
  data: T
}

class Client {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: api_url,
      // headers: {
      //   Authorization: localStorage.getItem("token")
      // }
    })
  }

  async request<T>(config: AxiosRequestConfig): Promise<Request<T>> {
    if(!config.headers) config.headers = {}
    config.headers["Authorization"] = localStorage.getItem("token")
    return (await this.instance.request<Request<T>>(config)).data
  }

  async get<T>(config: AxiosRequestConfig): Promise<Request<T>> {
    return await this.request({...config, method: "GET"})
  }

  async post<T>(config: AxiosRequestConfig): Promise<Request<T>> {
    return await this.request({...config, method: "POST"})
  }

  async delete<T>(config: AxiosRequestConfig): Promise<Request<T>> {
    return await this.request({...config, method: "DELETE"})
  }

  async patch<T>(config: AxiosRequestConfig): Promise<Request<T>> {
    return await this.request({...config, method: "PATCH"})
  }

  async video(video_id: number): Promise<string> {
    return (await this.get<{ video_url: string }>(
        {url: `video/${video_id}/`})
    // ).data.video_url.replace("http://18.222.134.182:6324", api_url)
    ).data.video_url.replace("http://18.222.134.182:6666", api_url)//测试用的
  }

  async image(video_id: number): Promise<string> {
    return (await this.get<{ previewImageUrl: string }>(
        {url: `video/${video_id}/preview/`})
    // ).data.previewImageUrl.replace("http://18.222.134.182:6324", api_url)
    ).data.previewImageUrl.replace("http://18.222.134.182:6666", api_url)//测试用的
  }
}

export const client = new Client()
