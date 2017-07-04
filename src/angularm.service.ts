import { Injectable, Type } from '@angular/core';

import { DomainLayer } from './domain/domain.layer';
import {RuleService, WidgetConnection, Rule} from './meta/rule.service';
import { EntityType, PropertyType, Property } from './entitytype';
import { AbstractDAO } from './domain/abstract.dao';
import { InMemoryDAO } from './domain/inmemory.dao';


@Injectable()
export class AngularmService {

    private domain: DomainLayer;
    private rule: RuleService;

    constructor() {
        this.domain = new DomainLayer();
        this.rule = new RuleService();
    }

    setupDomain(... daos: AbstractDAO[]) {
        daos.forEach((dao: AbstractDAO) => {
            this.addService(dao);
        });
    }

    listEntityTypes(): EntityType[] {
        return this.domain.listEntityTypes();
    }
    
    cleanRules(): void {
        this.rule = new RuleService();
    }

    addService(service: AbstractDAO) {
        this.domain.addService(service);
    }

    listAll(entitytype: string): Promise<any[]> {
        return this.domain.getService(entitytype).listAll();
    }

    findUnique(entitytype: string, id: string | number): Promise<any> {
        return this.domain.getService(entitytype).findUnique(id);
    }

    edit(entitytype: string, id: string | number, properties: any): void {
        this.domain.getService(entitytype).edit(id, properties);
    }

    create(entitytype: string, properties: any): void {
        this.domain.getService(entitytype).create(properties);
    }

    delete(entitytype: string, id: string | number): void {
        this.domain.getService(entitytype).delete(id);
    }

    findEntityType(name: string): Promise<EntityType> {
        return this.domain.findEntityType(name);
    }

    getEntityTypeWidget(entityType: EntityType, port: string): WidgetConnection {
        return this.rule.getEntityTypeWidget(entityType, port);
    }

    getPropertyTypeWidget(propertyType: PropertyType, port: string): WidgetConnection {
        return this.rule.getPropertyTypeWidget(propertyType, port);
    }

    getPropertyWidget(property: Property, port: string): WidgetConnection {
        return this.rule.getPropertyWidget(property, port);
    }

    getEntityWidget(entityType: EntityType, port: string): WidgetConnection {
        return this.rule.getEntityWidget(entityType, port);
    }

    detr(port: string, component: Type<any>, configuration?: any): AngularmService {
        this.rule.addDefaultEntityTypeRule(port, component, configuration);
        return this;
    }

    etr(port: string, entitySelector: string, component: Type<any>, configuration?: any): AngularmService {
        this.rule.addEntityTypeRule(port, entitySelector, component, configuration);
        return this;
    }

    dptr(port: string, component: Type<any>, configuration?: any): AngularmService {
        this.rule.addDefaultPropertyTypeRule(port, component, configuration);
        return this;
    }

    ptr(port: string, entitySelector: string, propertySelector: string,
        propertyTypeTypeSelector: string, component: Type<any>, configuration?: any): AngularmService {
        this.rule.addPropertyTypeRule(
            port, entitySelector, propertySelector, propertyTypeTypeSelector, component, configuration);
        return this;
    }

    dpr(port: string, component: Type<any>, configuration?: any): AngularmService {
        this.rule.addDefaultPropertyRule(port, component, configuration);
        return this;
    }

    pr(port: string, entitySelector: string, propertySelector: string,
        propertyTypeTypeSelector: string, component: Type<any>, configuration?: any): AngularmService {
        this.rule.addPropertyRule(port, entitySelector, propertySelector, propertyTypeTypeSelector, component, configuration);
        return this;
    }

    der(port: string, component: Type<any>, configuration?: any): AngularmService {
        this.rule.addDefaultEntityRule(port, component, configuration);
        return this;
    }

    er(port: string, entitySelector: string, component: Type<any>, configuration?: any): AngularmService {
        this.rule.addEntityRule(port, entitySelector, component, configuration);
        return this;
    }

}

export let et = (singular: string, plural: string, tags?: any, ... propertyTypes: PropertyType[]): EntityType => {
    return new EntityType(singular, plural, tags);
};

export let entityType = et;

export let mem = (entityType: EntityType): InMemoryDAO => {
    return new InMemoryDAO(entityType);
};

export let memoryDAO = mem;
