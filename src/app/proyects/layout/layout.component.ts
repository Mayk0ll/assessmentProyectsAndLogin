import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { getPrimeNGModules } from '../../prime-ng/prime-ng.component';
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ RouterModule, ...getPrimeNGModules() ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css', '../../app.component.css']
})

export default class LayoutComponent {

  public items: MenuItem[] = [];




  ngOnInit(){
    this.items = [
      {
        label:'Proyectos',
        icon:'pi pi-globe'
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-power-off',
        styleClass: 'logout-button'
      }
    ];
  }

}
