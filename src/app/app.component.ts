import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private primengConfig = inject(PrimeNGConfig);

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  title = 'testAngularInnclod';
}
