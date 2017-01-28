import { EntityType, Entity } from '../entitytype';

export abstract class AbstractDAO {

    constructor(public entityType: EntityType) {}

    abstract listAll(): Promise<Entity[]>;

    abstract findUnique(id: number | string): Promise<Entity>;

    abstract create(properties: Entity): void;

    abstract edit(key: number | string, properties: Entity): void;

    abstract delete(key: number | string): void;
}
