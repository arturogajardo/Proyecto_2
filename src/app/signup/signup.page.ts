import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  providers: [ApiService],
})
export class SignupPage implements OnInit {

  signup;
  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, 
    public alertController: AlertController,
    public navCtrl: NavController,
    public api:ApiService) { 
    this.formularioRegistro = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {

    this.signup = {
      usuario: '',
      email: '',
      password: ''
    };

  }

  async registro(){

    this.api.newUser(this.signup).subscribe(
      response => {
        alert('user ' + this.signup.usuario + ' has been created!')
      },
      error => console.log('error',error)
    );

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Debe llenar todos los campos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    /*var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Debe llenar todos los campos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    var user = {
      usuario: f.usuario,
      email: f.email,
      password: f.password
    }

    localStorage.setItem('user', JSON.stringify(user));
    var retrievedObject = localStorage.getItem('user');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));*/
  }
}

