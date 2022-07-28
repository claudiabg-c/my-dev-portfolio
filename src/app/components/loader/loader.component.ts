import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  private debug: boolean = false;
  public dataLang: any = [];
  public lang: string = "";

  constructor(
    private _activeRouter: ActivatedRoute,
    private _dataAPI: DataService,
  ) {
    this._activeRouter.params.subscribe(parametros => {
      if (this.debug) {console.log('*** LOADING PARAMS...', parametros);}
      this.lang = parametros['lang'];
    })
  }

  ngOnInit(): void {
    this.GetDataLang(this.lang);
  }

  GetDataLang(lang:string){
    if (this.debug) {console.log('*** LOADING DATA LANG...');}
    this._dataAPI.getContentLang().subscribe(res => {
      this.dataLang = res[lang];

      if (this.debug) {
        console.log("****** DATA LANG: ", this.dataLang);
      }
    });
  }
}
