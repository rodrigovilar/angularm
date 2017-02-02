import { ViewContainerRef, Directive } from '@angular/core';
import { ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AngularmService } from '../angularm.service';
import { AbstractPortDirective } from './abstract.port.directive';
import { EntityType } from '../entitytype';


@Directive({
  selector: '[mgForeachPropertyType]'
})
export class ForeachPropertyTypeDirective extends AbstractPortDirective implements OnInit {

  @Input('mgForeachPropertyType') port: string;
  @Input() entityType: EntityType;
  @Input() mgForm: FormGroup;

  constructor(
    componentTarget: ViewContainerRef,
    compiler: ComponentFactoryResolver,
    angularm: AngularmService
  ) {
    super(componentTarget, compiler, angularm);
  }


  public refreshContent() {
    super.refreshContent();

    this.foreachPropertyType(this.entityType, (propertyType) => {
      this.createPropertyTypeWidget(propertyType, this.port, this.mgForm);
    });
  }

}
