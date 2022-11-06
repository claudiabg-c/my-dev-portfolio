import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  private debug: boolean = true;

  public lang: string = '';
  public projectId: string = '';
  public projectsIndex: any = [];
  public projects: any = [];

  constructor(
    private _activeRouter: ActivatedRoute,
    private _dataAPI: DataService
  ) {
    this._activeRouter.params.subscribe(params => {
      this.lang = params['lang'];
    });
  }

  ngOnInit(): void {
    this.GetIndex();
    this.GetData();
  }

  GetIndex() {
    this._dataAPI.getIndex().subscribe(res => {
      this.projectsIndex = res.projects;
      let numberOfProjects = res.projects.length;
      if (this.debug) {
        console.log("*** TOTAL PROJECTS: ", numberOfProjects);
        console.log("*** PROJECTS INDEX:", this.projectsIndex);
      }
    });
  }
  
  GetData(){
    if (this.debug) {console.log('*** LOADING DATA...');}
    this._dataAPI.getContent().subscribe(res => {
      this.projects = res[this.lang].projects;
      if (this.debug) {
        console.log("****** DATA: ", this.projects);
      }
      for (let i = 0; i < this.projectsIndex.length; i++) {
        this.projectId = '"' + i+1 + '"';
      }

    });
  }
}
