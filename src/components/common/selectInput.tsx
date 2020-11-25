import React from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { OptionProps } from 'antd/lib/mentions';
import Svg from '@svg/index';
import { Flex } from '@components/common/misc';
import styled, { ThemeContext } from 'styled-components'

export const { Option } = Select;
export interface selectInputProps extends SelectProps<SelectValue> {
  optionsProps?: OptionProps
  options?: { value: string, label: string }[]
}



const SelectInput: React.FC<selectInputProps> = ({ options = [], children, optionsProps, onChange, style = {}, ...selectProps }) => {
  const themeContext = React.useContext(ThemeContext);
  const [selectedValue, setSelectedValue] = React.useState(selectProps.defaultValue)
  const onChangeValue = React.useCallback(
    (value, option) => {
      onChange && onChange(value, option);
      setSelectedValue(value);
    }, [onChange]
  );
  return (
    <InputContainer>
      <Select
        className="select-input"
        value={selectedValue}
        size="large"
        style={{ width: 150, ...style }}
        optionLabelProp="label"
        {...selectProps}
        onChange={onChangeValue}
      >
        {
          options.map(({ label, value }) => (
            <Option key={value} value={value} label={label}>
              <Flex alignItems="center">
                <Svg
                  style={{
                    marginRight: 12,
                    opacity: selectedValue !== value ? 0 : 1
                  }}
                  size={24}
                  name="check"
                  fill={themeContext.color.primary}
                />
                {label}
              </Flex>
            </Option>
          ))
        }
        {
          children
        }
      </Select>
    </InputContainer>
  )
}


export const InputContainer = styled.div`
 .select-input .ant-select-selector {
   border-radius:18px!important;
   box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15)!important;
   border:unset!important;
   padding:0 20px!important;
 }
`;
export default React.memo(SelectInput);