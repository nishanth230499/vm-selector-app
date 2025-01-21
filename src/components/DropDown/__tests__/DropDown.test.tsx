import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {DropDown} from '../index';

let options=['India','Australia','Bangladesh'];

describe('Testing our dropdown component', () => {
    test('if components renders with selected value', () => {
        const {getByText,getByAltText} =render (<DropDown options={options} selected='India' default='Country' onChange={()=>{}}/>)
        const entryElement = getByText('India');
        const downIcon = getByAltText('down-icon');
        expect(entryElement).toBeInTheDocument();
        expect(downIcon).toBeInTheDocument();

    });

    test('if components renders with default value', () => {
        const {getByText} =render (<DropDown options={options} selected='' default='Country' onChange={()=>{}}/>)
        const selectElement = getByText('Country');
        expect(selectElement).toBeInTheDocument();

        fireEvent.click(selectElement);

        const entryElement = getByText('Australia');
        expect(entryElement).toBeInTheDocument();

        fireEvent.click(entryElement);
        expect(entryElement).not.toBeInTheDocument();
    });

})

