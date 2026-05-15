import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public lang: string = '';
  public dataLang: any = {};
  public data: any = {};

  constructor(
    private _activeRouter: ActivatedRoute,
    private _dataAPI: DataService
  ) {
    this._activeRouter.params.subscribe(params => {
      this.lang = params['lang'];
    });
  }

  ngOnInit(): void {
    this.GetDataLang(this.lang);
    this.GetData();
  }

  GetDataLang(lang: string): void {
    this._dataAPI.getContentLang().subscribe(res => {
      this.dataLang = res[lang];
    });
  }

  GetData(): void {
    this._dataAPI.getContent().subscribe(res => {
      this.data = {
        about_description: res.about?.[this.lang] || ''
      };
    });
  }
}