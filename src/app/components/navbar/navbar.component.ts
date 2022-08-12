import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private debug: boolean = true;

  public config: any = [];
  public data: any = [];
  public path: string = "";
  public lang: string = "";
  public otherLang: string = "";
  public selectLang: string = "";
  public dataLang: any = [];
  public langData: any = [];
  public otherLangData: any = [];

  constructor(
    private _activeRouter: ActivatedRoute,
    private _dataAPI: DataService,
    public _location: Location,
    public _router: Router
  ) {
    this._activeRouter.params.subscribe(params => {
      if (this.debug) {console.log('*** LOADING PARAMS...'); console.log(params);}
      this.lang = params['lang'];
      this.path = params['lang'] + "/home";
    });
  }

  ngOnInit(): void {
    this.GetConfig();
    this.GetData();
    this.GetDataLang(this.lang);
  }

  GetConfig(){
    this._dataAPI.getConfig().subscribe(res => {
      this.config = res.config;
      if (this.debug) {
        console.log("****** CONFIG INFO: ", this.config);
      }
    });
  }

  GetData() {
    if (this.debug) {console.log('*** LOADING DATA...');}
    this._dataAPI.getContent().subscribe(res => {
      this.data = res[this.lang];

      if (this.debug) {
        console.log("****** DATA: ");
        console.log(this.data);
      }
    });
  }
  
  GetDataLang(lang: string) {
    this.lang === 'es' ? this.otherLang = 'en' : this.otherLang = 'es';
    this._dataAPI.getContentLang().subscribe(res => {
      this.langData = res[lang].language;
      this.otherLangData = res[this.otherLang].language;
      this.selectLang = res[lang].selectLang;
      this.dataLang = res[lang];
      

      if (this.debug) {
        console.log("****** LANG DATA: ", this.langData);
      }
    });
  }

  showOtherLangs(): void {
    document.querySelector('.dropdown-content')?.classList.toggle('d-block')
  }
  
  reloadThePage(): void {
    this._router.navigateByUrl('/' + this.otherLang + '/home', {skipLocationChange: false}).then(() => {
      window.location.reload();
    });
  }

  goToLink(url: string){
    window.open(url, '_blank', 'location=yes,width=1000,height=700,scrollbars=yes,status=yes');
  }
}
