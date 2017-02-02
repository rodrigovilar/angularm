import { Type } from '@angular/core';

import { EntityType, PropertyType, Property } from '../entitytype';


export enum WidgetType {
  EntityType,
  PropertyType,
  RelationshipType,
  FieldType,
  Entity,
  Property,
  Relationship,
  Field
}


export abstract class Rule {

  constructor(public port: string, public entitySelector: string, public component: Type<any>, public configuration?: any) { }

  abstract hasDefaultScope(): boolean;

  abstract getWidgetType(): WidgetType;
}

export class WidgetConnection {
  constructor(public widget: Type<any>, public configuration?: any) { }
}


export class AbstractRuleService<T extends Rule> {

  protected rules: T[] = [];

  addRule(rule: T) {
    this.rules.push(rule);
  }

  protected matchExpression(text: string, expression: string): boolean {
    return (expression)
      ? new RegExp('^' + expression.split('*').join('.*') + '$').test(text)
      : false;
  }

  protected checkDefaultScope(defaultScope: Rule, port: string) {
    if (!defaultScope) {
      throw `There is not default Widget for port ${port}`;
    }
  }
}


export const DEFAULT_SCOPE = '*';


export class EntityTypeRule extends Rule {
  constructor(port: string, entitySelector: string, component: Type<any>, configuration?: any) {
    super(port, entitySelector, component, configuration);
  };

  hasDefaultScope(): boolean {
    return DEFAULT_SCOPE === this.entitySelector;
  }

  getWidgetType(): WidgetType {
    return WidgetType.EntityType;
  }
}


export class EntityTypeRuleService extends AbstractRuleService<EntityTypeRule> {

  getWidget(entityType: EntityType, port: string): WidgetConnection {
    let defaultScope: Rule;
    let matchName: Rule;

    this.rules.forEach(rule => {
      if (rule.port === port) {
        if (rule.hasDefaultScope()) {
          defaultScope = rule;
        } else if (this.matchExpression(entityType.singular, rule.entitySelector)) {
          matchName = rule;
        }
      }
    });

    this.checkDefaultScope(defaultScope, port);

    let matchRule = (matchName) ? matchName : defaultScope;

    return new WidgetConnection(matchRule.component, matchRule.configuration);
  }

}


export class PropertyTypeRule extends Rule {
  constructor(port: string, entitySelector: string, public propertySelector: string,
    public propertyTypeTypeSelector: string, component: Type<any>, configuration?: any) {
    super(port, entitySelector, component, configuration);
  };

  hasDefaultScope(): boolean {
    return DEFAULT_SCOPE === this.entitySelector && DEFAULT_SCOPE === this.propertySelector;
  }

  getWidgetType(): WidgetType {
    return WidgetType.PropertyType;
  }
}


export class PropertyTypeRuleService extends AbstractRuleService<PropertyTypeRule> {

  getWidget(propertyType: PropertyType, port: string): WidgetConnection {
    let defaultScope: PropertyTypeRule;
    let matchScope: PropertyTypeRule;
    let matchType: PropertyTypeRule;

    this.rules.forEach(rule => {
      if (rule.port === port) {
        if (rule.propertyTypeTypeSelector) {
          if (this.matchExpression(propertyType.entityType.singular, rule.entitySelector)
            && this.matchExpression(propertyType.name, rule.propertySelector)
            && propertyType.type === rule.propertyTypeTypeSelector) {
            matchType = rule;
          }
        } else if (rule.hasDefaultScope()) {
          defaultScope = rule;
        } else if (this.matchExpression(propertyType.entityType.singular, rule.entitySelector)
          && this.matchExpression(propertyType.name, rule.propertySelector)) {
          matchScope = rule;
        }
      }
    });

    this.checkDefaultScope(defaultScope, port);

    let matchRule = (matchType) ? matchType
      : (matchScope) ? matchScope
        : defaultScope;

    return new WidgetConnection(matchRule.component, matchRule.configuration);
  }

}

// TO DO this class is identical with PropertyTypeRule
export class PropertyRule extends Rule {
  constructor(port: string, entitySelector: string, public propertySelector: string,
    public propertyTypeTypeSelector: string, component: Type<any>, configuration?: any) {
    super(port, entitySelector, component, configuration);
  };

  hasDefaultScope(): boolean {
    return DEFAULT_SCOPE === this.entitySelector && DEFAULT_SCOPE === this.propertySelector;
  }

  getWidgetType(): WidgetType {
    return WidgetType.Property;
  }
}

// TO DO this class is identical with PropertyTypeRuleService
export class PropertyRuleService extends AbstractRuleService<PropertyRule> {

