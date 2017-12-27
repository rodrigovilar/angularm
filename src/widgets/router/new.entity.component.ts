import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AngularmService } from '../../angularm.service';
import { slideInDownAnimation } from './animations';
import { EntityComponent } from '../../meta/entity.component';
import { Entity } from '../../entitytype';

@Component({
  template: `<div *ngIf="entity">
  <div [mgEntity]="'create_form'" [entity]="entity"></div>
  </div>`,
  animations: [ slideInDownAnimation ]
})
export class NewEntityComponent extends EntityComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  constructor(
    private route: ActivatedRoute,
    angularm: AngularmService
  ) {
    super(angularm);
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
    this.entity = new Entity(entityType, {});
  }

}
