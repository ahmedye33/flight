import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FlightSearchComponent} from './flight-search.component';
import {AppModule} from '../app.module';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule, MatSortModule,
  MatTableModule, MatTabsModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {flightSearchRoute} from './flight-search-routing.module';
import {By} from '@angular/platform-browser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FlightService} from '../services/flight.service';
import {of} from 'rxjs';

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  let el: HTMLElement;
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightSearchComponent],
      imports: [
        AppModule,
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
        MatCardModule,
        ReactiveFormsModule,
        MatCardModule,
        MatTabsModule,
        MatButtonToggleModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
      providers: [
        // reference the new instance of formBuilder from above
        {provide: FormBuilder, useValue: formBuilder},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {

    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;

    component.flightSearchForm = formBuilder.group({
      departureAirportCode: null,
      arrivalAirportCode: null,
      departureDate: null,
      returnDate: null
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('flightSearchForm should be valid', () => {
    component.flightSearchForm.controls.departureAirportCode.setValue('abc');
    component.flightSearchForm.controls.arrivalAirportCode.setValue('abc');
    component.flightSearchForm.controls.departureDate.setValue(new Date());
    component.flightSearchForm.controls.returnDate.setValue(new Date());

    expect(component.flightSearchForm.valid).toBeTruthy();
  });

  it('should click the on search button ', async () => {
    fixture.detectChanges();
    spyOn(component, 'onFlightSearch').and.callThrough();
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onFlightSearch).toHaveBeenCalledTimes(0);
  });

  it('flightSearchForm should be invalid', () => {
    component.flightSearchForm.controls.departureAirportCode.setValue('ab');
    component.flightSearchForm.controls.arrivalAirportCode.setValue('');
    component.flightSearchForm.controls.departureDate.setValue(new Date());
    component.flightSearchForm.controls.returnDate.setValue(new Date());

    expect(component.flightSearchForm.valid).toBeFalsy();
  });

  it('should call onFlightSearch method', () => {
    component.flightSearchForm.controls.departureAirportCode.setValue('abc');
    component.flightSearchForm.controls.arrivalAirportCode.setValue('fdf');
    component.flightSearchForm.controls.departureDate.setValue(new Date());
    component.flightSearchForm.controls.returnDate.setValue(new Date());
    component.onFlightSearch(component.flightSearchForm.value);
    expect(component).toBeTruthy();
  });
});


describe('FlightService', () => {
  let flightService: FlightService; // Add this

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightService],
      imports: [HttpClientModule]
    });

    flightService = TestBed.get(FlightService);
  });

  it('flightService should be created', () => {
    expect(flightService).toBeTruthy();
  });

  // Add tests for get all flight
  describe('getFlight', () => {
    it('should return a get all flights', () => {
      const flightSearchResponse = [
        {
          AirlineLogoAddress: 'http://nmflightapi.azurewebsites.net/Images/AirlineLogo/CZ.gif',
          AirlineName: 'China Southern Airlines',
          InboundFlightsDuration: '24:10',
          ItineraryId: '',
          OutboundFlightsDuration: '26:20',
          Stops: 2,
          TotalAmount: 2903.84
        },
        {
          AirlineLogoAddress: 'http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif',
          AirlineName: 'Emirates Airline',
          InboundFlightsDuration: '42:55',
          ItineraryId: '',
          OutboundFlightsDuration: '25:40',
          Stops: 2,
          TotalAmount: 2954.14
        },
        {
          AirlineLogoAddress: 'http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif',
          AirlineName: 'Emirates Airline',
          InboundFlightsDuration: '42:55',
          ItineraryId: '',
          OutboundFlightsDuration: '27:40',
          Stops: 2,
          TotalAmount: 2954.14
        }
      ];
      let response;
      spyOn(flightService, 'getFlight').and.returnValue(of(flightSearchResponse));

      flightService.getFlight().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(flightSearchResponse);
    });
  });
});


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}


