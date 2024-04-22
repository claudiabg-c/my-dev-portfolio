import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  formSubmitted = false;
  contactForm: NgForm | undefined;

  constructor() { }

  ngOnInit(): void {
    if (!this.contactForm) {
      setTimeout(() => {
        this.contactForm = {} as NgForm;
      });
    }
  }

  submitForm(contactForm: NgForm) {
    this.contactForm = contactForm;
    // Aquí puedes agregar lógica para enviar los datos del formulario, por ejemplo, a través de un servicio HTTP
    // Una vez que el envío se complete con éxito, establece formSubmitted en true
    this.formSubmitted = true;
  }
}