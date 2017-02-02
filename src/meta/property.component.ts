import { FormControl } from '@angular/forms';

import { Property} from '../entitytype';

export abstract class PropertyComponent {

    public property: Property;
    public mgFormControl: FormControl;

};
