import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrownTestModule } from '../../../test.module';
import { SupplyPointDetailComponent } from 'app/entities/supply-point/supply-point-detail.component';
import { SupplyPoint } from 'app/shared/model/supply-point.model';

describe('Component Tests', () => {
  describe('SupplyPoint Management Detail Component', () => {
    let comp: SupplyPointDetailComponent;
    let fixture: ComponentFixture<SupplyPointDetailComponent>;
    const route = ({ data: of({ supplyPoint: new SupplyPoint('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrownTestModule],
        declarations: [SupplyPointDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SupplyPointDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SupplyPointDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load supplyPoint on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.supplyPoint).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
