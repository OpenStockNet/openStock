import dummyCategories from './dummyCategories.json';

test ('cats are correct', () => {
    expect(dummyCategories).toMatchSnapshot();
})