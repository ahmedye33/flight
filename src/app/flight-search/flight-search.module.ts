import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './flight-search.component';
import {RouterModule} from '@angular/router';
import {flightSearchRoute} from './flight-search-routing.module';
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule, MatSortModule,
  MatTableModule, MatTabsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [FlightSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(flightSearchRoute),
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    TranslateModule
  ],
})
export class FlightSearchModule { }
