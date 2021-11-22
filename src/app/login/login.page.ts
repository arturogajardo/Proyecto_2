import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login;
  formularioLogin: FormGroup;

  public id_usuario:any;
  public usuario:any;
  public email_form: string=null;
  public password_form:string=null;
  public estado:any=0;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public api:ApiService,
    public fb: FormBuilder) {
    this.formularioLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.login = {
      email: '',
      password: ''
    };
  }
  
  async ingresar(){
    this.api.getUsers().subscribe(
      async resultado => {
        this.estado=1;
        var dataString = JSON.stringify(resultado);
        var usuarioJson = JSON.parse(dataString);
        console.log(usuarioJson);
        //this.usuario = usuarioJson.users.usuario;
        //this.email = usuarioJson.users.email;
        //this.password = usuarioJson.users.password;

        var f = this.formularioLogin.value;

        var user = JSON.parse(localStorage.getItem('user'));

        if(this.login.email == usuarioJson.users.email && this.login.password == usuarioJson.users.password){
          console.log('Ingresado');
          localStorage.setItem('ingresado','true');
          this.navCtrl.navigateRoot('inicio');
        }else{
          const alert = await this.alertController.create({
            header: 'Datos incorrectos',
            message: 'Los datos que ingresaste son incorrectos.',
            buttons: ['Aceptar']
          });
      
          await alert.present();
        }
      }
    );
  }
}


