import { EntityType } from '../entitytype';
import { AbstractComponent } from "./abstract.component";
import { AngularmService } from '../angularm.service';

export abstract class EntityTypeComponent extends AbstractComponent {

    public entityType: EntityType;
    entities: any[] = [];

    constructor(public angularm: AngularmService) {
        super();
    }
    
    public fireEvent(eventName: string, data: any) {
        this.angularm.fireEvent(eventName, this.entityType, data);
    }

};
