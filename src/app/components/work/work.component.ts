import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  private debug: boolean = true;

  public projectId: string = '';
  public projectsIndex: any = [];

  constructor(
    private _dataAPI: DataService,
  ) { }

  ngOnInit(): void {
    this.GetIndex(this.projectId);
  }

  GetIndex(projectId: string) {
    this._dataAPI.getIndex().subscribe(res => {
      this.projectsIndex = res.projects;
      let numberOfProjects = res.projects.length;
      if (this.debug) {
        console.log("*** TOTAL PROJECTS: ", numberOfProjects);
        console.log("*** PROJECTS DATA:", this.projectsIndex);
      }
    });
  }

}
