import {ApiResponse, HTTPMethod, IApiStore, RequestParams} from "./types";
var qs = require('qs');

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;
    constructor(url : string) {
        this.baseUrl = url;
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        let newUrl = this.baseUrl + params.endpoint;
        let newHeaders = params.headers;
        let newBody = null;

        if (params.method === HTTPMethod.GET) {
            newUrl = newUrl + qs.stringify(params.data);
        }
        else if (params.method === HTTPMethod.POST){
            newBody = JSON.stringify(params.data)
            newHeaders['Content-Type'] = 'application/json'
        }
        try {
            const response = await fetch(newUrl, {
                method: params.method,
                headers: newHeaders,
                body: newBody
            })
            const result : ApiResponse<SuccessT, ErrorT> = {
                success: response.ok,
                data: await response.json(),
                status: response.status
            }
            return result;
        }
        catch (e) {
            return {
                success: false,
                data: null,
                status: "UNEXPECTED_ERROR"
            }

        }
    }
}