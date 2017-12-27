import { FormControl } from '@angular/forms';

import { Property} from '../entitytype';
import { AbstractComponent } from "./abstract.component";
import { AngularmService } from '../angularm.service';

export abstract class PropertyComponent extends AbstractComponent {

    public property: Property;
    public mgFormControl: FormControl;

    constructor(public angularm: AngularmService) {
        super();
    }
    
    public fireEvent(eventName: string, data: any) {
        this.angularm.fireEvent(eventName, this.property, data);
    }

};
