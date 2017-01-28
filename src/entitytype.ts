export class EntityType {

    propertyTypes: PropertyType[] = [];

    constructor(public singular: string, public plural: string, public tags: any) {
        if (!tags.id) {
            throw `Tag id is mandatory to set the primary key of ${singular} Entity`;
        }
    }

    pt(name: string, type: string, tags?: any): EntityType {
        this.propertyTypes.push(new PropertyType(this, name, type, tags));
        return this;
    }

    propertyType(name: string, type: string, tags?: any): EntityType {
        return this.pt(name, type, tags);
    }

    get properties(): PropertyType[] {
        return this.propertyTypes;
    }

}

export class PropertyType {
    constructor(public entityType: EntityType, public name: string, public type: string, public tags?: any) { }
}

export class Entity {

    constructor(public entityType: EntityType, public properties: any) { }

    get key(): any {
        let keyName = this.entityType.tags.id;
        return this.properties[keyName];
    }

    mountProperties(): Property[] {
        let result: Property[] = [];
        this.entityType.propertyTypes.forEach((propertyType) => {
            result.push(new Property(this, propertyType, this.properties[propertyType.name]));
        });
        return result;
    }

}

export class Property {
    constructor(public entity: Entity, public propertyType: PropertyType, public value: any) { }
}
