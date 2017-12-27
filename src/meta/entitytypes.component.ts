import { EntityType } from '../entitytype';
import { AbstractComponent } from "./abstract.component";
import { AngularmService } from '../angularm.service';

export abstract class EntityTypesComponent extends AbstractComponent {

    public entityTypes: EntityType[] = [];

    constructor(public angularm: AngularmService) {
        super();
    }
    
    public fireEvent(eventName: string, data: any) {
        this.angularm.fireEvent(eventName, this.entityTypes, data);
    }

};
