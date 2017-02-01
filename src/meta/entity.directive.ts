import { ViewContainerRef, Directive } from '@angular/core';
import { ComponentFactoryResolver, Input, OnInit } from '@angular/core';

import { AngularmService } from '../angularm.service';
import { AbstractPortDirective } from './abstract.port.directive';
import { Entity } from '../entitytype';


@Directive({
  selector: '[mgEntity]'
})
export class EntityDirective extends AbstractPortDirective implements OnInit {

  @Input('mgEntity') port: string;
  @Input() entity: Entity;

  constructor(
    componentTarget: ViewContainerRef,
    compiler: ComponentFactoryResolver,
    angularm: AngularmService
  ) {
    super(componentTarget, compiler, angularm);
  }


  public refreshContent() {
    super.refreshContent();

    this.createEntityWidget(this.entity, this.port);
  }

}
