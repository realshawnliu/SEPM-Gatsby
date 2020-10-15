import {useState} from 'react';

export default function useForm(initial ={}) {
    const [inputs, updateInputs] = useState(initial);

    function handleLogin(e) {
        updateInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    function loginForm(){
        updateInputs(initial);
    }

    return{
        inputs,
        handleLogin,
        loginForm,
    };
}