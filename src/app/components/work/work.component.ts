import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})

export class WorkComponent implements OnInit {

  private debug: boolean = false;

  public lang: string = '';
  public dataLang: any = [];
  public projectId: number = 0;
  public projectsIndex: any = [];
  public projects: any = [];
  public shownProject: number = 1;

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
    this.GetData(this.projectId);
    this.GetDataLang(this.lang);
    this.prevProject();
    this.nextProject();
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
  
  GetData(projectId: number){
    if (this.debug) {console.log('*** LOADING DATA...');}
    this._dataAPI.getContent().subscribe(res => {
      this.projects = res[this.lang].projects;
      for (let i = 0; i < this.projectsIndex.length; i++) {
        this.projectId = i+1;
        if (this.projectId === this.shownProject) {
          if (this.projects[this.projectId]) {
            this.projects[this.projectId].class = 'd-block';
          }
        } else {
          this.projects[i].class = 'd-none';
        };
        this.projects[i]['id'] = this.projectId;
        if (this.debug) {
          console.log("****** EACH PROJECT DATA: ", this.projects[i]);
        };
      };
    });
  };

  GetDataLang(lang: string) {
    this._dataAPI.getContentLang().subscribe(res => {
      this.dataLang = res[lang];
    });
  };

  nextProject() {
    this.GetData(this.projectId);
    this.shownProject++;
  }
  
  prevProject() {
    this.GetData(this.projectId);
    this.shownProject--;
  }
}
