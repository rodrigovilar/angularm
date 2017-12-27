import { FormControl } from '@angular/forms';

import { PropertyType } from '../entitytype';
import { AbstractComponent } from "./abstract.component";
import { AngularmService } from '../angularm.service';

export abstract class PropertyTypeComponent extends AbstractComponent {

    public propertyType: PropertyType;
    public mgFormControl: FormControl;

    constructor(public angularm: AngularmService) {
        super();
    }
    
    public fireEvent(eventName: string, data: any) {
        this.angularm.fireEvent(eventName, this.propertyType, data);
    }

};
