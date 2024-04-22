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
    this.GetDataLang(this.lang);
  }

  GetIndex() {
    this._dataAPI.getIndex().subscribe(res => {
      this.projectsIndex = res.projects;
      let numberOfProjects = res.projects.length;
      if (this.debug) {
        console.log("*** TOTAL PROJECTS: ", numberOfProjects);
        console.log("*** PROJECTS INDEX:", this.projectsIndex);
      }
      this.GetData(0);
    });
  }

  GetData(projectId: number){
    if (this.debug) {console.log('*** LOADING DATA...');}
    this._dataAPI.getContent().subscribe(res => {
      const loadedProjects = res[this.lang].projects;
      for (let i = 0; i < this.projectsIndex.length; i++) {
        const project = loadedProjects[i];
        project.id = i + 1;
        if (project.id === this.shownProject) {
          project.class = 'shown';
        } else {
          project.class = 'd-none';
        }
        this.projects.push(project);
        if (this.debug) {
          console.log("****** EACH PROJECT DATA: ", project);
        }
      }
    });
  };

  GetDataLang(lang: string) {
    this._dataAPI.getContentLang().subscribe(res => {
      this.dataLang = res[lang];
    });
  };

  nextProject() {
    if (this.shownProject < this.projectsIndex.length) {
      this.shownProject++;
      this.updateProjectVisibility();
    }
  }
  
  prevProject() {
    if (this.shownProject > 1) {
      this.shownProject--;
      this.updateProjectVisibility();
    }
  }
  
  private updateProjectVisibility() {
    for (let i = 0; i < this.projects.length; i++) {
      if (i === this.shownProject - 1) {
        this.projects[i].class = 'shown';
      } else {
        this.projects[i].class = 'd-none';
      }
    }
  }
}
