import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrownTestModule } from '../../../test.module';
import { ResourceUpdateComponent } from 'app/entities/resource/resource-update.component';
import { ResourceService } from 'app/entities/resource/resource.service';
import { Resource } from 'app/shared/model/resource.model';

describe('Component Tests', () => {
  describe('Resource Management Update Component', () => {
    let comp: ResourceUpdateComponent;
    let fixture: ComponentFixture<ResourceUpdateComponent>;
    let service: ResourceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrownTestModule],
        declarations: [ResourceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ResourceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ResourceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResourceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Resource('123');
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
        const entity = new Resource();
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
