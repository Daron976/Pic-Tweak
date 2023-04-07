import filterLogic from "../filter"

describe('Filter logic', () => {
    test('filter function should return an array of length 2',async () => {
        const result = filterLogic('vintage', 50);

        expect(result?.length).toBe(2);
    })
})