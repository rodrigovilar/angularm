import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularmService } from '../../angularm.service';
import { slideInDownAnimation } from './animations';
import { FlashMessageService } from './flash.message.service';
import { EntityType } from '../../entitytype';
import { EntityComponent } from '../../meta/entity.component';

@Component({
  selector: 'div [mgShowEntity]',
  template: `<div *ngIf="entity">
  <div *ngFor="let property of entity.mountProperties()">
    <strong>{{property.propertyType.name | titleCase}}:</strong> {{property.value}}
  </div>
  <a href="#" (click)="edit()">Edit</a>
  <a href="#" (click)="back()">Back</a>
</div>
`,
  animations: [slideInDownAnimation]
})
export class ShowEntityComponent extends EntityComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  message: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flash: FlashMessageService,
    private angularm: AngularmService
  ) {
    super();
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

  back() {
    this.router.navigate([this.entity.entityType.plural]);
    this.flash.clearMessage();
    return false;
  }

  edit() {
    this.flash.clearMessage();
    this.router.navigate([this.entity.entityType.plural, this.entity.key, 'edit']);
    return false;
  }

}
