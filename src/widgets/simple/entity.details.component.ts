import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularmService } from '../../angularm.service';
import { FlashMessageService } from '../simple/flash.message.service';
import { EntityComponent } from '../../meta/entity.component';
import { EntityType } from '../../entitytype';

@Component({
  selector: 'div [mgEntityDetails]',
  template: `<div *ngIf="entity">
  <div *ngFor="let property of entity.mountProperties()"
    [mgProperty]="'show_line'" [property]="property">
  </div>  
  <a href="#" (click)="edit()">Edit</a>
  <a href="#" (click)="back()">Back</a>
</div>`
})
export class EntityDetailsComponent extends EntityComponent {

  constructor(
    private router: Router,
    private flash: FlashMessageService,
    private angularm: AngularmService
  ) {
    super();
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
