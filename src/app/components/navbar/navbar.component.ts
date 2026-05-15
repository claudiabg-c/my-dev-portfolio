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
  public path: string = '';
  public lang: string = '';
  public otherLang: string = '';
  public selectLang: string = '';
  public dataLang: any = [];
  public langData: any = [];
  public otherLangData: any = [];
  public rrss: any = {};
  public isMenuOpen: boolean = false;

  constructor(
    private _activeRouter: ActivatedRoute,
    private _dataAPI: DataService,
    public _router: Router
  ) {
    this._activeRouter.params.subscribe(params => {
      if (this.debug) { console.log('*** LOADING PARAMS...'); console.log(params); }
      this.lang = params['lang'];
      this.path = params['lang'] + '/home';
    });
  }

  ngOnInit(): void {
    this.GetConfig();
    this.GetData();
    this.GetDataLang(this.lang);
    this.changeNavbarOpacity();
  }

  GetConfig(): void {
    this._dataAPI.getConfig().subscribe(res => {
      this.config = res.config;
    });
  }

  GetData(): void {
    this._dataAPI.getContent().subscribe(res => {
      this.data = res[this.lang];
      this.rrss = res.rrss;
    });
  }

  GetDataLang(lang: string): void {
    this.lang === 'es' ? this.otherLang = 'en' : this.otherLang = 'es';

    this._dataAPI.getContentLang().subscribe(res => {
      this.langData = res[lang].language;
      this.otherLangData = res[this.otherLang].language;
      this.selectLang = res[lang].selectLang;
      this.dataLang = res[lang];
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  showOtherLangs(): void {
    document.querySelector('.dropdown-content')?.classList.toggle('d-block');
  }

  goToAboutMe(): void {
    this.scrollToSection('about-me');
  }

  goToWork(): void {
    this.scrollToSection('work');
  }

  goToContact(): void {
    this.scrollToSection('contact');
  }

  reloadThePage(): void {
    this._router.navigateByUrl('/' + this.otherLang + '/home', { skipLocationChange: false }).then(() => {
      window.location.reload();
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.closeMenu();
  }

  goToLink(url: string): void {
    window.open(url, '_blank', 'location=yes,width=1000,height=700,scrollbars=yes,status=yes');
    this.closeMenu();
  }

  changeNavbarOpacity(): void {
    const navbar = document.querySelector('.container-navbar');

    const onScroll = () => {
      const scroll = document.documentElement.scrollTop;

      if (scroll > 0) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll);
  }

  private scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);

    section?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    this.closeMenu();
  }
}
