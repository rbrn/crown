import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrownTestModule } from '../../../test.module';
import { SupplyPointResourceUpdateComponent } from 'app/entities/supply-point-resource/supply-point-resource-update.component';
import { SupplyPointResourceService } from 'app/entities/supply-point-resource/supply-point-resource.service';
import { SupplyPointResource } from 'app/shared/model/supply-point-resource.model';

describe('Component Tests', () => {
  describe('SupplyPointResource Management Update Component', () => {
    let comp: SupplyPointResourceUpdateComponent;
    let fixture: ComponentFixture<SupplyPointResourceUpdateComponent>;
    let service: SupplyPointResourceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrownTestModule],
        declarations: [SupplyPointResourceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SupplyPointResourceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupplyPointResourceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupplyPointResourceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SupplyPointResource('123');
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
        const entity = new SupplyPointResource();
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
