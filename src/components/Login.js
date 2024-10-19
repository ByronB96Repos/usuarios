import React, { useState } from 'react'
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const url = 'http://localhost:5283/api/Usuario/Login';

function Login() {

    const [tipoIdentificacion, SettipoIdentificacion] = useState('C')
    const [identificacion, Setidentificacion] = useState('')
    const redireccion = useNavigate();

    const logueo = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(url, {
                tipoIdentificacion: tipoIdentificacion,
                identificacion: identificacion
            });
            if (response.statusText === 'OK') {
                redireccion('/users');
            } else {
                console.log(Response.statusText)
            }
        } catch (error) {
            console.error("Error al realizar la solicitud", error);
        }
    };

    return (
        <div className="container-fluid">
            <form onSubmit={logueo}>
                <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                    <label className='mb-1'>Tipo de Indentificacion</label>
                    <select className='form-control mb-4' id='TipoIdentificacion' value={tipoIdentificacion} onChange={(e) => SettipoIdentificacion(e.target.value)}>
                        <option value='C'>Cedula</option>
                        <option value='R'> Ruc</option>
                        <option value='P'>Pasaporte</option>
                    </select>
                    <MDBInput required={true} value={identificacion} onChange={(e) => Setidentificacion(e.target.value)} wrapperClass='mb-4' label='Contraseña' id='Identificacion' type='password' />
                    <MDBBtn className="mb-4">Ingreso</MDBBtn>
                </MDBContainer>
            </form>
        </div>
    )
}

export default Login
