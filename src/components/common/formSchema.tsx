import * as React from 'react';
import FormGroup from '@components/common/formGroup';

export interface IDestinationSettingsProps {
  schema: any[]
  onChange: (settings: any, isValid: boolean) => void;
  initialSettings?: any;
  //Manipulate the fields
  transformFields?: (fields: any[]) => any[];
  secretConfig?: any;
  disabled?: boolean;
  validate?: boolean;
  metadata?: { [i: string]: any }
}

export default class FormSchema extends React.Component<
  IDestinationSettingsProps,
  any
  > {
  constructor(props: IDestinationSettingsProps) {
    super(props);
    this.state = {
      settings: {}
    };
  }
  static validate = (settings: any, fields: any[], secretConfig: any) => {
    const req = Object.entries(settings).map(([k, v]) => {
      if (!v) {
        const field = fields.find((field: any) => (field.value === k || k.endsWith(field.value)));
        // if field has a preRequisiteField and its not active, do not do required validation
        if (field && field.preRequisiteField && field.preRequisiteField.selectedValue) {
          if (
            settings[field.preRequisiteField.name] !==
            field.preRequisiteField.selectedValue
          ) {
            return true;
          }
        }
        if (field && field.required && !(secretConfig && secretConfig[k])) {
          return false;
        }
      }
      return true;
    });
    const isValid = req.reduce((acc: any, curr: any) => acc && curr, true);
    return isValid
  }
  public onSettingsChange = (settings: any) => {
    const {
      onChange,
      secretConfig,
      schema,
      validate = true,
    } = this.props;
    let isValid;
    if (validate) {
      const fields = schema.reduce(
        (acc: any, group: any) => acc.concat(group.fields),
        [],
      );
      isValid = FormSchema.validate(settings, fields, secretConfig)
    }
    onChange(settings, isValid);
  };

  public onChange = (settings: any) => {
    this.setState(
      (prevState: any) => ({
        settings: {
          ...prevState.settings,
          ...settings,
        },
      }),
      () => this.onSettingsChange(this.state.settings),
    );
  };

  private getFields(fields: any) {
    const {
      transformFields
    } = this.props;
    if (transformFields) {
      return transformFields(fields)
    }
    return fields;
  }

  public render() {
    const { initialSettings, disabled, schema, secretConfig, metadata } = this.props;
    return (
      <div>
        {
          schema.map((group: any) => (
            <FormGroup
              metadata={metadata}
              secretConfig={secretConfig}
              key={group.title}
              title={group.title}
              fields={this.getFields(group.fields)}
              onStateChange={this.onChange}
              initialSettings={initialSettings}
              disabled={!!disabled}
            />
          ))
        }
      </div>
    );
  }
}
