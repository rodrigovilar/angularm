import { ComponentRef, Type } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { OnChanges, SimpleChange, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AngularmService } from '../angularm.service';
import { EntityType, PropertyType, Entity, Property } from '../entitytype';


export class AbstractPortDirective implements AfterViewInit, OnChanges, OnDestroy, OnInit {

  protected componentRefs: Array<ComponentRef<any>> = [];
  protected wasViewInitialized = false;

  constructor(
    private componentTarget: ViewContainerRef,
    private compiler: ComponentFactoryResolver,
    private angularm: AngularmService
  ) {}

  protected foreachEntityType(cb: (entityType: EntityType) => void ) {
    this.angularm.listEntityTypes().forEach((entityType) => {
      cb(entityType);
    });
  }

  protected foreachPropertyType(entityType: EntityType, cb: (propertyType: PropertyType) => void ) {
    entityType.propertyTypes.forEach((propertyType) => {
      cb(propertyType);
    });
  }

  protected foreachEntity(entitytype: EntityType, cb: (entity: Entity) => void ) {
    this.angularm.listAll(entitytype.singular).then( entities => {
      entities.forEach( (entity: Entity) => {
        cb(entity);
      });
    });
  }

  protected foreachProperty(entity: Entity, cb: (property: Property) => void ) {
    entity.entityType.propertyTypes.forEach((propertyType) => {
      let property = new Property(entity, propertyType, entity.properties[propertyType.name]);
      cb(property);
    });
  }

  protected createEntityTypeWidget(entityType: EntityType, port: string) {
      let widgetConnection = this.angularm.getEntityTypeWidget(entityType, port);
      let componentRef = this.createComponent(widgetConnection.widget);
      componentRef.instance.entityType = entityType;
      componentRef.instance.configuration = (widgetConnection.configuration) ? widgetConnection.configuration : {};
  }

  protected createPropertyTypeWidget(propertyType: PropertyType, port: string, mgForm: FormGroup) {
      let widgetConnection = this.angularm.getPropertyTypeWidget(propertyType, port);
      let componentRef = this.createComponent(widgetConnection.widget);
      componentRef.instance.propertyType = propertyType;
      componentRef.instance.configuration = (widgetConnection.configuration) ? widgetConnection.configuration : {};
      if (mgForm) {
        componentRef.instance.mgFormControl = mgForm.controls[propertyType.name];
      }
  }

  protected createEntityWidget(entity: Entity, port: string) {
    let widgetConnection = this.angularm.getEntityWidget(entity.entityType, port);
    let componentRef = this.createComponent(widgetConnection.widget);
    componentRef.instance.entity = entity;
    componentRef.instance.configuration = (widgetConnection.configuration) ? widgetConnection.configuration : {};
  }

  protected createPropertyWidget(property: Property, port: string, mgForm: FormGroup) {
      console.log('rule', property, port);
      let widgetConnection = this.angularm.getPropertyWidget(property, port);
      let componentRef = this.createComponent(widgetConnection.widget);
      componentRef.instance.property = property;
      componentRef.instance.configuration = (widgetConnection.configuration) ? widgetConnection.configuration : {};
      if (mgForm) {
        componentRef.instance.mgFormControl = mgForm.controls[property.propertyType.name];
      }
  }

  public refreshContent() {
    this.destroyCurrentComponentRefs();
  }

  private destroyCurrentComponentRefs() {
    this.componentRefs.forEach((componentRef) => {
      componentRef.destroy();
    });
    this.componentRefs = [];
  }

  createComponent(componentType: Type<any>): ComponentRef<any> {
    let factory = this.compiler.resolveComponentFactory(componentType);
    let componentRef = this.componentTarget.createComponent(factory);
    this.componentRefs.push(componentRef);
    return componentRef;
  }

  public ngOnInit() { }

  public ngAfterViewInit(): void {
    this.wasViewInitialized = true;
  }

  public ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    if (this.wasViewInitialized) {
      return;
    }
    this.refreshContent();
  }

  public ngOnDestroy() {
    this.destroyCurrentComponentRefs();
  }

}
