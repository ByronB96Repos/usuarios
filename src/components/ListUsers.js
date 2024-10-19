import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url = 'http://localhost:5283/api/Usuario/Listar';
function ListUsers() {

    const [usuarios, SetUsuarios] = useState([]);
    const [nombre, SetNombre] = useState('');
    const [identificacion, SetIdentificacion] = useState('');
    const [celular, SetCelular] = useState('');
    const [email, SetEmail] = useState('');
    const [codclte, SetCodclte] = useState('');
    const [tipoidentificacion, SetTipoIdentificacion] = useState('');

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const respuesta = await axios.get(url);
        SetUsuarios(respuesta.data);
    }

    const deleteProduct = async (usuarioId) => {
        const params = { usuarioId: usuarioId };
        const metodo = "DELETE";
        const api = `http://localhost:5283/api/Usuario/Eliminar/${usuarioId}`;
        await axios({ method: metodo, url: api, data: params });
        getUsuarios();
    }

    const ingresar = async (e) => {
        e.preventDefault();
        const cod = Math.floor(Math.random() * 90000) + 10000;
        const params = {
            nombre: nombre,
            identificacion: identificacion,
            celular: celular,
            email: email,
            tipoidentificacion: 'C',
            codclte: cod.toString()
        };
        const api = 'http://localhost:5283/api/Usuario/Nuevo';
        const response = await axios.post(api, params);

        if (response.statusText === 'OK') {
            getUsuarios();
            // Restablecer los campos después de la inserción exitosa
            restablecer();
        } else {
            console.log(response.statusText);
        }
    }

    const restablecer = () => {
        // Restablece los valores de los estados
        SetNombre('');
        SetIdentificacion('');
        SetCelular('');
        SetEmail('');
        SetCodclte('');
        SetTipoIdentificacion('');
    }

    return (
        <div className="container-fluid">
            <div className="row mt-4">
                <div className="col-md-1 offset-md-1">
                    <div className="d-grid mx-auto">
                        <form onSubmit={ingresar}>
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
                                                    Ingresar
                                                </button>
                                            </td>
                                            <td style={{ padding: '0px', textAlign: 'left' }}></td>
                                            <td style={{ padding: '10px', textAlign: 'left' }}>
                                                <br />
                                                <button type="button" className="btn btn-dark" onClick={restablecer}>
                                                    Cancelar
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 col-lg-10 offset-0 offset-lg-1">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Accion</th>
                                    <th>Nombre</th>
                                    <th>Identificacion</th>
                                    <th>Celular</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {usuarios.map((usuario, i) => (
                                    <tr key={usuario.usuarioId}>
                                        <td>
                                            <div className="d-md-flex justify-content-md-end">
                                                <Link to={`/edit/${usuario.usuarioId}`} className="btn btn-warning me-md-2">
                                                    Editar
                                                </Link>
                                                <button className="btn btn-danger" onClick={() => deleteProduct(usuario.usuarioId)}>Eliminar</button>
                                            </div>
                                        </td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.identificacion}</td>
                                        <td>{usuario.celular}</td>
                                        <td>{usuario.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListUsers;
