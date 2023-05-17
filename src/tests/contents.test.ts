import { componentContent, reduxContent, routerContent } from "../filecontents";

describe("Contents", () => {
  it("Should return a React file content", () => {
    const component = componentContent("Component");
    expect(component).toEqual(`
    import React from 'react'

    export default function Component() {
        return <></>;
    }
    `);
  });

  it("Should return a Store file content", () => {
    const storeContent = reduxContent("redux");
    expect(storeContent).toEqual(`

    import { createSlice } from "react-redux";

    export const reduxSlice = createSlice({})
    `);
  });
});
