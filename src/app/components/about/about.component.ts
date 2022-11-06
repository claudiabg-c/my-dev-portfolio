import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  private debug: boolean = false;

  public lang: string = "";
  public dataLang: any = [];
  public data: any = [];

  constructor(
    private _activeRouter: ActivatedRoute,
    private _dataAPI: DataService
  ) {
    this._activeRouter.params.subscribe(params => {
      if (this.debug) {console.log('*** LOADING PARAMS...'); console.log(params);}
      this.lang = params['lang'];
    });
  }

  ngOnInit(): void {
    this.GetDataLang(this.lang);
    this.GetData();
  }

  GetDataLang(lang: string) {
    this._dataAPI.getContentLang().subscribe(res => {
      this.dataLang = res[lang];
    });
  }

  GetData(){
    this._dataAPI.getContent().subscribe(res => {
      this.data = res[this.lang];
      if (this.debug) {
        console.log("****** DATA: ", this.data);
      }
    });
  }
}
