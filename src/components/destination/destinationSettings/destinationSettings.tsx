import * as React from 'react';
import FormGroup from '../../common/formGroup';
import flat from 'flat';
import { destinationList as formTemplatesMap} from '../destinationList/dst';
import { Container } from './styles';
import _ from 'lodash';
export interface IDestinationSettingsProps {
  destName: string;
  onSettingsChange: any;
  setRequirementsState: any;
  disabled?: boolean;
  initialSettings?: any;
}
const isValidJson = (e: string): boolean => {
  try {
    JSON.parse(e);
    return true;
  } catch (e) {
    return false;
  }
};
export default class DestinationSettings extends React.Component<
  IDestinationSettingsProps,
  any
> {
  constructor(props: IDestinationSettingsProps) {
    super(props);
    this.state = {
      settings: {},
      reuqiresmentMet: true,
      formTemplate: (formTemplatesMap as { [key: string]: any })[
        props.destName
      ],
    };
  }

  public validate = (settings: any, fields: any) => {
    const req = Object.entries(settings).map(function val([k, value]: [string, any]): boolean {
      const v = _.isString(value) ? value.trim() : value;
      if (v) {
        if (typeof v === 'object' && !Array.isArray(v)) {
          return Object.entries(flat({ [k]: v }))
            .map(val)
            .every(Boolean);
        } if (fields.some((field: any) => Object.values(field).includes(k) && field.subType === 'JSON')) {
          return isValidJson(v);
        }
      } else if (!v) {
        const field = fields.find(
          (elem: any) => elem.value === k || k.endsWith(elem.value),
        );
        // if field has a preRequisiteField and its not active, do not do required validation
        const preReqField = field.preRequisiteField;
        if (preReqField) {
          if (Array.isArray(preReqField)) {
            if (preReqField.some((elem) => elem.hasOwnProperty('selectedValue') && settings[elem.name] !== elem.selectedValue)) {
              return true;
            }
          } else if (
            preReqField.hasOwnProperty('selectedValue')
            && settings[preReqField.name] !== preReqField.selectedValue
          ) {
            return true;
          }
        }
        if (field && field.required ) {
          return false;
        }
      }
      return true;
    });
    return req.every(Boolean);
  };

  public onSettingsChange = (settings: any) => {
    const { onSettingsChange, destName, setRequirementsState } = this.props;
    const { formTemplate } = this.state;
    onSettingsChange(settings);
    const fields = formTemplate.reduce(
      (acc: any, curr: any) => acc.concat(curr.fields),
      [],
    );
    setRequirementsState(this.validate(settings,fields));
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

  public render() {
    const { destName, initialSettings, disabled } = this.props;
    const { formTemplate } = this.state;
    return (
      <Container className="p-t-lg p-b-lg" style={{ width: '475px' }}>
        {formTemplate.map((group: any) => (
          <FormGroup
            key={group.title}
            title={group.title}
            fields={group.fields}
            onStateChange={this.onChange}
            initialSettings={initialSettings}
            disabled={!!disabled}
          ></FormGroup>
        ))}
      </Container>
    );
  }
}
