import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ChartRenderer from "./chart";



describe("ChartRenderer", () => {
    const ChartRenderer = shallow(<ChartRenderer />);
});

it('render component', () => {
    expect(ChartRenderer).toHaveLength(1);
})
