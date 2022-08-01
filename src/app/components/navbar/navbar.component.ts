import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private debug: boolean = true;

  public config: any = [];
  public lang: string = "";
  public path: string = "";
  public data: any = [];

  constructor(
    private _activeRouter: ActivatedRoute,
    private _dataAPI: DataService
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
  }

  GetConfig(){
    this._dataAPI.getConfig().subscribe(res => {
      this.config = res.config;
      if (this.debug) {
        console.log("****** CONFIG INFO: ", this.config);
      }
    });
  }

  GetData(){
    if (this.debug) {console.log('*** LOADING DATA...');}
    this._dataAPI.getContent().subscribe(res => {
      this.data = res[this.lang];

      if (this.debug) {
        console.log("****** DATA: ");
        console.log(this.data);
      }
    });
  }
}
