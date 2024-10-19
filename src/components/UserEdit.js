import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const url = 'http://localhost:5283/api/Usuario/Editar';

function UserEdit() {
    const { usuarioId } = useParams();  // Correcta obtención de usuarioId
    const [nombre, SetNombre] = useState('');
    const [identificacion, SetIdentificacion] = useState('');
    const [celular, SetCelular] = useState('');
    const [email, SetEmail] = useState('');
    const [codclte, SetCodclte] = useState('');
    const [tipoidentificacion, SetTipoIdentificacion] = useState('');
    const redireccion = useNavigate();

    useEffect(() => {
        // Asegúrate de que usuarioId no sea undefined antes de llamar a la API
        if (usuarioId) {
            const getProduct = async () => {
                const api = `http://localhost:5283/api/Usuario/Buscar/${usuarioId}`;
                //console.log(api);
                try {
                    const result = await axios.get(api);
                    SetNombre(result.data.nombre);
                    SetIdentificacion(result.data.identificacion);
                    SetCelular(result.data.celular);
                    SetEmail(result.data.email);
                    SetCodclte(result.data.codclte);
                    SetTipoIdentificacion(result.data.tipoidentificacion);
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                }
            };
            getProduct();
        }
    }, [usuarioId]);

    const update = async (e) => {
        e.preventDefault();
        const params = {
            usuarioId: usuarioId,
            nombre: nombre,
            identificacion: identificacion,
            celular: celular,
            email: email,
            tipoidentificacion: 'C',
            codclte: codclte
        };
        console.log(params);
        try {
            await axios.post(url, params);
            redireccion('/users');
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row mt-4">
                <div className="col-md-1 offset-md-1">
                    <div className="d-grid mx-auto">
                        <form onSubmit={update}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <table style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ padding: '0px', textAlign: 'right' }}>Nombre</td>
                                            <td style={{ padding: '1px', textAlign: 'left' }}>
                                                <input id='nombre' required={true} value={nombre} onChange={(e) => SetNombre(e.target.value)}
                                                    type="text" className='form-control' style={{ width: '200px' }} />
                                            </td>
                                            <td style={{ padding: '10px', textAlign: 'right' }}>Celular</td>
                                            <td style={{ padding: '10px', textAlign: 'left' }}>
                                                <input id='celular' required={true} value={celular} onChange={(e) => SetCelular(e.target.value)}
                                                    type="text" className='form-control' style={{ width: '200px' }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '0px', textAlign: 'right' }}>Identificación</td>
                                            <td style={{ padding: '1px', textAlign: 'left' }}>
                                                <input id='identificacion' required={true} value={identificacion} onChange={(e) => SetIdentificacion(e.target.value)}
                                                    type="text" className='form-control' style={{ width: '200px' }} />
                                            </td>
                                            <td style={{ padding: '10px', textAlign: 'right' }}>Email</td>
                                            <td style={{ padding: '10px', textAlign: 'left' }}>
                                                <input id='email' required={true} value={email} onChange={(e) => SetEmail(e.target.value)}
                                                    type="text" className='form-control' style={{ width: '200px' }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '0px', textAlign: 'right' }}></td>
                                            <td style={{ padding: '1px', textAlign: 'right' }}>
                                                <br />
                                                <button className="btn btn-success">
                                                    Actualizar
                                                </button>
                                            </td>
                                            <td style={{ padding: '0px', textAlign: 'left' }}></td>
                                            <td style={{ padding: '10px', textAlign: 'left' }}>
                                                <br />

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserEdit;
