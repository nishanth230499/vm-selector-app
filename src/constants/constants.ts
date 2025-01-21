export const tabs=['Choose Image','Choose Instance Type','Choose Storage and Network', 'Configure Security','Review & Launch'];
export const regions=['us-east-1','us-east-2','us-west-1','india-1']
export const images=[
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

export const instances=[
    {
        'name': 'General Purpose',
        'value': 'gp',
        'core':[
            {
                'name': '1 Core',
                'value': 1,
                'cost': 0
            },
            {
                'name': '2 Core',
                'value': 2,
                'cost': 0
            },
            {
                'name': '4 Core',
                'value': 4,
                'cost': 0
            }
        ],
        'memory':[
            {
                'name': '256 MB',
                'value': '256MB',
                'cost': 0
            },
            {
                'name': '512 MB',
                'value': '512MB',
                'cost': 0
            },
            {
                'name': '1 GB',
                'value': '1GB',
                'cost': 0
            },
            {
                'name': '2 GB',
                'value': '2GB',
                'cost': 0
            },
            {
                'name': '4 GB',
                'value': '4GB',
                'cost': 0
            }
        ]
    },
    {
        'name': 'CPU Optimised',
        'value': 'cmpt',
        'core':[
            {
                'name': '1 Core',
                'value': 1,
                'cost': 0
            },
            {
                'name': '2 Core',
                'value': 2,
                'cost': 0
            },
            {
                'name': '8 Core',
                'value': 8,
                'cost': 20
            },
            {
                'name': '16 Core',
                'value': 16,
                'cost': 40
            }
        ],
        'memory':[
            {
                'name': '16 GB',
                'value': '16GB',
                'cost': 0
            },
            {
                'name': '32 GB',
                'value': '32GB',
                'cost': 20
            },
            {
                'name': '64 GB',
                'value': '64GB',
                'cost': 40
            }
        ]
    },
    {
        'name': 'Storage Optimised',
        'value': 'strg',
        'core':[
            {
                'name': '1 Core',
                'value': 1,
                'cost': 0
            },
            {
                'name': '8 Core',
                'value': 8,
                'cost': 20
            },
            {
                'name': '16 Core',
                'value': 16,
                'cost': 40
            }
        ],
        'memory':[
            {
                'name': '16 GB',
                'value': '16GB',
                'cost': 0
            },
            {
                'name': '32 GB',
                'value': '32GB',
                'cost': 20
            },
            {
                'name': '64 GB',
                'value': '64GB',
                'cost': 40
            }
        ]
    },
    {
        'name': 'Network Optimised',
        'value': 'nwrk',
        'core':[
            {
                'name': '1 Core',
                'value': 1,
                'cost': 0
            },
            {
                'name': '2 Core',
                'value': 2,
                'cost': 0
            },
            {
                'name': '4 Core',
                'value': 4,
                'cost': 0
            },
            {
                'name': '8 Core',
                'value': 8,
                'cost': 20
            },
            {
                'name': '16 Core',
                'value': 16,
                'cost': 40
            }
        ],
        'memory':[
            {
                'name': '256 MB',
                'value': '256MB',
                'cost': 0
            },
            {
                'name': '512 MB',
                'value': '512MB',
                'cost': 0
            },
            {
                'name': '1 GB',
                'value': '1GB',
                'cost': 0
            },
            {
                'name': '2 GB',
                'value': '2GB',
                'cost': 0
            },
            {
                'name': '4 GB',
                'value': '4GB',
                'cost': 0
            },
            {
                'name': '16 GB',
                'value': '16GB',
                'cost': 0
            },
            {
                'name': '32 GB',
                'value': '32GB',
                'cost': 20
            },
            {
                'name': '64 GB',
                'value': '64GB',
                'cost': 40
            }
        ]
    }
]