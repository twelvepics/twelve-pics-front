const categoriesList = [
    {
        key: 'documentary',
        id: 1,
        display: 'Documentary'
    },
    {
        key: 'stillLife',
        id: 2,
        display: 'Still life'
    },
    {
        key: 'streetPhotography',
        id: 3,
        display: 'Street photography'
    },
    {
        key: 'wildLife',
        id: 4,
        display: 'Nature and wildlife'
    },
    {
        key: 'landscape',
        id: 5,
        display: 'Landscape'
    },
    {
        key: 'travel',
        id: 6,
        display: 'Travel'
    },
    {
        key: 'dailyLife',
        id: 7,
        display: 'Daily life'
    },
    {
        key: 'cityScape',
        id: 8,
        display: 'Cityscape'
    },
    {
        key: 'fineArt',
        id: 9,
        display: 'Fine art'
    },
    {
        key: 'portrait',
        id: 10,
        display: 'Portrait'
    },
    {
        key: 'sport',
        id: 11,
        display: 'Sport'
    },
    {
        key: 'whatever',
        id: 12,
        display: 'Whatever'
    },
]

const categoriesDisplay = categoriesList.reduce((acc, item) => {
    acc[item.key] = item.display;
    return acc;
}, {});

const categoriesToIds = categoriesList.reduce((acc, item) => {
    acc[item.key] = item.id;
    return acc;
}, {});

module.exports = { categoriesList, categoriesDisplay, categoriesToIds }