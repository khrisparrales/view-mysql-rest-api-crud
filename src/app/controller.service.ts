import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  url = 'https://fierce-garden-60171.herokuapp.com/usuarios';
  constructor(private http: HttpClient) {}
  // this.http.get('url').subscribe(data => {
  //   //this.data = data;
  // });
  getusuarios() {
    return this.http.get(this.url);
  }
  getusuario(id: any) {
    return this.http.get(this.url + '/' + id);
  }
  deleteusuario(id: any) {
    return this.http.delete(this.url + '/' + id);
  }
  putusuario(user: any) {
    return this.http.put(this.url + '/' + user.correo, user);
  }
  postUsarios(usuario: any) {
    return this.http.post(this.url, usuario);
  }
  postlogin(usuario: any) {
    return this.http.post(this.url + '/login', usuario);
  }
}
