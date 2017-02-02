import { EntityType } from '../entitytype';
import { AbstractDAO } from './abstract.dao';

export class DomainLayer {

    private entityTypes: { [name: string]: EntityType; } = {};
    private services: { [entityTypeName: string]: AbstractDAO; } = {};

    findEntityType(name: string): Promise<EntityType> {
        let entityType = this.entityTypes[name];
        if (entityType) {
            return Promise.resolve(entityType);
        }
        throw `EntityType not found for name ${name}`;
    }

    listEntityTypes(): EntityType[] {
        return Object.keys(this.entityTypes).map(key => this.entityTypes[key]);
    }

    addService(service: AbstractDAO) {
        let entityType = service.entityType;
        this.addEntityType(entityType);
        this.services[entityType.singular] = service;
    }

    listServices(): AbstractDAO[] {
        return Object.keys(this.services).map(key => this.services[key]);
    }

    addEntityType(entityType: EntityType) {
        this.entityTypes[entityType.plural] = entityType;
    }

    getService(entitytype: string): AbstractDAO {
        return this.services[entitytype];
    }
}
