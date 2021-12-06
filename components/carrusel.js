import React, { Component} from 'react';
import styled from 'styled-components/native';
const Caarrusel = styled.View`
    position:relative;
    width: 100%;
    height: 80%;
    overflow-x: hidden;
    overflow-y: auto;
    align-items: center;
    margin-bottom:10px;
`
const Libro = styled.View`
    position:relative;
    width: 100%;
    height: 30%;
    margin-bottom:10px;
`
const ImageBook = styled.Image`
    position:relative;
    object-fit: cover;
    height: 100%;
    width: 30%;
`
const Titulo = styled.Text`
    position:absolute;
    width:70%;
    height:100%;
    left: 30%;
    text-align:left;
    font-size:20px;
    top:0px;
`
export class Carrusel extends Component {
   
  
    render() {
        const onTrigger = (id) => {
            this.props.parentCallback(id,false);
            event.preventDefault();
        }
        return (
            <Caarrusel id='carrusel'>
                {
                    this.props.libros.map((element, index) => {
                        return (
                            <Libro key={index} onClick={() => onTrigger(element.shortId)}>
                                <ImageBook source={{ uri: element.img[0] }}></ImageBook>
                                <Titulo>{element.titulo}</Titulo>
                            </Libro>

                        )
                    })
                }

            </Caarrusel>

        )
    }

}
