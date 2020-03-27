import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrownTestModule } from '../../../test.module';
import { SupplyPointResourceDetailComponent } from 'app/entities/supply-point-resource/supply-point-resource-detail.component';
import { SupplyPointResource } from 'app/shared/model/supply-point-resource.model';

describe('Component Tests', () => {
  describe('SupplyPointResource Management Detail Component', () => {
    let comp: SupplyPointResourceDetailComponent;
    let fixture: ComponentFixture<SupplyPointResourceDetailComponent>;
    const route = ({ data: of({ supplyPointResource: new SupplyPointResource('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrownTestModule],
        declarations: [SupplyPointResourceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SupplyPointResourceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SupplyPointResourceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load supplyPointResource on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.supplyPointResource).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
