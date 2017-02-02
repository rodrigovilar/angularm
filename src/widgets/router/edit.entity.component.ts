import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AngularmService } from '../../angularm.service';
import { slideInDownAnimation } from './animations';
import { EntityComponent } from '../../meta/entity.component';
import { EntityType, Entity } from '../../entitytype';

@Component({
  selector: 'div [mgEditEntity]',
  template: `<div *ngIf="entity">
    <div [mgEntity]="'edit_form'" [entity]="entity"></div>
  </div>`,
  animations: [slideInDownAnimation]
})
export class EditEntityComponent extends EntityComponent implements OnInit {

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
      .switchMap((params: Params) => this.mapEntityParam(params))
      .subscribe((entity: any) => this.configure(entity));
  }

  configure(entity: Entity) {
    this.entity = entity;
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
}
