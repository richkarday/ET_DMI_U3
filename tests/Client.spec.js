import React from "react";
import renderer from "react-test-renderer";
import Client from "./../pages/Client";

describe("<Client />", () => {
    it("has 1 child", () => {
        const tree = renderer.create(<Client />).toJSON();
        console.log(tree.children.length);
        expect(tree.children.length).toBe(1);
    })
})