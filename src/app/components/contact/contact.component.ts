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
  formVisible = true;

  constructor() { }

  ngOnInit(): void { }

  submitForm(contactForm: NgForm) {
    if (contactForm.valid) {
      fetch('https://formspree.io/f/mayrapjn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      })
        .then(response => {
          if (response.ok) {
            this.formSubmitted = true;
            this.formVisible = false;
          } else {
            console.error('Error en el envío del formulario');
          }
        })
        .catch(error => {
          console.error('Error en el envío del formulario', error);
        });
    } else {
      console.error('El formulario no es válido');
    }
  }
}
