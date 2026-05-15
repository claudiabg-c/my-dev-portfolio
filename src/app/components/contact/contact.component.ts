import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public lang: string = '';
  public data: any = {};

  formData = {
    name: '',
    email: '',
    message: ''
  };

  formSubmitted = false;
  formVisible = true;
  formSending = false;
  formError = false;

  constructor(
    private _activeRouter: ActivatedRoute,
    private _dataAPI: DataService
  ) {
    this._activeRouter.params.subscribe(params => {
      this.lang = params['lang'];
    });
  }

  ngOnInit(): void {
    this.GetData();
  }

  GetData(): void {
    this._dataAPI.getContent().subscribe(res => {
      this.data = res.contact?.[this.lang] || {};
    });
  }

  submitForm(contactForm: NgForm): void {
    if (contactForm.invalid || this.formSending) {
      contactForm.control.markAllAsTouched();
      return;
    }

    this.formSending = true;
    this.formError = false;

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
          contactForm.resetForm();
        } else {
          this.formError = true;
        }
      })
      .catch(() => {
        this.formError = true;
      })
      .finally(() => {
        this.formSending = false;
      });
  }
}
