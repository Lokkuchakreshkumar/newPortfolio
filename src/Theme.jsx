import {create} from 'zustand'

const Theme = create((set)=>({
    mode:"dark",
    setMode:(val)=>set({mode:val}),
    customTheme: null,
    setCustomTheme: (val) => set({customTheme: val})
}))
export default Theme