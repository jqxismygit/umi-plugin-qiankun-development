import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';

import { get } from 'lodash';

class Basic extends React.Component {
  render() {
    const data = [
      {
        country: '中国',
        population: 131744,
      },
      {
        country: '印度',
        population: 104970,
      },
      {
        country: '美国',
        population: 29034,
      },
      {
        country: '印尼',
        population: 23489,
      },
      {
        country: '巴西',
        population: 18203,
      },
    ];
    const obj = { a: 1 };
    const a = get(obj, 'a');
    console.log('a = ', a);
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      type: 'sort',

      callback(a, b) {
        // 排序依据，和原生js的排序callback一致
        return a.population - b.population > 0;
      },
    });
    return (
      <div style={{ width: 200, height: 240 }}>
        <Chart
          data={dv}
          height={240}
          padding={['auto', 45, 'auto', 'auto']}
          forceFit
        >
          <Coord transpose />
          <Axis name="country" />
          <Axis name="population" visible={false} />
          <Tooltip />
          <Geom type="interval" position="country*population">
            <Label content="population" offset={5} />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Basic;
