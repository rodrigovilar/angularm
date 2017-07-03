export abstract class AbstractComponent {

    public configuration: any;
    
    getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
        return o[name];
    }

    public conf(attribute: string, tag?: string) : any {
        const value = this.getProperty(this.configuration, attribute);

        if (tag) {
            return (value) ? tag + '="' + value + '"' : "";
        }

        return (value) ? value : "";
    }
};
