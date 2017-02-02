import { ViewContainerRef, Directive } from '@angular/core';
import { ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AngularmService } from '../angularm.service';
import { AbstractPortDirective } from './abstract.port.directive';
import { Entity, Property } from '../entitytype';


@Directive({
  selector: '[mgForeachProperty]'
})
export class ForeachPropertyDirective extends AbstractPortDirective implements OnInit {

  @Input('mgForeachProperty') port: string;
  @Input() entity: Entity;
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

    this.foreachProperty(this.entity, (property) => {
      this.createPropertyWidget(property, this.port, this.mgForm);
    });
  }

}
