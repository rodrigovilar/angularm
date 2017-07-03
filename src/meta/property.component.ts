import { FormControl } from '@angular/forms';

import { Property} from '../entitytype';
import { AbstractComponent } from "./abstract.component";

export abstract class PropertyComponent extends AbstractComponent {

    public property: Property;
    public mgFormControl: FormControl;

};
