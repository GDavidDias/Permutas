import { createSlice } from "@reduxjs/toolkit";

const initialState={
    id_usuario:'',
    dni:'',
    permiso:''
};

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state, action) => {
            const{id_usuario, dni, permiso} = action.payload;
            state.id_usuario = id_usuario;
            state.dni = dni;
            state.permiso = permiso;
        },
        outUser:(state, action)=>{
            state.id_usuario = '';
            state.dni = '';
            state.permiso = '';
        }
    }
});

export const {setUser, outUser} = userSlice.actions;
export default userSlice.reducer;