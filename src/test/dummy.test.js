test("environment should be test", () => {
    expect(process.env.NODE_ENV).toBe("test");
})