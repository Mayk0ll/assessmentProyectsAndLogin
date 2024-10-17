import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';




export function getPrimeNGModules() {
  return [
    ButtonModule,
    FieldsetModule,
    InputTextModule,
    MenubarModule,
    PanelModule,
    TableModule,
    CardModule,
    BadgeModule,
    CheckboxModule,
    DialogModule
  ];
}
