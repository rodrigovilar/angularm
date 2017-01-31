import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularmService } from '../../angularm.service';
import { slideInDownAnimation } from './animations';
import { EntityTypeComponent } from '../../meta/entitytype.component';
import { FlashMessageService } from './flash.message.service';
import { Entity } from '../../entitytype';
import { TitleCase } from '../../pipes/titlecase.pipe';

@Component({
  selector: 'div [mgEntityListing]',
  template: `<div *ngIf="entityType">
    <h1>Listing {{ entityType.plural | titleCase }}</h1>
    <table>
      <thead>
        <tr>
          <th *ngFor="let propertyType of entityType.propertyTypes">{{propertyType.name | titleCase}}</th>
          <th colspan="3"></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let entity of entities">
          <td *ngFor="let property of entity.mountProperties()">{{property.value}}</td>
          <td> <a href="#" (click)="show(entity)">Show</a></td>
          <td> <a href="#" (click)="edit(entity)">Edit</a></td>
          <td> <a href="#" (click)="destroy(entity)">Destroy</a></td>
        </tr>
      </tbody>
    </table>
    <a href="#" (click)="create()">New {{entityType.singular | titleCase}}</a>
    <a href="#" (click)="back()">Back</a> 
  </div>`,
  animations: [slideInDownAnimation],
})
export class ListEntitiesComponent extends EntityTypeComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flash: FlashMessageService,
    private angularm: AngularmService
  ) {
    super();
  }

  ngOnInit() {
    this.route.params
      .switchMap(
      (params: Params) =>
        this.angularm.findEntityType(params['entitytypename']))
      .subscribe(
      (entity: any) => {
        this.entityType = entity;
        this.angularm.listAll(this.entityType.singular).then(
          entities => this.entities = entities
        );
      });
  }

  back() {
    this.flash.clearMessage();
    this.router.navigate(['/']);
    return false;
  }

  create() {
    this.flash.clearMessage();
    this.router.navigate([this.entityType.plural, 'new']);
    return false;
  }

  show(entity: Entity) {
    this.flash.clearMessage();
    this.router.navigate([entity.entityType.plural, entity.key]);
    return false;
  }

  edit(entity: Entity) {
    this.flash.clearMessage();
    this.router.navigate([entity.entityType.plural, entity.key, 'edit']);
    return false;
  }

  destroy(entity: Entity) {
    if (confirm('Are you sure?')) {
      this.angularm.delete(entity.entityType.singular, entity.key);
      let entityTypeName = TitleCase.toTitleCase(entity.entityType.singular);
      this.flash.changeMessage(`${entityTypeName} was successfully destroyed.`);
    }
    return false;
  }
}
