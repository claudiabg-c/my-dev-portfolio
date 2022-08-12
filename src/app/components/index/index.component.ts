import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})

export class IndexComponent implements OnInit {

  private debug: boolean = false;
  public langs: any = [];
  public config: any = [];

  constructor(
    private _router: Router,
    private _dataAPI: DataService
  ) {
    if (this.debug){console.log('*** LOADING INDEX...');}
  }

  ngOnInit(): void {
    if (this.debug) {console.log('*** INITIALIZING...');}
    this.GetConfig();
  }

  GetConfig(){
    if (this.debug){console.log('*** LOADING CONFIG...');}
    this._dataAPI.getConfig().subscribe(res => {
      this.config = res.config;
      this.langs = this.config.languages.langs;

      if (this.debug) {
        console.log("****** CONFIG: ", this.config);
        console.log("****** LANGS: ", this.langs);
        console.log("****** ACTIVE LANGUAGES: " + this.langs.length);
      }
      this.LoadPage()
    });
  }

  LoadPage(){
    if (this.debug){console.log('*** LOADING PAGE...');}
    const userLang = navigator.language;
    if (userLang.startsWith('es')) {
      const langDefault = this.langs[1];
      document.documentElement.lang = langDefault;
      this._router.navigate([ '/' + langDefault + '/home']);
      if (this.debug) {console.log("Redirected to: HOME PAGE (" + langDefault + ")");}
    } else {
      const langDefault = this.langs[0];
      document.documentElement.lang = langDefault;
      this._router.navigate([ '/' + langDefault + '/home']);
      if (this.debug) {console.log("Redirected to: HOME PAGE (" + langDefault + ")");}
    }
  }
}
