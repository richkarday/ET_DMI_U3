import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { DataTable } from 'react-native-paper';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import axios from 'axios';

const url = "http://localhost:3001/client";

const Delete = styled.TouchableOpacity`
  align-items: center;
  background-color: red;
  padding: 10px;
`
const DeleteText = styled.Text`
    color: white;
    font-weight: bold;
`
const Input = styled.TextInput`
    background-color: white;
    height: 40;
    margin: 12px;
    border-width: 1;
    padding: 10px;
`
const Add = styled.TouchableOpacity `
  align-items: center;
  justify-content: center;
  height: 30;
  background-color: blue;
  padding: 10px;
`

const AddText = styled.Text`
    font-weight: bold;
    color: white;
`
const Cancel = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 30;
  background-color: red;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
`
const CancelText = styled.Text`
    font-weight: bold;
    color: white;
`


const ModalContainer = styled.View`
    display: flex;
    background-color: white;
`



export default function Client() {

  const [client, setClient] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const [newClient, setNewClient] = useState(null);
  const [deletedClient, setDeletedClient] = useState(null);



  const [isModalVisible, setModalVisible ] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  useEffect(() => {
    axios.get(url).then(response => {
        console.log(response.data)
          setClient(response.data);
    });
  }, [newClient, deletedClient])

  const addClient = async () => {
    await axios.post(url, {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      direccion: direccion
    }).then(response => {
      toggleModal();
      setNewClient(nombre);
    }).catch(error => {
      console.log(error)
    }) 
  }

  const deleteClient = async (id) => {
    await axios.delete(`${url}/${id}`, {
    }).then(() => {
      alert('Delete')
    })
  }

  return (
    <View style={styles.container}>
      <Button title="Add Client" onPress={toggleModal}/>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nombre</DataTable.Title>
          <DataTable.Title>Apellido</DataTable.Title>
          <DataTable.Title>Telefono</DataTable.Title>
          <DataTable.Title>Dirección</DataTable.Title>
          <DataTable.Title>Acciones</DataTable.Title>
        </DataTable.Header>

        {client.clientDB?.map(client => {
          return (
          <DataTable.Row>
            <DataTable.Cell>{client.nombre}</DataTable.Cell>
            <DataTable.Cell>{client.apellido}</DataTable.Cell>
            <DataTable.Cell>{client.telefono}</DataTable.Cell>
            <DataTable.Cell>{client.direccion}</DataTable.Cell>
            <DataTable.Cell>
              <Delete  onPress={() => {deleteClient(client._id) 
              setDeletedClient(client._id)}}>
                  <DeleteText>Delete</DeleteText>
              </Delete>
            </DataTable.Cell>
          </DataTable.Row>
          )
        })}
      </DataTable>

      <Modal isVisible={isModalVisible}>
          <ModalContainer>
            <Input placeholder="Nombre" onChange={(event) => {setNombre(event.target.value)}}/>
            <Input placeholder="Apellido" onChange={(event) => {setApellido(event.target.value)}}/>
            <Input placeholder="Telefeno" onChange={(event) => {setTelefono(event.target.value)}}/>
            <Input placeholder="Dirección" onChange={(event) => {setDireccion(event.target.value)}}/>
            <Add onPress={() => addClient()}>
                <AddText>ADD CLIENT</AddText>
            </Add>
            <Cancel onPress={toggleModal}>
                <CancelText>CANCEL</CancelText>
            </Cancel>
          </ModalContainer>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  }
});
