import { Component } from '@angular/core';
import { getPrimeNGModules } from '../../../prime-ng/prime-ng.component';

@Component({
  selector: 'app-view-proyect',
  standalone: true,
  imports: [...getPrimeNGModules()],
  templateUrl: './view-proyect.component.html',
  styleUrl: './view-proyect.component.css'
})
export default class ViewProyectComponent {

}
