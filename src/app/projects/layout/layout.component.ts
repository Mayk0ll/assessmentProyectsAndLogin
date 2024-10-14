import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { getPrimeNGModules } from '../../prime-ng/prime-ng.component';
import { UserService } from '@services/index.ts';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ RouterModule, ...getPrimeNGModules() ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css', '../../app.component.css']
})

export default class LayoutComponent {

  private userService = inject(UserService);
  private router = inject(Router);

  public items: MenuItem[] = [];

  logout(){
    console.log('Cerrar sesión');
    this.userService.logout();
    this.router.navigate(['/login']);
  }



  ngOnInit(){
    this.items = [
      {
        label:'projectos',
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
