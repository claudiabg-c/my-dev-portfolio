import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

interface Project {
  id: number;
  image: string;
  year: string;
  link: string;
  class?: string;
  title: string;
  description: string;
  role: string;
  technologies: string;
}

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  private debug: boolean = false;
  public lang: string = '';
  public dataLang: any = [];
  public projects: Project[] = [];
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
      const loadedProjects = res.projects as Project[];
  
      this.projects = loadedProjects.map((project: any, index: number) => {
        const i18n = project.i18n[this.lang];
        return {
          ...project,
          ...i18n,
          id: index + 1,
          class: (index + 1 === this.shownProject) ? 'shown' : 'd-none'
        };
      });
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
    this.projects = this.projects.map((project: Project, index: number) => ({
      ...project,
      class: (index + 1 === this.shownProject) ? 'shown' : 'd-none'
    }));
    setTimeout(() => {
      const elements = document.querySelectorAll('.each-project');
      elements.forEach(el => el.classList.add('transition-fix'));
    }, 0);
  }
}