import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private debug: boolean = false;

  public config: any = [];
  public data: any = [];
  public path: string = "";
  public lang: string = "";
  public otherLang: string = "";
  public selectLang: string = "";
  public dataLang: any = [];
  public langData: any = [];
  public otherLangData: any = [];
  public rrss: any = {};

  constructor(
    private _activeRouter: ActivatedRoute,
    private _dataAPI: DataService,
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
    this.changeNavbarOpacity();
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

      this.rrss = res.rrss;
      if (this.debug) {
        console.log("****** DATA: ", this.data);
        console.log("****** RRSS: ", this.rrss);
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

  goToAboutMe(): void {
    const aboutMe = document.getElementById('about-me');
    aboutMe?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  goToWork(): void {
    const work = document.getElementById('work');
    work?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  goToContact(): void {
    const contact = document.getElementById('contact');
    contact?.scrollIntoView({
      behavior: 'smooth'
    })
  }
  
  reloadThePage(): void {
    this._router.navigateByUrl('/' + this.otherLang + '/home', {skipLocationChange: false}).then(() => {
      window.location.reload();
    });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  goToLink(url: string){
    window.open(url, '_blank', 'location=yes,width=1000,height=700,scrollbars=yes,status=yes');
  }

  changeNavbarOpacity() {
    const navbar = document.querySelector('.container-navbar')
    const onScroll = () => {
      const scroll = document.documentElement.scrollTop;
      if (scroll > 0) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', onScroll)
  };
}
