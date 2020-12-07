describe('A group of tests', () => {

    test("Jest works", () => {
        expect(1).toBe(1);
    })

    test("Second test within the same describe", () => {
        expect(1).toBe(1);
    })
});

describe('Another group', () => {
    
    test("2nd describe test", () => {
        expect(1).toBe(1);
    })
});
