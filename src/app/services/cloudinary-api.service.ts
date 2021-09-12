import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { AngularFireStorage} from "@angular/fire/compat/storage";


@Injectable({
  providedIn: 'root'
})
export class CloudinaryApiService {
  path : string = "images/"

  constructor(private http: HttpClient, private storage: AngularFireStorage) { }

  post(file: any) {
    let path = `${this.path + file.name}`
    return this.storage.upload(path, file)
  }

  reference(id: string): any {
    return this.storage.ref(this.path + id)
  }
}
