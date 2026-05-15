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
  public technologies: string[] = [];
  public selectedTech: string = 'All';

  constructor(
    private _activeRouter: ActivatedRoute,
    private _dataAPI: DataService
  ) {
    this._activeRouter.params.subscribe(params => {
      this.lang = params['lang'];
      this.selectedTech = this.lang === 'es' ? 'Todos' : 'All';
    });
  }

  ngOnInit(): void {
    this.GetDataLang(this.lang);
    this.GetData();
  }

  get allLabel(): string {
    return this.lang === 'es' ? 'Todos' : 'All';
  }

  get featuredProject(): Project | null {
    const matches = this.filteredProjects;
    return matches && matches.length ? matches[0] : null;
  }

  get filteredProjects(): Project[] {
    if (this.selectedTech === this.allLabel) {
      return this.projects;
    }

    return this.projects.filter(project =>
      this.getProjectTechnologies(project).some(tech => tech.toLowerCase() === this.selectedTech.toLowerCase())
    );
  }

  GetData(): void {
    this._dataAPI.getContent().subscribe(res => {
      const loadedProjects = res.projects as Project[];

      this.projects = loadedProjects.map((project: any, index: number) => {
        const i18n = project.i18n[this.lang];

        return {
          ...project,
          ...i18n,
          id: index + 1
        };
      });

      this.setTechnologies();

      if (this.debug) {
        console.log('****** PROJECTS: ', this.projects);
        console.log('****** TECHNOLOGIES: ', this.technologies);
      }
    });
  }

  GetDataLang(lang: string): void {
    this._dataAPI.getContentLang().subscribe(res => {
      this.dataLang = res[lang];
    });
  }

  filterProjects(tech: string): void {
    this.selectedTech = tech;
  }

  getProjectTechnologies(project: Project): string[] {
    if (!project?.technologies) {
      return [];
    }

    return project.technologies
      .split(',')
      .map(tech => tech.trim())
      .filter(Boolean);
  }

  private setTechnologies(): void {
    const projectTechnologies = this.projects
      .flatMap(project => this.getProjectTechnologies(project));

    this.technologies = [this.allLabel, ...Array.from(new Set(projectTechnologies))];
  }
}
