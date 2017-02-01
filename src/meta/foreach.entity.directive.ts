import { ViewContainerRef, Directive } from '@angular/core';
import { ComponentFactoryResolver, Input, OnInit } from '@angular/core';

import { AngularmService } from '../angularm.service';
import { AbstractPortDirective } from './abstract.port.directive';
import { EntityType, Entity } from '../entitytype';


@Directive({
  selector: '[mgForeachEntity]'
})
export class ForeachEntityDirective extends AbstractPortDirective implements OnInit {

  @Input('mgForeachEntity') port: string;
  @Input() entityType: EntityType;

  constructor(
    componentTarget: ViewContainerRef,
    compiler: ComponentFactoryResolver,
    angularm: AngularmService
  ) {
    super(componentTarget, compiler, angularm);
  }


  public refreshContent() {
    super.refreshContent();

    this.foreachEntity(this.entityType, (entity: Entity) => {
      this.createEntityWidget(entity, this.port);
    });
  }

}
