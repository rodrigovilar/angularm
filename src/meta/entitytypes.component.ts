import { EntityType } from '../entitytype';
import { AbstractComponent } from "./abstract.component";

export abstract class EntityTypesComponent extends AbstractComponent {

    public entityTypes: EntityType[] = [];

};
