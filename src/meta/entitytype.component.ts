import { EntityType } from '../entitytype';
import { AbstractComponent } from "./abstract.component";

export abstract class EntityTypeComponent extends AbstractComponent {

    public entityType: EntityType;
    entities: any[] = [];

};
