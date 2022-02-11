import { AxiosResponse } from "axios"

export interface CustomAxiosResponse extends AxiosResponse {
  code?: number;
  msg?: string;
  total?: number;
}