import { COR_ENUM, NomeCidade } from '../classes/cidade'

interface Cidade {
    nome: NomeCidade
    cor: COR_ENUM
    conectadoA: NomeCidade[]
}

export const cidades: Cidade[] = [
    {
        nome: 'San Francisco',
        cor: COR_ENUM.AZUL,
        conectadoA: ['Los Angeles', 'Chicago', 'Tokyo', 'Manila'],
    },
    {
        nome: 'Chicago',
        cor: COR_ENUM.AZUL,
        conectadoA: [
            'San Francisco',
            'Los Angeles',
            'Atlanta',
            'Montreal',
            'Mexico City',
        ],
    },
    {
        nome: 'Atlanta',
        cor: COR_ENUM.AZUL,
        conectadoA: ['Chicago', 'Washington', 'Miami'],
    },
    {
        nome: 'Montreal',
        cor: COR_ENUM.AZUL,
        conectadoA: ['Chicago', 'New York', 'Washington'],
    },
    {
        nome: 'New York',
        cor: COR_ENUM.AZUL,
        conectadoA: ['Montreal', 'Washington', 'Madrid', 'London'],
    },
    {
        nome: 'Washington',
        cor: COR_ENUM.AZUL,
        conectadoA: ['Atlanta', 'Montreal', 'New York', 'Miami'],
    },
    {
        nome: 'Madrid',
        cor: COR_ENUM.AZUL,
        conectadoA: ['New York', 'London', 'Paris', 'São Paulo', 'Algiers'],
    },
    {
        nome: 'London',
        cor: COR_ENUM.AZUL,
        conectadoA: ['New York', 'Madrid', 'Essen', 'Paris'],
    },
    {
        nome: 'Paris',
        cor: COR_ENUM.AZUL,
        conectadoA: ['London', 'Madrid', 'Milan', 'Algiers', 'Essen'],
    },
    {
        nome: 'Essen',
        cor: COR_ENUM.AZUL,
        conectadoA: ['London', 'Paris', 'Milan', 'St. Petersburg'],
    },
    {
        nome: 'Milan',
        cor: COR_ENUM.AZUL,
        conectadoA: ['Essen', 'Paris', 'Istanbul'],
    },
    {
        nome: 'St. Petersburg',
        cor: COR_ENUM.AZUL,
        conectadoA: ['Essen', 'Moscow', 'Istanbul'],
    },

    {
        nome: 'Los Angeles',
        cor: COR_ENUM.AMARELO,
        conectadoA: ['San Francisco', 'Chicago', 'Mexico City', 'Sydney'],
    },
    {
        nome: 'Mexico City',
        cor: COR_ENUM.AMARELO,
        conectadoA: ['Los Angeles', 'Chicago', 'Miami', 'Lima', 'Bogotá'],
    },
    {
        nome: 'Miami',
        cor: COR_ENUM.AMARELO,
        conectadoA: ['Atlanta', 'Washington', 'Mexico City', 'Bogotá'],
    },
    {
        nome: 'Bogotá',
        cor: COR_ENUM.AMARELO,
        conectadoA: [
            'Mexico City',
            'Miami',
            'Lima',
            'São Paulo',
            'Buenos Aires',
        ],
    },
    {
        nome: 'Lima',
        cor: COR_ENUM.AMARELO,
        conectadoA: ['Mexico City', 'Bogotá', 'Santiago'],
    },
    { nome: 'Santiago', cor: COR_ENUM.AMARELO, conectadoA: ['Lima'] },
    {
        nome: 'Buenos Aires',
        cor: COR_ENUM.AMARELO,
        conectadoA: ['Bogotá', 'São Paulo'],
    },
    {
        nome: 'São Paulo',
        cor: COR_ENUM.AMARELO,
        conectadoA: ['Buenos Aires', 'Bogotá', 'Madrid', 'Lagos'],
    },
    {
        nome: 'Lagos',
        cor: COR_ENUM.AMARELO,
        conectadoA: ['São Paulo', 'Kinshasa'],
    },
    {
        nome: 'Kinshasa',
        cor: COR_ENUM.AMARELO,
        conectadoA: ['Lagos', 'Johannesburg'],
    },
    { nome: 'Johannesburg', cor: COR_ENUM.AMARELO, conectadoA: ['Kinshasa'] },

    {
        nome: 'Algiers',
        cor: COR_ENUM.PRETO,
        conectadoA: ['Madrid', 'Paris', 'Istanbul', 'Cairo'],
    },
    {
        nome: 'Cairo',
        cor: COR_ENUM.PRETO,
        conectadoA: ['Algiers', 'Istanbul', 'Baghdad', 'Riyadh'],
    },
    {
        nome: 'Istanbul',
        cor: COR_ENUM.PRETO,
        conectadoA: [
            'Milan',
            'St. Petersburg',
            'Moscow',
            'Baghdad',
            'Cairo',
            'Algiers',
        ],
    },
    {
        nome: 'Baghdad',
        cor: COR_ENUM.PRETO,
        conectadoA: ['Istanbul', 'Cairo', 'Riyadh', 'Tehran', 'Karachi'],
    },
    {
        nome: 'Tehran',
        cor: COR_ENUM.PRETO,
        conectadoA: ['Moscow', 'Baghdad', 'Delhi', 'Karachi'],
    },
    {
        nome: 'Moscow',
        cor: COR_ENUM.PRETO,
        conectadoA: ['St. Petersburg', 'Istanbul', 'Tehran'],
    },
    {
        nome: 'Riyadh',
        cor: COR_ENUM.PRETO,
        conectadoA: ['Cairo', 'Baghdad', 'Karachi'],
    },
    {
        nome: 'Karachi',
        cor: COR_ENUM.PRETO,
        conectadoA: ['Baghdad', 'Riyadh', 'Delhi', 'Mumbai'],
    },
    {
        nome: 'Delhi',
        cor: COR_ENUM.PRETO,
        conectadoA: ['Tehran', 'Karachi', 'Mumbai', 'Chennai', 'Kolkata'],
    },
    {
        nome: 'Mumbai',
        cor: COR_ENUM.PRETO,
        conectadoA: ['Karachi', 'Delhi', 'Chennai'],
    },
    {
        nome: 'Chennai',
        cor: COR_ENUM.PRETO,
        conectadoA: ['Mumbai', 'Delhi', 'Kolkata', 'Bangkok', 'Jakarta'],
    },
    {
        nome: 'Kolkata',
        cor: COR_ENUM.PRETO,
        conectadoA: ['Delhi', 'Chennai', 'Bangkok', 'Hong Kong'],
    },

    {
        nome: 'Beijing',
        cor: COR_ENUM.VERMELHO,
        conectadoA: ['Shanghai', 'Seoul'],
    },
    {
        nome: 'Seoul',
        cor: COR_ENUM.VERMELHO,
        conectadoA: ['Beijing', 'Shanghai', 'Tokyo'],
    },
    {
        nome: 'Tokyo',
        cor: COR_ENUM.VERMELHO,
        conectadoA: ['Seoul', 'Shanghai', 'Osaka', 'San Francisco'],
    },
    {
        nome: 'Shanghai',
        cor: COR_ENUM.VERMELHO,
        conectadoA: ['Beijing', 'Seoul', 'Tokyo', 'Taipei', 'Hong Kong'],
    },
    { nome: 'Osaka', cor: COR_ENUM.VERMELHO, conectadoA: ['Tokyo', 'Taipei'] },
    {
        nome: 'Taipei',
        cor: COR_ENUM.VERMELHO,
        conectadoA: ['Shanghai', 'Osaka', 'Hong Kong', 'Manila'],
    },
    {
        nome: 'Hong Kong',
        cor: COR_ENUM.VERMELHO,
        conectadoA: [
            'Shanghai',
            'Taipei',
            'Kolkata',
            'Bangkok',
            'Ho Chi Minh City',
            'Manila',
        ],
    },
    {
        nome: 'Bangkok',
        cor: COR_ENUM.VERMELHO,
        conectadoA: [
            'Kolkata',
            'Chennai',
            'Hong Kong',
            'Ho Chi Minh City',
            'Jakarta',
        ],
    },
    {
        nome: 'Manila',
        cor: COR_ENUM.VERMELHO,
        conectadoA: [
            'Taipei',
            'Hong Kong',
            'Ho Chi Minh City',
            'Sydney',
            'San Francisco',
        ],
    },
    {
        nome: 'Ho Chi Minh City',
        cor: COR_ENUM.VERMELHO,
        conectadoA: ['Bangkok', 'Hong Kong', 'Jakarta', 'Manila'],
    },
    {
        nome: 'Jakarta',
        cor: COR_ENUM.VERMELHO,
        conectadoA: ['Chennai', 'Bangkok', 'Ho Chi Minh City', 'Sydney'],
    },
    {
        nome: 'Sydney',
        cor: COR_ENUM.VERMELHO,
        conectadoA: ['Jakarta', 'Manila', 'Los Angeles'],
    },
] as const
