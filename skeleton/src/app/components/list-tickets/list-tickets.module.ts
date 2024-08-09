import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbButtonsModule, NgbDropdownModule, NgbPaginationModule, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import {BarRatingModule} from 'ngx-bar-rating';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ListTicketsRoutingModule } from './list-tickets-routing.module';
import { ListTicketsComponent } from './list-tickets.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListTicketsComponent],
  imports: [
    CommonModule,
    NgbDropdownModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    BarRatingModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbButtonsModule,
    NgbPaginationModule,
    ListTicketsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ListTicketsModule { }
