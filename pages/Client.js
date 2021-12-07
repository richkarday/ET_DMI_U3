import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import i18n from '../localization/i18n';
import axios from 'axios';
import { Trans, useTranslation } from 'react-i18next';

const url = "https://back-biblioteca.herokuapp.com/client";
//const url = "http://192.168.1.221/client"

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
const Add = styled.TouchableOpacity`
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
  const { t } = useTranslation();
  const [client, setClient] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [newClient, setNewClient] = useState(null);
  const [deletedClient, setDeletedClient] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

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
    <ScrollView>
      <View style={styles.container}>
        <Button title={t("add_client")} onPress={toggleModal} />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{t("name")}</DataTable.Title>
            <DataTable.Title>{t("last_name")}</DataTable.Title>
            <DataTable.Title>{t("phone")}</DataTable.Title>
            <DataTable.Title>{t("address")}</DataTable.Title>
            <DataTable.Title>{t("actions")}</DataTable.Title>
          </DataTable.Header>

          {client.clientDB?.map(client => {
            return (
              <DataTable.Row key={client._id}>
                <DataTable.Cell>{client.nombre}</DataTable.Cell>
                <DataTable.Cell>{client.apellido}</DataTable.Cell>
                <DataTable.Cell>{client.telefono}</DataTable.Cell>
                <DataTable.Cell>{client.direccion}</DataTable.Cell>
                <DataTable.Cell>
                  <Delete onPress={() => {
                    deleteClient(client._id)
                    setDeletedClient(client._id)
                  }}>
                    <DeleteText>{t("delete")}</DeleteText>
                  </Delete>
                </DataTable.Cell>
              </DataTable.Row>
            )
          })}
        </DataTable>

        <Modal isVisible={isModalVisible}>
          <ModalContainer>
            <Input placeholder={t('name')} onChange={(event) => { setNombre(event.target.value) }} />
            <Input placeholder={t('last_name')} onChange={(event) => { setApellido(event.target.value) }} />
            <Input placeholder={t('phone')} onChange={(event) => { setTelefono(event.target.value) }} />
            <Input placeholder={t('address')} onChange={(event) => { setDireccion(event.target.value) }} />
            <Add onPress={() => addClient()}>
              <AddText>{t("add_client")}</AddText>
            </Add>
            <Cancel onPress={toggleModal}>
              <CancelText>{t("cancel")}</CancelText>
            </Cancel>
          </ModalContainer>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  }
});
