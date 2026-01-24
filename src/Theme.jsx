import {create} from 'zustand'

const Theme = create((set)=>({
    mode:"dark",
    setMode:(val)=>set({mode:val})
}))
export default Theme