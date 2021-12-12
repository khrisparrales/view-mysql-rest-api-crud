import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerService } from '..//../controller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  usuarios: any;
  constructor(private control: ControllerService, private router: Router) {
    this.lo();
  }
  lo() {
    this.control.getusuarios().subscribe((data) => {
      console.log(data);
      this.usuarios = data;
    });
  }
  ngOnInit(): void {}
  editar(user: any) {
    console.log(user);
    this.router.navigate(['/editar', user.id]);
  }
  eliminar(user: any) {
    console.log('eliminar');
    this.control.deleteusuario(user.id).subscribe((data) => {
      console.log(data);
      this.lo();
      // this.usuarios = data;
    });
  }
  cerrar() {
    localStorage.setItem('currentUser', 'false');
    this.router.navigate(['/login']);
  }
}
