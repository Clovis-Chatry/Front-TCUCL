import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Router} from '@angular/router';
import {OngletService} from './onglet.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AnneeService} from '../../services/annee.service';
import {Subscription} from 'rxjs';

type YearRange = { label: string; value: number };

@Component({
  selector: 'app-header-saisie-donnees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header-saisie-donnees.component.html',
  styleUrls: ['./header-saisie-donnees.component.scss']
})
export class HeaderSaisieDonneesComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private ongletService: OngletService, private auth: AuthService, private yearService: AnneeService) {
    this.currentYear = new Date().getFullYear();
    this.selectedYear = this.currentYear;
    const user = this.auth.getUserInfo()();
    if (user?.entiteId) {
      this.entiteId = user.entiteId;
    } else {
      console.error('Impossible de récupérer l’entiteId de l’utilisateur.');
    }
  }

  @Input() PageTitle: string = '';
  @Input() LogoSrc: string = '';
  @Input() entiteId!: number;

  ongletIdMap: { [key: string]: number } = {};

  tabs = ['Energie', 'Emissions fugitives', 'Mobilite dom-trav', 'Autre mobilite en France', 'Mob internationale', 'Batiments',
    'Parkings', 'Auto', 'Numerique', 'Autre immob', 'Achats', 'Dechets'];
  startIndex = 0;
  visibleCount = 12;

  activeTab: string | null = null;
  currentYear: number;
  selectedYear: number;
  years: YearRange[] = [];

  @ViewChild('tabsContainer') tabsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('tabsElement') tabsRef!: ElementRef<HTMLDivElement>; // nom changé
  @ViewChildren('tabBtn') tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;
  private yearSub?: Subscription;
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.years = Array.from({length: this.currentYear - 2018}, (_, i) => {
      const end = this.currentYear - i;
      const start = end - 1;
      return {label: `${start}-${end}`, value: end};
    });

    this.yearSub = this.yearService.selectedYear$.subscribe(year => {
      this.selectedYear = year;
      this.loadOngletIds();
    });
  }

  onYearChange(newYear: number): void {
    this.yearService.setSelectedYear(newYear);
    this.loadOngletIds();
  }

  ngAfterViewInit(): void {
    this.updateVisibleCount();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleCount();
  }

  updateVisibleCount() {
    if (!this.tabsContainer || this.tabButtons.length === 0) return;

    const containerWidth = this.tabsContainer.nativeElement.offsetWidth;
    const tabWidth = this.tabButtons.first.nativeElement.offsetWidth;
    const gap = parseFloat(getComputedStyle(this.tabsRef.nativeElement).gap || '0');

    const count = Math.floor((containerWidth + gap) / (tabWidth + gap));
    this.visibleCount = Math.max(1, Math.min(this.tabs.length, count));

    if (this.startIndex + this.visibleCount > this.tabs.length) {
      this.startIndex = Math.max(0, this.tabs.length - this.visibleCount);
    }
  }

  loadOngletIds(): void {
    this.ongletService.getOngletIds(this.entiteId, this.selectedYear)?.subscribe({
      next: (result) => {
        this.ongletIdMap = result;
      },
      error: (err) => {
        console.error('Erreur récupération onglet IDs:', err);
      }
    });
  }

  visibleTabs() {
    return this.tabs.slice(this.startIndex, this.startIndex + this.visibleCount);
  }

  scrollLeft() {
    if (this.startIndex > 0) {
      this.startIndex--;
    }
  }

  scrollRight() {
    if (this.startIndex + this.visibleCount < this.tabs.length) {
      this.startIndex++;
    }
  }

  navigateTo(tab: string) {
    this.activeTab = tab;

    const urlPart = this.tabToRoute[tab];
    if (!urlPart) {
      console.error('Tab non reconnu:', tab);
      return;
    }

    const ongletId = this.ongletIdMap[urlPart];
    if (!ongletId) {
      console.error('ID introuvable pour l\'onglet', urlPart);
      return;
    }

    this.router.navigate([`/${urlPart}/${ongletId}`]);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  getTabClass(tab: string) {
    return this.activeTab === tab ? 'tab active' : 'tab';
  }

  goToTrajectoire() {
    this.router.navigate([`/trajectoire`]);
  }

  private tabToRoute: { [key: string]: string } = {
    'Energie': 'energieOnglet',
    'Emissions fugitives': 'emissionFugitiveOnglet',
    'Mobilite dom-trav': 'mobiliteDomicileTravailOnglet',
    'Autre mobilite en France': 'autreMobFrOnglet',
    'Mob internationale': 'mobInternationalOnglet',
    'Batiments': 'batimentImmobilisationMobilierOnglet',
    'Parkings': 'parkingVoirieOnglet',
    'Auto': 'vehiculeOnglet',
    'Numerique': 'numeriqueOnglet',
    'Autre immob': 'autreImmobilisationOnglet',
    'Achats': 'achatOnglet',
    'Dechets': 'dechetOnglet'
  };
}
