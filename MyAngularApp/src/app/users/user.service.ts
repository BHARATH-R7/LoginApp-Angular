import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { CrudUser } from '../models/cruduser';



@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<CrudUser[]>(`crud/get`);
    }

    getById(id: string) {
        return this.http.get<CrudUser>(`crud/get/${id}`);
    }

    create(params: any) {
        return this.http.post(`crud/post`, params);
    }

    update(id: string, params: any) {
        return this.http.put(`crud/put/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`crud/delete/${id}`);
    }
}