import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AngularmService } from '../../angularm.service';
import { FlashMessageService } from './flash.message.service';
import { slideInDownAnimation } from './animations';
import { Entity, EntityType } from '../../entitytype';
import { EntityComponent } from '../../meta/entity.component';
import { TitleCase } from '../../pipes/titlecase.pipe';

@Component({
  selector: 'div [mgEditEntity]',
  template: `<div *ngIf="entity">
  <h1>Editing {{ entity.entityType.singular | titleCase }}</h1>
  <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
    <div *ngFor="let property of entity.mountProperties()">    
      <label
            for="{{property.propertyType.entityType.singular}}_{{property.propertyType.name}}"
        >{{property.propertyType.name | titleCase}}</label>
        <input
            type="text"
            id="{{property.propertyType.entityType.singular}}_{{property.propertyType.name}}"
            placeholder="{{property.propertyType.name | titleCase}}"
            [formControl]="myForm.controls[property.propertyType.name]"
            [(ngModel)]="property.value">
        <br>
      </div>
    <input type="submit" value="Update {{ entity.entityType.singular | titleCase }}">
  </form> 

  <a href="#" (click)="show()">Show</a>
  <a href="#" (click)="back()">Back</a>
</div>`,
  animations: [slideInDownAnimation]
})
export class EditEntityComponent extends EntityComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  myForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private flash: FlashMessageService,
    private angularm: AngularmService
  ) {
    super();
  }

  configureForm(entity: Entity) {
    if (entity) {
      this.entity = entity;
      let fbConf: any = {};

      this.entity.entityType.properties.forEach(propertyType => {
        fbConf[propertyType.name] = entity.properties[propertyType.name]; // TO DO Add validators here according to metadata
      });

      this.myForm = this.fb.group(fbConf);
    }
  }

  mapEntityParam(params: Params): Promise<any> {
    return new Promise((resolve) => {
      this.angularm.findEntityType(params['entitytypename']).then(
        (entityType: EntityType) => {
          let entityPromisse = this.angularm.findUnique(entityType.singular, params['key']);
          resolve(entityPromisse);
        }
      );
    });
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.mapEntityParam(params))
      .subscribe((entity: any) => this.configureForm(entity));
  }

  onSubmit(form: any): void {
    console.log(form);
    this.angularm.edit(this.entity.entityType.singular, this.entity.key, form);
    let entityTypeName = TitleCase.toTitleCase(this.entity.entityType.singular);
    this.flash.changeMessage(`${entityTypeName} was successfully updated.`);
    this.router.navigate([this.entity.entityType.plural, form[this.entity.entityType.tags.id]]);
  }

  show() {
    this.flash.clearMessage();
    this.router.navigate([this.entity.entityType.plural, this.entity.key]);
    return false;
  }

  back() {
    this.flash.clearMessage();
    this.router.navigate([this.entity.entityType.plural]);
    return false;
  }

}
