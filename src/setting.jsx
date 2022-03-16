import React from 'react';
import { useSettingsButton } from '@vikadata/widget-sdk';
import { FieldPicker, useCloudStorage  } from '@vikadata/widget-sdk';
import { Select } from '@vikadata/components';

export const Setting = (props) => {
  const [isSettingOpened] = useSettingsButton();

  // 下拉选中的值
  const [value, setValue] = useCloudStorage('selectedValue')

  // 选择对应视图ID里面的字段
  const [fieldId, setFieldId] = useCloudStorage('selectedField');

  // 切换选择的下拉数据
  const changeSelect = (id) => {
    // 修改下拉
    setValue(id)
    if (id && fieldId) props.calc(id, fieldId)
  }

  const changeSelectField = (id) => {
    setFieldId(id)
    if (value && id) props.calc(value, id)
  }

  return isSettingOpened ? (
    <div style={{ flexShrink: 0, width: '300px', borderLeft: 'solid 1px gainsboro', paddingLeft: '16px' }}>
      <FieldPicker 
        viewId={props.viewId} 
        fieldId={fieldId} 
        onChange={option => changeSelectField(option.value)}
      />
      <Select
        value={value}
        options={props.columns}
        onSelected={(option) => {
          changeSelect(option.value);
        }}
      />
      
    </div>
  ) : null;
};
