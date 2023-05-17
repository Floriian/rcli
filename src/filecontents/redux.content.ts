export const reduxContent = (name: string) => {
    return `
    import { createSlice } from "react-redux";

    export const ${name} = createSlice({})
    `
}