import React from "react";
import renderer from "react-test-renderer";
import BookScreen from "./../pages/Book";

describe("<Book />", () => {
    it("has 1 child", () => {
        const tree = renderer.create(<BookScreen />).toJSON();
        expect(tree.children.length).toBe(1);
    })
})