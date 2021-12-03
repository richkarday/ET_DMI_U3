import React from "react";
import renderer from "react-test-renderer";

import Client from "./Client";

describe("<Client />", () => {
    it("has 1 child", () => {
        const tree = renderer.create(<Client />).toJSON();
        expect(tree.children.length).toBe(1);
    })
})