import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  public year: number = 0;
  public lang: string = '';
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
    this.getYear();
    this.GetData();
  }

  getYear(): void {
    this.year = new Date().getFullYear();
  }

  GetData(): void {
    this._dataAPI.getContent().subscribe(res => {
      this.data = res.footer?.[this.lang] || {};
    });
  }
}