  getWidget(property: Property, port: string): WidgetConnection {
    let defaultScope: PropertyTypeRule;
    let matchScope: PropertyTypeRule;
    let matchType: PropertyTypeRule;

    this.rules.forEach(rule => {
      if (rule.port === port) {
        if (rule.propertyTypeTypeSelector) {
          if (this.matchExpression(property.propertyType.entityType.singular, rule.entitySelector)
            && this.matchExpression(property.propertyType.name, rule.propertySelector)
            && property.propertyType.type === rule.propertyTypeTypeSelector) {
            matchType = rule;
          }
        } else if (rule.hasDefaultScope()) {
          defaultScope = rule;
        } else if (this.matchExpression(property.propertyType.entityType.singular, rule.entitySelector)
          && this.matchExpression(property.propertyType.name, rule.propertySelector)) {
          matchScope = rule;
        }
      }
    });

    this.checkDefaultScope(defaultScope, port);

    let matchRule = (matchType) ? matchType
      : (matchScope) ? matchScope
        : defaultScope;

    return new WidgetConnection(matchRule.component, matchRule.configuration);
  }
}


// TO DO this class is identical with EntityTypeRule
export class EntityRule extends Rule {
  constructor(port: string, entitySelector: string, component: Type<any>, configuration?: any) {
    super(port, entitySelector, component, configuration);
  };

  hasDefaultScope(): boolean {
    return DEFAULT_SCOPE === this.entitySelector;
  }

  getWidgetType(): WidgetType {
    return WidgetType.Entity;
  }
}

// TO DO this class is identical with EntityTypeRuleService
export class EntityRuleService extends AbstractRuleService<EntityRule> {

  getWidget(entityType: EntityType, port: string): WidgetConnection {
    let defaultScope: Rule;
    let matchName: Rule;

    this.rules.forEach(rule => {
      if (rule.port === port) {
        if (rule.hasDefaultScope()) {
          defaultScope = rule;
        } else if (this.matchExpression(entityType.singular, rule.entitySelector)) {
          matchName = rule;
        }
      }
    });

    this.checkDefaultScope(defaultScope, port);

    let matchRule = (matchName) ? matchName : defaultScope;

    return new WidgetConnection(matchRule.component, matchRule.configuration);
  }
}


export class RuleService {

  private entityTypeRuleService: EntityTypeRuleService;
  private propertyTypeRuleService: PropertyTypeRuleService;
  private propertyRuleService: PropertyRuleService;
  private entityRuleService: EntityRuleService;

  constructor() {
    this.entityTypeRuleService = new EntityTypeRuleService();
    this.propertyTypeRuleService = new PropertyTypeRuleService();
    this.propertyRuleService = new PropertyRuleService();
    this.entityRuleService = new EntityRuleService();
   }

  addDefaultEntityTypeRule(port: string, component: Type<any>, configuration?: any) {
    this.addEntityTypeRule(port, DEFAULT_SCOPE, component, configuration);
  }

  addEntityTypeRule(port: string, entitySelector: string, component: Type<any>, configuration?: any) {
    let rule = new EntityTypeRule(port, entitySelector, component, configuration);
    this.entityTypeRuleService.addRule(rule);
  }

  getEntityTypeWidget(entityType: EntityType, port: string): WidgetConnection {
    return this.entityTypeRuleService.getWidget(entityType, port);
  }

  addDefaultPropertyTypeRule(port: string, component: Type<any>, configuration?: any) {
    this.addPropertyTypeRule(port, DEFAULT_SCOPE, DEFAULT_SCOPE, null, component, configuration);
  }

  addPropertyTypeRule(port: string, entitySelector: string, propertySelector: string,
    propertyTypeTypeSelector: string, component: Type<any>, configuration?: any) {
    let rule = new PropertyTypeRule(port, entitySelector, propertySelector, propertyTypeTypeSelector, component, configuration);
    this.propertyTypeRuleService.addRule(rule);
  }

  getPropertyTypeWidget(propertyType: PropertyType, port: string): WidgetConnection {
    return this.propertyTypeRuleService.getWidget(propertyType, port);
  }

  addDefaultPropertyRule(port: string, component: Type<any>, configuration?: any) {
    this.addPropertyRule(port, DEFAULT_SCOPE, DEFAULT_SCOPE, null, component, configuration);
  }

  addPropertyRule(port: string, entitySelector: string, propertySelector: string,
    propertyTypeTypeSelector: string, component: Type<any>, configuration?: any) {
    let rule = new PropertyTypeRule(port, entitySelector, propertySelector, propertyTypeTypeSelector, component, configuration);
    this.propertyRuleService.addRule(rule);
  }

  getPropertyWidget(property: Property, port: string): WidgetConnection {
    return this.propertyRuleService.getWidget(property, port);
  }

  addDefaultEntityRule(port: string, component: Type<any>, configuration?: any) {
    this.addEntityRule(port, DEFAULT_SCOPE, component, configuration);
  }

  addEntityRule(port: string, entitySelector: string, component: Type<any>, configuration?: any) {
    let rule = new EntityRule(port, entitySelector, component, configuration);
    this.entityRuleService.addRule(rule);
  }

  getEntityWidget(entityType: EntityType, port: string): WidgetConnection {
    return this.entityRuleService.getWidget(entityType, port);
  }

}
