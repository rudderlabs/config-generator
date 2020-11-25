import { LabelDiv } from '@components/common/typography';
import * as React from 'react';
import styled from 'styled-components';

import { Input } from './input';
import { Textarea } from './textarea';

const Container = styled.div`
  width: 475px;
  input {
    width: 100%;
  }
`;

export interface ITextInputFieldProps {
  field: any;
  type: string;
  disabled?: boolean;
  secret?: string;
  formData?: { [i: string]: any };
  onChange: (label: string, value: string) => void;
}

export default class TextInputField extends React.Component<
  ITextInputFieldProps
  > {
  state = {
    disabled: this.props.disabled,
    value: this.props.field.default,
  };
  componentDidMount() {
    const { field, onChange, secret } = this.props;
    if (!secret) {
      onChange(field.value, field.default || '');
    }
  }

  public render() {
    const { field, type, onChange, secret, formData } = this.props;
    const { disabled, value } = this.state;
    if (field.dependsOn && formData && !formData[field.dependsOn]) {
      return null;
    }
    return (
      <Container className="p-t-sm">
        <LabelDiv className="m-b-xs">
          {field.label}
          {field.required && ' *'}
        </LabelDiv>
        {field.labelNote && (
          <div className="p-b-sm p-t-xs">{field.labelNote}</div>
        )}
        {type == 'input' ? (
          <span>
            <Input
              min={field.min}
              defaultValue={field.default}
              width={500}
              value={value}
              placeholder={
                secret !== null && secret !== undefined
                  ? secret
                  : field.placeholder
              }
              onChange={(e: any) => {
                this.setState({ value: e.target.value });
                onChange(field.value, e.target.value);
              }}
              type={field.inputFieldType}
              disabled={field.disabledNormalMode ? this.props.disabled : disabled}
            />
            {disabled && !this.props.disabled && !field.disabledNormalMode && (
              <a
                onClick={() => {
                  this.setState({ disabled: false, value: '' });
                  onChange(field.value, 'asdas');
                }}
              >
                Edit
              </a>
            )}
          </span>
        ) : (
            <Textarea
              defaultValue={field.default}
              placeholder={
                secret !== null && secret !== undefined
                  ? secret
                  : field.placeholder
              }
              onChange={(e: any) => onChange(field.value, e.target.value)}
              disabled={disabled}
            />
          )}
      </Container>
    );
  }
}
