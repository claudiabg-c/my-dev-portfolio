import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private debug: boolean = true;

  public lang: string = "";
  public dataLang: any = [];

  constructor(
    private _activeRouter: ActivatedRoute,
    private _dataAPI: DataService,
    public _router: Router
  ) {
    this._activeRouter.params.subscribe(params => {
      if (this.debug) {console.log('*** LOADING PARAMS...', params);}
      this.lang = params['lang'];
    });
  }

  ngOnInit(): void {
    this.GetDataLang(this.lang);
  }

  GetDataLang(lang: string) {
    this._dataAPI.getContentLang().subscribe(res => {
      this.dataLang = res[lang];
    });
  }
}
