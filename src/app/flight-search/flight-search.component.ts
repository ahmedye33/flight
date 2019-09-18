import {Component, OnInit, ViewChild} from '@angular/core';
import {FlightService} from '../services/flight.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {
  flightSearchForm: FormGroup;

  minDate = new Date();
  maxDate = new Date(2021, 11, 31);
  hideContent = true;

  departureAirportCode = new FormControl('', [Validators.required]);
  arrivalAirportCode = new FormControl('', [Validators.required]);
  departureDate = new FormControl(null, [Validators.required]);
  returnDate = new FormControl(null, [Validators.required]);

  displayedColumns: string[] = ['logo', 'AirlineName', 'OutboundFlightsDuration', 'InboundFlightsDuration', 'TotalAmount'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private flightService: FlightService) {
  }

  ngOnInit() {
    this.flightSearchForm = new FormGroup({
      departureAirportCode: this.departureAirportCode,
      arrivalAirportCode: this.arrivalAirportCode,
      departureDate: this.departureDate,
      returnDate: this.returnDate
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFlightSearch(formValues: any) {
    if (this.flightSearchForm.invalid) {
      return;
    }
    this.hideContent = false;
    this.flightService.getFlight().subscribe((flightData: any) => {
      this.dataSource.data = flightData;
      this.dataSource.sort = this.sort;
    });
    // this.flightData = this.flightService.getFlight();
  }

  tabChanged(selectedIndex: any) {
    if (selectedIndex === 0) {
      this.returnDate.enable();
    } else {
      this.returnDate.setValue(null);
      this.returnDate.disable();
    }
  }

}
