import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AngularmService } from '../../angularm.service';
import { slideInDownAnimation } from './animations';
import { EntityType } from '../../entitytype';
import { EntityComponent } from '../../meta/entity.component';

@Component({
  selector: 'div [mgShowEntity]',
  template: `<div *ngIf="entity">
  <div [mgEntity]="'show_entity'" [entity]="entity"></div>
</div>
`,
  animations: [slideInDownAnimation]
})
export class ShowEntityComponent extends EntityComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  constructor(
    private route: ActivatedRoute,
    angularm: AngularmService
  ) {
    super(angularm);
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
      .subscribe(
      (entity: any) => {
        this.entity = entity;
      });
  }

}
