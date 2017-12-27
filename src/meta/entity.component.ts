import { Entity } from '../entitytype';
import { AbstractComponent } from "./abstract.component";
import { AngularmService } from "../angularm.service";

export abstract class EntityComponent extends AbstractComponent {

    public entity: Entity;

    constructor(public angularm: AngularmService) {
        super();
    }

    public fireEvent(eventName: string, data: any) {
        this.angularm.fireEvent(eventName, this.entity, data);
    }

};
