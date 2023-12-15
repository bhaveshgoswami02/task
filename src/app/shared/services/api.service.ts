import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) { }

    getData(): Promise<any> {
        try {
            let url = './assets/json/input_data_json.json'
            return this.http.get(url).toPromise()
        } catch (err: any) {
            throw Error(err)
        }
    }

    getStaticData(): Promise<any> {
        try {
            let url = './assets/json/input_static_json.json'
            return this.http.get(url).toPromise()
        } catch (err: any) {
            throw Error(err)
        }
    }

    callBothAPIs(): Promise<any[]> {
        const promise1 = this.getData();
        const promise2 = this.getStaticData();
        return Promise.all([promise1, promise2]);
    }

}