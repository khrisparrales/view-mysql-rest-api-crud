import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';
import { ControllerService } from '../../controller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario = {
    correo: '',
    password: '',
  };

  constructor(
    private _toastService: ToastService,
    private router: Router,
    private controller: ControllerService
  ) {}

  login() {
    this.controller.postlogin(this.usuario).subscribe((data: any) => {
      console.log(data);

      if (data.status == 'User logged') {
        localStorage.setItem('currentUser', 'true');
        this.router.navigate(['/home']);
        this._toastService.info(data.status);
      } else {
        localStorage.setItem('currentUser', 'false');
        this._toastService.error(data.status);
      }
    });
  }
  register() {
    this.router.navigate(['/register']);
  }
  addInfoToast() {
    this._toastService.info('message');
  }
  ngOnInit(): void {}
}
