import { Entity } from '../entitytype';
import { AbstractComponent } from "./abstract.component";

export abstract class EntityComponent extends AbstractComponent {

    public entity: Entity;

};
