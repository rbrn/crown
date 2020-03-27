import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrownTestModule } from '../../../test.module';
import { SupplyPointUpdateComponent } from 'app/entities/supply-point/supply-point-update.component';
import { SupplyPointService } from 'app/entities/supply-point/supply-point.service';
import { SupplyPoint } from 'app/shared/model/supply-point.model';

describe('Component Tests', () => {
  describe('SupplyPoint Management Update Component', () => {
    let comp: SupplyPointUpdateComponent;
    let fixture: ComponentFixture<SupplyPointUpdateComponent>;
    let service: SupplyPointService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrownTestModule],
        declarations: [SupplyPointUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SupplyPointUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupplyPointUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupplyPointService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SupplyPoint('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SupplyPoint();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
