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
  formVisible = true;

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
    this.formSubmitted = true;
    this.formVisible = false;
  }
}