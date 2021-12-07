import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import { DataTable } from 'react-native-paper';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { ArrowUpOutline } from 'react-ionicons'
import { Carrusel } from './../components/carrusel'

import axios from 'axios';
import { Trans,useTranslation } from 'react-i18next';


const Container = styled.View`
    position:relative;
    width: 100%;
    height: auto;
    display: flex;
    padding: 20px;
    text-align:center;
`
const Title = styled.Text`
    position:relative;
    font-size:25px;
    display:block;
`
const Input = styled.TextInput`
    position:relative;
    margin:0 0 10px 0;
    border:1px solid;
    border-radius:5px;
    width:100%;
    height:30px;
    font-size:20px; 
`
const Select = styled.Picker`
    position:relative;
    margin:0 0 10px 0;
    border:1px solid;
    border-radius:5px;
    width:100%;
    height:30px;
    font-size:20px;
    
`
const Button = styled.TouchableOpacity`
    position:relative;
    margin:0 0 10px 0;
    border:1px solid #2196F3;
    border-radius:4px;
    width:100%;
    height:35px;
    background-color: ${props => props.danger ? '#2196F3' : 'red' };
    color: white;
    text-align:center;
`
const Text = styled.Text`
    color: white;
    text-align:center;
`
const Salto = styled.View`
    position:relative;
    display: block;
    width:100%;
    height:1px;
    
`
const ButtonFloat = styled.TouchableOpacity`
    position:fixed;
    bottom: 20px;
    width:fit-content;
    right:20px;
    border:none;
    z-index:9;
`
const Alert = styled.View`
    position:fixed;
    bottom: 20px;
    width:90%;
    padding:10px;
    margin:5%
    color: white;
    -webkit-box-shadow: -7px 10px 20px 9px rgba(0,0,0,0.88); 
    background-color:  #4CAF50;
    border:none;
    border-radius:5px;
    z-index:9;
    text-align:center;
`

