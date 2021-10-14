import * as React from 'react';
import { withTheme } from 'styled-components';
import _ from 'lodash';

import TextInputField from './textInput';
import { SubHeaderDiv } from './typography';
import SwitchInput from './switchInput';
import SingleSelect from './singleSelect';
import TimePicker from './timePicker';
import DynamicForm from './dynamicForm';
import { toJS } from 'mobx';
import ErrorLabel from '../auth/errorLabel';
import DynamicCustomForm from './dynamicCustomForm';
import DynamicSelectForm from './dynamicSelectForm';
export interface CommonFieldProps {
  defaultValue: string;
  value: string;
  default: string;
  required: boolean;
  label: string;
}
export interface IFormGroupProps {
  title: string;
  fields: any;
  theme: any;
  onStateChange: any;
  initialSettings?: any;
  secretConfig?: any;
  disabled: boolean;
  metadata?: { [i: string]: any }
}

export interface IFormGroupState {
  formData: any;
  error: boolean;
  errorMessage: string;
}

class FormGroup extends React.PureComponent<IFormGroupProps, IFormGroupState> {
  constructor(props: IFormGroupProps) {
    super(props);
    this.state = {
      formData: {},
      error: false,
      errorMessage: 'Wrong format',
    };
  }
  public onChange = (label: string, value: string) => {
    const { onStateChange } = this.props;
    this.setState(
      (prevState: any) => ({ 
        formData: {
          ...prevState.formData,
          [label]: value,
        },
      }),
      () => onStateChange(this.state.formData, false),
    );
  };

  public handleValidation = (regexString: any) => {
    const { formData } = this.state;
    const { onStateChange } = this.props;

    let key = formData[Object.keys(formData)[0]];
    const regex = RegExp(regexString);
    const isValidInput = key && key.startsWith('env.') ? true : false;
    this.setState({ error: false });

    if (!isValidInput && !regex.test(key)) {
      this.setState(
        (prevState: any) => ({
          formData: {
            ...prevState.formData,
          },
          error: true,
        }),
        () => {
          onStateChange(this.state.formData, true);
        },
      );
    }
  };

  public renderField = (field: any, fields: any) => {
    const { initialSettings, secretConfig, disabled, metadata } = this.props;
    if (initialSettings && initialSettings[field.value] !== undefined) {
      field.default = toJS(initialSettings[field.value]);
    }
    let forceDisabled = false;
    let preRequisiteValue;
    if (field.preRequisiteField) {
      if (
        (field.preRequisiteField.selectedValue && this.state.formData[field.preRequisiteField.name] !==
          field.preRequisiteField.selectedValue) ||
        (!field.preRequisiteField.selectedValue &&
          !this.state.formData[field.preRequisiteField.name])
      ) {
        // disabledMode if true this field will appear as disabled until the preRequisiteField has a value
        // if false or not set the field will not appear in the ui until the preRequisiteField has a value
        if (field.preRequisiteField.disabledMode) {
          forceDisabled = true;
        } else {
          return null;
        }
      }
      if (field.preRequisiteField.includeValue) {
        preRequisiteValue = this.state.formData[field.preRequisiteField.name]
      }
    }
    switch (field.type) {
      case 'textInput':
      case 'textareaInput':
        return (
          <div className="p-b-sm">
            <div
              className="width-100"
              onBlur={() => {
                this.handleValidation(field.regex);
              }}
            >
              <TextInputField
                field={field}
                onChange={this.onChange}
                type={field.type == 'textInput' ? 'input' : 'textarea'}
                disabled={disabled || forceDisabled}
                secret={
                  initialSettings && secretConfig && secretConfig[field.value]
                }
              ></TextInputField>
              {this.state.error ? (
                <ErrorLabel
                  error={this.state.error}
                  errorMessage={this.state.errorMessage}
                />
              ) : null}
              {field.footerNote && (
                <div className="p-t-sm p-b-sm">{field.footerNote}</div>
              )}
              {field.footerURL && (
                <div className="p-t-sm p-b-sm">
                  <a href={field.footerURL.link}>{field.footerURL.text}</a>
                </div>
              )}
            </div>
          </div>
        );
      case 'singleSelect':
        return (
          <div className="p-b-sm">
            <SingleSelect
              field={field}
              options={field.options}
              defaultOption={field.defaultOption}
              onChange={this.onChange}
            ></SingleSelect>
          </div>
        );
      case 'timePicker':
        return (
          <div className="p-b-sm">
            <TimePicker
              field={field}
              options={field.options}
              onChange={this.onChange}
            ></TimePicker>
            {field.footerNote && (
              <div className="p-t-sm p-b-sm">{field.footerNote}</div>
            )}
          </div>
        );
      case 'checkbox':
        return (
          <div className="p-b-sm">
            <SwitchInput
              field={field}
              onChange={this.onChange}
              hidden={false}
              disabled={disabled || forceDisabled}
            ></SwitchInput>
            {field.footerNote && (
              <div className="p-t-sm p-b-sm">{field.footerNote}</div>
            )}
          </div>
        );
      case 'dynamicForm':
        return (
          <div className="p-b-sm">
            <DynamicForm
              field={field}
              onChange={this.onChange}
              hidden={field.hidden}
              disabled={disabled || forceDisabled}
            ></DynamicForm>
            {field.footerNote && (
              <div className="p-t-sm p-b-sm">{field.footerNote}</div>
            )}
          </div>
        );
      case 'dynamicCustomForm':
        return (
          <div className="p-b-sm">
            <DynamicCustomForm
              field={field}
              onChange={this.onChange}
              disabled={disabled || forceDisabled}
            ></DynamicCustomForm>
            {field.footerNote && (
              <div className="p-t-sm p-b-sm">{field.footerNote}</div>
            )}
          </div>
        );
      case 'dynamicSelectForm':
        return (
          <div className="p-b-sm">
            <DynamicSelectForm
              field={field}
              onChange={this.onChange}
              options={field.options}
              disabled={disabled || forceDisabled}
            ></DynamicSelectForm>
            {field.footerNote && (
              <div className="p-t-sm p-b-sm">{field.footerNote}</div>
            )}
          </div>
        );
      case 'defaultCheckbox':
        return (
          <div className="p-b-sm">
            This is a <strong>device-mode only</strong> destination. Please add
            Factory in your implementation.
            <SwitchInput
              field={field}
              hidden={false}
              onChange={this.onChange}
              disabled={true}
            ></SwitchInput>
            {field.footerNote && (
              <div className="p-t-sm p-b-sm">{field.footerNote}</div>
            )}
          </div>
        );

      default:
        break;
    }
  };
  public render() {
    const { title, fields, theme } = this.props;
    return (
      <div className="p-b-md p-t-sm">
        <SubHeaderDiv color={theme.color.black} className="p-b-sm">
          {title}
        </SubHeaderDiv>
        {fields.map((field: any) =>
          this.renderField(_.cloneDeep(field), fields),
        )}
      </div>
    );
  }
}

export default withTheme(FormGroup);
