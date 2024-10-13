import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {PanelModule} from 'primeng/panel';
import {FieldsetModule} from 'primeng/fieldset';
import {TableModule} from 'primeng/table';



export function getPrimeNGModules() {
  return [
    ButtonModule,
    MenubarModule,
    PanelModule,
    FieldsetModule,
    TableModule
  ];
}
