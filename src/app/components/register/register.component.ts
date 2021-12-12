import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { ControllerService } from '..//../controller.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  toppings = new FormControl();
  Registrarse = 'Registrarse';
  email: string = '';
  password: string = '';
  ed: string = '';
  active = true;
  editar = false;
  gene = [
    {
      value: 'm',
      viewValue: 'Masculino',
      statu: false,
    },
    {
      value: 'f',
      viewValue: 'Femenino',
      statu: false,
    },
  ];
  usuario = {
    correo: '',
    password: '',
    edad: '',
    genero: 'null',
    usuario: '',
    fechaden: '',
  };
  items = [1];
  public allowCustom = true;

  selected: number = 1;
  disableSelect = new FormControl(false);
  constructor(
    private router: Router,
    private _toastService: ToastService,
    private controllerService: ControllerService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    console.log(id);
    if (id) {
      this.lo(id);
    }

    for (let index = 2; index < 99; index++) {
      this.items.push(index);
    }
  }
  lo(id: any) {
    //set value radio
    this.editar = true;
    this.controllerService.getusuario(id).subscribe((data: any) => {
      this.usuario = data[0];
      this.usuario.password = '';
      this.Registrarse = 'Editar';
      this.usuario.fechaden = this.usuario.fechaden.substring(0, 10) + 'T08:30';
      for (let index = 0; index < this.gene.length; index++) {
        if (this.usuario.genero == this.gene[index].value) {
          this.gene[index].statu = true;
        }
      }

      console.log(data[0]);
    });
  }

  ngOnInit(): void {}
  getItems() {}
  change(d: any) {
    console.log(d);
    if (d == 'M') {
      this.gene[0].statu = true;
      this.gene[1].statu = false;
    } else {
      this.gene[0].statu = false;
      this.gene[1].statu = true;
    }
  }
  register(form: NgForm) {
    if (this.editar) {
      this.controllerService.putusuario(this.usuario).subscribe((data: any) => {
        this._toastService.success('Usuario editado correctamente');
        this.router.navigate(['/login']);
      });
    } else {
      if (form.valid && this.usuario) {
        if (this.usuario.genero == 'null') {
          for (let index = 0; index < this.gene.length; index++) {
            if (this.gene[index].statu == true) {
              this.usuario.genero = this.gene[index].value;
            }
          }

          this.usuario.fechaden = form.value.fechaden;
          this.usuario.correo = form.value.correo;
          this.usuario.password = form.value.password;
          console.log(this.usuario);
        }

        //call service post

        this.controllerService
          .postUsarios(this.usuario)
          .subscribe((data: any) => {
            console.log(data);
            this._toastService.info(data.status);
          });
        this.router.navigate(['/login']);
      } else {
        this._toastService.info('Datos Incompleto');
      }
    }
  }
  log() {
    this.router.navigate(['/login']);
  }
  selectOption(id: number) {
    //getted from event
    console.log(id);
  }
}
