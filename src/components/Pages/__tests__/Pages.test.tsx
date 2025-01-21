import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {PageImage} from '../index';

const images=[
    {
        "id": "linux-2-image",
        "name": "Linux 2 image",
        "cost": 243.61,
        "detail": "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
        "versions": [ "64-bit(x86)" , "64-bit(ARM)" ]
    },
    {
        "id": "ubuntu-server",
        "name": "Ubuntu Server 18.04 LTS",
        "cost": 243.61,
        "detail": "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
        "versions": [ "64-bit(x86)" , "64-bit(ARM)" ]
    },
    {
        "id": "red-hat",
        "name": "Red Hat Enterprise Linux 8",
        "cost": 300,
        "detail": "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
        "versions": [ "64-bit(x86)" , "64-bit(ARM)" ]
    },
    {
        "id": "microsoft-windows",
        "name": "Microsoft Windows Server 2019 Base",
        "cost": 338.77,
        "detail": "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
        "versions": [ "64-bit(ARM)"]
    },
    {
        "id": "linux-suse",
        "name": "SUSE Linux Enterprise Server",
        "cost": 200.22,
        "detail": "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
        "versions": [ "64-bit(x86)" , "64-bit(ARM)" ]
    }
]

describe('Testing our dropdown component', () => {
    test('something',() => {
        const {getByText,getByPlaceholderText,getAllByPlaceholderText} =render (<PageImage region='india' selectedVersion='64-bit(x86)' selectedImage='ubuntu-server' onSelect={()=>{}}/>)
        const entryElement = getByText('SUSE Linux Enterprise Server');
        expect(entryElement).toBeInTheDocument();

        let radioElement = getAllByPlaceholderText('ubuntu-server-radio');
        expect(radioElement[0]).toBeInTheDocument();

        fireEvent.click(radioElement[0]);
        const btnElement = getByText('Selected');
        expect(btnElement).toBeInTheDocument();
        expect(btnElement).toBeDisabled();

        fireEvent.click(radioElement[1]);
        expect(btnElement).not.toBeDisabled();
    });

})

