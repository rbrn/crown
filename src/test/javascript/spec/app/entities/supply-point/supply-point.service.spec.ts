import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SupplyPointService } from 'app/entities/supply-point/supply-point.service';
import { ISupplyPoint, SupplyPoint } from 'app/shared/model/supply-point.model';

describe('Service Tests', () => {
  describe('SupplyPoint Service', () => {
    let injector: TestBed;
    let service: SupplyPointService;
    let httpMock: HttpTestingController;
    let elemDefault: ISupplyPoint;
    let expectedResult: ISupplyPoint | ISupplyPoint[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SupplyPointService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new SupplyPoint(
        'ID',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        false,
        false,
        false,
        0,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a SupplyPoint', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new SupplyPoint()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SupplyPoint', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            address: 'BBBBBB',
            primaryContactName: 'BBBBBB',
            zip: 'BBBBBB',
            phonenumber: 'BBBBBB',
            latx: 1,
            longy: 1,
            city: 'BBBBBB',
            state: 'BBBBBB',
            isDistributor: true,
            isHealthcare: true,
            hasSterilization: true,
            priority: 1,
            notes: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SupplyPoint', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            address: 'BBBBBB',
            primaryContactName: 'BBBBBB',
            zip: 'BBBBBB',
            phonenumber: 'BBBBBB',
            latx: 1,
            longy: 1,
            city: 'BBBBBB',
            state: 'BBBBBB',
            isDistributor: true,
            isHealthcare: true,
            hasSterilization: true,
            priority: 1,
            notes: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SupplyPoint', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
