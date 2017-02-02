import { ViewContainerRef, Directive } from '@angular/core';
import { ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AngularmService } from '../angularm.service';
import { AbstractPortDirective } from './abstract.port.directive';
import { PropertyType } from '../entitytype';


@Directive({
  selector: '[mgPropertyType]'
})
export class PropertyTypeDirective extends AbstractPortDirective implements OnInit {

  @Input('mgPropertyType') port: string;
  @Input() propertyType: PropertyType;
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

    this.createPropertyTypeWidget(this.propertyType, this.port, this.mgForm);
  }

}