function RentalBook() {
    const { t } = useTranslation();

    //Declaracion de useSates 

    const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)); }
    const url = "https://back-biblioteca.herokuapp.com/"
    const [visibleButton, setvisibleButton] = useState(false);
    const [visibleAlert, setvisibleAlert] = useState(false);
    const [spinShow, setspinShow] = useState(false);
    const [showCarrusel, setshowCarrusel] = useState(false);
    const [showForm, setshowForm] = useState(false)
    const [mensaje, setmensaje] = useState("");
    const [_id, set_id] = useState('');
    const [idLibro, setidLibro] = useState(0);
    const [libro, setlibro] = useState("");
    const [libros, setLibros] = useState([]);
    const [autor, setautor] = useState("");
    const [fecha, setFecha] = useState(Moment());
    const [showCalendar, setshowCalendar] = useState(false)
    const [total, setTotal] = useState(0);
    const [usuariosid, setusuariosid] = useState([])
    const [client, setClient] = useState('');
    const [nombre, setnombre] = useState("")
    const [apellido, setapellido] = useState("")
    const [telefono, settelefono] = useState("")
    const [direccion, setdireccion] = useState("")
    const [email, setemail] = useState("")
    const [renta, setrenta] = useState([])

    // -->  Final de UseStates  <-- -->

    useEffect(() => {
        axios.get(`${url}renta`).then(response => {
            setrenta(response.data.response)
        }).catch((err) => {

        })
        axios.get(`${url}client`).then(response => {
            setusuariosid(response.data.clientDB)

        }).catch((err) => {

        })
        axios.get(`${url}libro/`).then(response => {
            setLibros(response.data.libros)
        }).catch((err) => {
        })

        window.onscroll = () => {
            if (window.pageYOffset > 140) {
                setvisibleButton(true)
            } else {
                setvisibleButton(false)

            }
        }
    }, [])
    useEffect(() => {
        if (libro) {
            axios.get(`${url}libro/regex=${libro}`).then(response => {
                setLibros(response.data.libros)
            }).catch((err) => {
            })
        }

    }, [libro])
    useEffect(() => {
        axios.get(`${url}libro/buscar=${idLibro}`).then(response => {
            set_id(response.data.libros[0]._id)
            setlibro(response.data.libros[0].titulo);
            setautor(response.data.libros[0].autor);

        }).catch((err) => {
        })
        // setlibro(idLibro)
    }, [idLibro])
    useEffect(() => {
        let now = new Date()
        let strToDate = new Date(fecha);
        setTotal((Math.round((strToDate - now) / (1000 * 60 * 60 * 24)) + 1) * 5 || 0)

    }, [fecha])
    useEffect(() => {
        if (!client || client == 1) {
            setnombre('')
            setapellido('')
            settelefono('')
            setdireccion('')
            setemail('')
        } else {
            axios.get(`${url}client/buscar=${client}`).then(response => {
                setnombre(response.data.usuarios.nombre)
                setapellido(response.data.usuarios.apellido)
                settelefono(response.data.usuarios.telefono)
                setdireccion(response.data.usuarios.direccion)
                setemail(response.data.usuarios.correo || '')
            }).catch((err) => {
                setnombre('')
                setapellido('')
                settelefono('')
                setdireccion('')
                setemail('')
            })
        }
    }, [client])
    const createRental = async () => {
        setspinShow(true)
        if (total == 0 || nombre == '') {
            setspinShow(false)
            await setmensaje("Todos los campos son obligatorios")
            await setvisibleAlert(true)
            await sleep(3000)
            await setvisibleAlert(false)
        } else {
            let data = {
                libro: _id,
                usuario: client,
                total: total,
                entrega: fecha
            }
            axios.post(`${url}renta`, data).then(response => {
                axios.get(`${url}renta`).then(async response => {
                    setspinShow(false)
                    await setmensaje("Se registro correctamente la renta")
                    await setrenta(response.data.response)
                    await setvisibleAlert(true)
                    await setshowForm(false)
                    await sleep(3000)
                    await setvisibleAlert(false)


                }).catch(async (err) => {
                    await setspinShow(false)
                    await setmensaje("Ocurrio un error")
                    await setvisibleAlert(true)
                    await sleep(3000)
                    await setvisibleAlert(false)
                    console.log(err);

                })
            }).catch((err) => {
                console.log(err);
                setspinShow(false)
            })
        }
    }
    const delteRental = (id, key) => {
        setspinShow(true)
        let data = {
            estado: false,
        }
        axios.put(`${url}renta/delete=${id}`, data).then(response => {
            axios.get(`${url}renta`).then(async response => {
                setspinShow(false)
                await setmensaje("Se entrego correctamente la renta")
                await setrenta(response.data.response)
                await setvisibleAlert(true)
                await sleep(3000)
                await setvisibleAlert(false)

            }).catch((err) => {
                setspinShow(false)
            })
        }).catch((err) => {
            setspinShow(false)
            console.log(err);
        })
    }
    const handleCallback = (childData) => {
        setidLibro(childData);
        setshowCarrusel(false);
    }


    return (
        <View >
            {visibleAlert ? <Alert><Text>{mensaje}</Text></Alert> : null}
            {visibleButton ? <ButtonFloat>
                <ArrowUpOutline color={'#FF0000'} height="40px" width="40px" onClick={() => window.scrollTo(0, 0)} />
            </ButtonFloat> : null}
            {showForm ? <Container>
                {showCalendar ? <Calendar
                    style={{
                        position: 'absolute',
                        zIndex: 9,
                        background: 'white',
                        width: '100%',
                        left: '0',
                        top: '50%',
                        transform: 'translate(-0,-50%)'
                    }}
                    onChange={(date) => { setFecha(date); setshowCalendar(false); }}
                    selected={Moment()}
                    minDate={Moment().startOf('day')}
                    maxDate={Moment().add(10, 'years').startOf('day')}
                /> : null}
                <Title>{t('rental_book')}</Title>
                <Salto></Salto>
                <Input type="text" value={libro} placeholder={t('search_book')} onClick={() => setshowCarrusel(true)} onChange={e => setlibro(e.target.value)}></Input>
                <Salto></Salto>
                {showCarrusel ? <Carrusel parentCallback={handleCallback} libros={libros}></Carrusel> : null}
                <Input type="text" value={autor} placeholder={t('autor')}></Input>
                <Salto></Salto>
                <Input placeholder={t('deliver_date')} value={new Date(fecha).toLocaleDateString("en-US")} onClick={() => setshowCalendar(true)} ></Input>
                <Salto></Salto>
                <Select onChange={e => setClient(e.target.value)}>
                    <Select.Item label={t('select_client')} value="1" />
                    {
                        usuariosid.map((usuario, key) => {
                            return (
                                <Select.Item key={key} label={usuario.shortId + ' - ' + usuario.nombre} value={usuario._id} />
                            )
                        })
                    }
                </Select>
                <Salto></Salto>
                <Input type="text" placeholder={t('name')} value={nombre} onChange={e => setnombre(e.target.value)}></Input>
                <Salto></Salto>
                <Input type="text" placeholder={t('last_name')} value={apellido} onChange={e => setapellido(e.target.value)}></Input>
                <Salto></Salto>
                <Input type="text" placeholder={t('phone')} value={telefono} onChange={e => settelefono(e.target.value)}></Input>
                <Salto></Salto>
                <Input type="text" placeholder={t('email')} value={email} onChange={e => setemail(e.target.value)}></Input>
                <Salto></Salto>
                <Input type="text" placeholder={t('address')} value={direccion} onChange={e => setdireccion(e.target.value)}></Input>
                <Salto></Salto>
                <Input type="text" value={"$" + total + ".00"}></Input>
                <Salto></Salto>
                <Button danger={ true } onClick={() => createRental()}><Text onClick={() => createRental()}>{t('create')}</Text></Button>
                <Button danger={ false } onClick={() => setshowForm(false)}><Text onClick={() => setshowForm(false)}>{t('cancel')}</Text></Button>

            </Container> : null}
            {showForm ? null :
                <Container>
                    <Button danger={ true } onClick={() => setshowForm(true)}><Text onClick={() => setshowForm(true)}>{t('create_renta')}</Text></Button>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>{t('book')}</DataTable.Title>
                            <DataTable.Title>{t('client')}</DataTable.Title>
                            {/* <DataTable.Title>Telefono</DataTable.Title> */}
                            {/* <DataTable.Title>Fecha Entrega</DataTable.Title> */}
                            <DataTable.Title>{t('charges')}</DataTable.Title>
                            <DataTable.Title>{t('actions')}</DataTable.Title>
                        </DataTable.Header>
                        {renta?.map((renta, key) => {
                            return (
                                <DataTable.Row key={key}>
                                    <DataTable.Cell>{renta.libro}</DataTable.Cell>
                                    <DataTable.Cell>{renta.client}</DataTable.Cell>
                                    {/* <DataTable.Cell>{renta.telefono}</DataTable.Cell> */}
                                    {/* <DataTable.Cell>{renta.fecha_entrega}</DataTable.Cell> */}
                                    <DataTable.Cell>${renta.cargos}.00</DataTable.Cell>
                                    <DataTable.Cell><Button danger={ true } onClick={() => delteRental(renta._id, key)}><Text onClick={() => delteRental(renta._id, key)}>{t('delivered')}</Text></Button></DataTable.Cell>
                                </DataTable.Row>
                            )
                        })}
                    </DataTable>
                </Container>
            }
        </View>
    );
}

export default RentalBook