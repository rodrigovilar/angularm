import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AngularmService } from '../../angularm.service';
import { slideInDownAnimation } from './animations';
import { EntityTypeComponent } from '../../meta/entitytype.component';

@Component({
  template: `<div *ngIf="entityType">
  <div [mgEntityType]="'create_form'" [entityType]="entityType"></div>
  </div>`,
  animations: [ slideInDownAnimation ]
})
export class NewEntityComponent extends EntityTypeComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  constructor(
    private route: ActivatedRoute,
    private angularm: AngularmService
  ) {
    super();
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.mapEntityTypeParam(params))
      .subscribe((entityType: any) => this.configure(entityType));
  }

  mapEntityTypeParam(params: Params): Promise<any> {
    return this.angularm.findEntityType(params['entitytypename']);
  }

  configure(entityType: any) {
    this.entityType = entityType;
  }

}
