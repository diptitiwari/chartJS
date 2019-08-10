import React from 'react';
import ChartRenderer from './chart'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

describe('<ChartRenderer/>',()=>{

  let component, _chartRenderer;

  beforeEach(()=>{
    component =  enzyme.shallow(<ChartRenderer/>);
    _chartRenderer = component.find('ChartRenderer');
  });

  it('length',()=>{
    expect(component).toHaveLength(1);
  });

  it('rendered component',()=>{
    expect(component.find('QueryRenderer')).toHaveLength(1);
  });

});
