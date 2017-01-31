import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AngularmService } from '../../angularm.service';
import { FlashMessageService } from './flash.message.service';
import { slideInDownAnimation } from './animations';
import { EntityTypeComponent } from '../../meta/entitytype.component';
import { TitleCase } from '../../pipes/titlecase.pipe';
import { EntityType, PropertyType } from '../../entitytype';

@Component({
  template: `<div *ngIf="entityType && myForm">
  <h1>New {{ entityType.singular | titleCase }}</h1>
  <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
    <div *ngFor="let propertyType of entityType.propertyTypes">
      <label 
        for="{{propertyType.entityType.singular}}_{{propertyType.name}}">{{propertyType.name | titleCase}}</label>
      <input
        type="text"
        id="{{propertyType.entityType.singular}}_{{propertyType.name}}"
        placeholder="{{propertyType.name | titleCase}}"
        [formControl]="myForm.controls[propertyType.name]">
      <br>
    </div>
    <input type="submit" value="Create {{ entityType.singular | titleCase }}">
  </form> 

  <a routerLink="/{{entityType.plural}}">Back</a>
</div>`,
  animations: [ slideInDownAnimation ]
})
export class CreateEntityComponent extends EntityTypeComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
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

  configureForm(entityType: EntityType) {
    this.entityType = entityType;
    let fbConf: any = {};

    entityType.properties.forEach( (propertyType: PropertyType) => {
      fbConf[propertyType.name] = ['']; // TO DO Add validators here according to metadata
    });

    this.myForm = this.fb.group(fbConf);
  }

  mapEntityTypeParam(params: Params): Promise<any> {
    return this.angularm.findEntityType(params['entitytypename']);
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.mapEntityTypeParam(params))
      .subscribe((entityType: any) => this.configureForm(entityType));
  }

  onSubmit(form: any): void {
    this.angularm.create(this.entityType.singular, form);
    let entityTypeName = TitleCase.toTitleCase(this.entityType.singular);
    this.flash.changeMessage(`${entityTypeName} was successfully created.`);
    let idPropertyType: string = this.entityType.tags.id;
    this.router.navigate([this.entityType.plural, form[idPropertyType] ]);
  }
}
