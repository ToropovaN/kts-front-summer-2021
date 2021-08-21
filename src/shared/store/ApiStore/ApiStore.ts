import {ApiResponse, IApiStore, RequestParams} from "./types";
var qs = require('qs');

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;
    constructor(url : string) {
        this.baseUrl = url;
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        let url = this.baseUrl + params.endpoint + qs.stringify(params.data);
        const response = await fetch(url, {
            method: params.method,
            headers: params.headers
        })
        const result : ApiResponse<SuccessT, ErrorT> = {
            success: response.ok,
            data: await response.json(),
            status: response.status
        }
        return result
    }
}