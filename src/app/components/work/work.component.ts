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
    this.GetDataLang(this.lang);
    this.GetData();
  }

  GetData() {
    this._dataAPI.getContent().subscribe(res => {
      const loadedProjects = res[this.lang].projects;
      for (let i = 0; i < loadedProjects.length; i++) {
        const project = loadedProjects[i];
        project.id = i + 1;  // Agregar ID a cada proyecto
        project.class = project.id === this.shownProject ? 'shown' : 'd-none';
        this.projects.push(project);

        if (this.debug) {
          console.log("****** EACH PROJECT DATA: ", project);
        }
      }

      if (this.debug) {
        console.log("*** TOTAL PROJECTS: ", this.projects.length);
      }
    });
  }

  GetDataLang(lang: string) {
    this._dataAPI.getContentLang().subscribe(res => {
      this.dataLang = res[lang];
    });
  }

  nextProject() {
    if (this.shownProject < this.projects.length) {
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
      this.projects[i].class = i === this.shownProject - 1 ? 'shown' : 'd-none';
    }
  }
}