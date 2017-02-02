import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AngularmService } from '../../angularm.service';
import { slideInDownAnimation } from './animations';
import { EntityTypeComponent } from '../../meta/entitytype.component';

@Component({
  selector: 'div [mgEntityListing]',
  template: `<div *ngIf="entityType">
    <div [mgEntityType]="'list_entities'" [entityType]="entityType"></div>
  </div>`,
  animations: [slideInDownAnimation],
})
export class ListEntitiesComponent extends EntityTypeComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  constructor(
    private route: ActivatedRoute,
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
      });
  }
}
