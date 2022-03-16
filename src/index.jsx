import React, { useState } from 'react';
import { initializeWidget, useActiveViewId, useRecords, FieldPicker, useCloudStorage  } from '@vikadata/widget-sdk';
import { Select } from '@vikadata/components';
import { Setting } from './setting';

export const HelloWorld = () => {
  // 声明日期变量
  const [day, setDay] = useCloudStorage('day', 0)
  const [hour, setHour] = useCloudStorage('hour', 0)

  // 通过视图读取所有记录
  const viewId = useActiveViewId();
  const records = useRecords(viewId);

  // 计算倒计时
  const calcTime = (value, fieldId) => {
    console.log(value, fieldId)
    // 我们拿到选中的id 再去总的数据记录里找到那一条记录
    const record = records.find((item) => item.id === value)
    // 拿到日期字段数据
    const date = record.getCellValue(fieldId)
    // 计算差值
    const endDate = new Date(date)
    // 是不是无效时间对象
    if (isNaN(endDate.getTime())) {
      setDay(0)
      setHour(0)
    } else {
      const currentDate = new Date()
      const dValue = endDate - currentDate
  
      if (dValue > 0){
        // 计算出值后赋值到对应的变量上
        setDay(parseInt(dValue / (24*60*60*1000)))
        setHour(parseInt((dValue % (24*60*60*1000)) / (3600*1000)))
        // console.log('aaaaa')
      } else {
        setDay(0)
        setHour(0)
      }
    }
  }

  const columns = records.map((item) => ({
    label: item.title,
    value: item.id
  }))

  return (
    <div style={{ height: '100%', padding: '20px' }}>
      <h2>倒计时1</h2>
      <div style={{ color: '#333', fontWeight: 600, fontSize: '20px' }}>
        <div><span style={{ color: '#e69850', fontWeight: 600, marginRight: '20px' }}>{day}</span>Day</div>
        <div><span style={{ color: '#e69850', fontWeight: 600, marginRight: '20px' }}>{hour}</span>Hour</div>
      </div>
      <Setting calc={calcTime} columns={columns} viewId={viewId} />
    </div>
  );
};


initializeWidget(HelloWorld, process.env.WIDGET_PACKAGE_ID);
