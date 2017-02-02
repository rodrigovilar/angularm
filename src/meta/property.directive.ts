import { ViewContainerRef, Directive } from '@angular/core';
import { ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AngularmService } from '../angularm.service';
import { AbstractPortDirective } from './abstract.port.directive';
import { Property } from '../entitytype';


@Directive({
  selector: '[mgProperty]'
})
export class PropertyDirective extends AbstractPortDirective implements OnInit {

  @Input('mgProperty') port: string;
  @Input() property: Property;
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

    this.createPropertyWidget(this.property, this.port, this.mgForm);
  }

}
