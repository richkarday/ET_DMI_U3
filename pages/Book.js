import React,{useState, useEffect} from 'react';
import { StyleSheet, View, Button, Text, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import i18n from '../localization/i18n';
import axios from 'axios';

const url = "http://localhost:3001/libro";

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
 
const BookScreen = () =>{
    const [book, setBook] = useState("");

    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [editorial, setEditorial] = useState("");
  
    const [newBook, setNewBook] = useState(null);
    const [deletedBook, setDeleteBook] = useState(null);
  
    const [isModalVisible, setModalVisible ] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }
    const addBook = async () => {
        await axios.post(url, {
          titulo: titulo,
          autor: autor,
          categoria: categoria,
          editorial: editorial
        }).then(response => {
          toggleModal();
          setNewBook(titulo);
          console.log(book);
        }).catch(error => {
          console.log(error)
        }) 
      }
      const deleteBook = async (id) => {
        await axios.delete(`${url}/${id}`, {
        }).then(() => {
          alert('Delete')
        })
      }

      useEffect(() => {
        axios.get(url).then(response => {
            console.log(response.data)
              setBook(response.data);
        });
      }, [newBook, deletedBook])
    
      
    return(
      <ScrollView>
        <View style={styles.container}>
            <Button title="Agregar Libro" onPress={toggleModal}/>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>{i18n.t("info").titulo}</DataTable.Title>
                    <DataTable.Title>{i18n.t("info").autor}</DataTable.Title>
                    <DataTable.Title>{i18n.t("info").categoria}</DataTable.Title>
                    <DataTable.Title>{i18n.t("info").editorial}</DataTable.Title>
                    <DataTable.Title>{i18n.t("info").actions}</DataTable.Title>
                </DataTable.Header>
                {book.libros?.map(book => {
          return (
          <DataTable.Row key={book._id}>
            <DataTable.Cell>{book.titulo}</DataTable.Cell>
            <DataTable.Cell>{book.autor}</DataTable.Cell>
            <DataTable.Cell>{book.categoria}</DataTable.Cell>
            <DataTable.Cell>{book.editorial}</DataTable.Cell>
            <DataTable.Cell>
              <Delete  onPress={() => {deleteBook(book._id) 
              setDeleteBook(book._id)}}>
                  <DeleteText>{i18n.t("delete")}</DeleteText>
              </Delete>
            </DataTable.Cell>
          </DataTable.Row>
          )
        })}
            </DataTable>
            <Modal isVisible={isModalVisible}>
                <ModalContainer>
                <Input placeholder="Nombre" onChange={(event) => {setTitulo(event.target.value)}}/>
                <Input placeholder="Autor" onChange={(event) => {setAutor(event.target.value)}}/>
                <Input placeholder="Categoria" onChange={(event) => {setCategoria(event.target.value)}}/>
                <Input placeholder="Editorial" onChange={(event) => {setEditorial(event.target.value)}}/>
                <Add onPress={() => addBook()}>
                    <AddText>{i18n.t("add")}</AddText>
                </Add>
                <Cancel onPress={toggleModal}>
                    <CancelText>{i18n.t("cancel")}</CancelText>
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
  
export default BookScreen;