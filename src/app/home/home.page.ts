import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  update;
  formularioUpdate: FormGroup;
  public id:any;
  public usuario:any;
  public email:any;
  public password:any;
  public estado:any=0;

  constructor(public api:ApiService,
    public fb: FormBuilder, 
    public alertController: AlertController,) {
    this.formularioUpdate = this.fb.group({
      'id': new FormControl("", Validators.required),
      'usuario': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {

    this.update = {
      id: '',
      usuario: '',
      email: '',
      password: ''
    };

  }

  async updateUser(){

    this.api.update(this.update).subscribe(
      response => {
        alert('user ' + this.update.usuario + ' ha sido actualizado!')
        console.log(this.update)
      },
      error => console.log('error',error)
    );

    if(this.formularioUpdate.invalid){
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Debe llenar todos los campos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }
  }

  buscarUsuario(){
    this.api.getid(this.id).subscribe(
      resultado => {
        this.estado=1;
        var dataString = JSON.stringify(resultado);
        var usuarioJson = JSON.parse(dataString);

        console.log(usuarioJson);
        console.log(usuarioJson.users.id);
        console.log(usuarioJson.users.usuario);
        console.log(usuarioJson.users.email);
        console.log(usuarioJson.users.password);
        this.usuario = usuarioJson.users.usuario;
        this.email = usuarioJson.users.email;
        this.password = usuarioJson.users.password;
        }
      );
  }

  delete = () => {
    this.api.deleteUser(this.id).subscribe(
      response => {
        alert(this.id + ' eliminado')
      },
      error => {
        console.log(error);
      }
    );
  }
}
