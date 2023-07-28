/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default class OptionModel {
    // eslint-disable-next-line
  constructor(value: any, label: string) {
        this.label = label;
        this.value = value;
    }

    public label: string;
    // eslint-disable-next-line
  public value: any;
}

interface IOptionType {
    // eslint-disable-next-line
  value: any;
    label: string;
}

export function mapToOptions(list: IOptionType[] = [], addEmpty = false) {
    const options: OptionModel[] = list.map((e: IOptionType) => {
        return new OptionModel(e.value, e.label);
    });

    if (addEmpty) {
        options.unshift(new OptionModel(null, ''));
    }

    return options;
}
