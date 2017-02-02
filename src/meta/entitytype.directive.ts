import { ViewContainerRef, Directive } from '@angular/core';
import { ComponentFactoryResolver, Input } from '@angular/core';

import { AngularmService } from '../angularm.service';
import { AbstractPortDirective } from './abstract.port.directive';
import { EntityType } from '../entitytype';

@Directive({
  selector: '[mgEntityType]'
})
export class EntityTypeDirective extends AbstractPortDirective {

  @Input('mgEntityType') port: string;
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

    this.createEntityTypeWidget(this.entityType, this.port);
  }

}
