import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

import flatListData from './FlatListData';


var screen = Dimensions.get('window');

export default class AddMett extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: '',
            newDescription: '',
        };
    }
    showAddMett = () => {
        this.refs.myModal.open();
    }
generateKey = (numberOfCharacters) => {
   return require('random-string')({length: numberOfCharacters});
}
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40
                }}>New meeting's information</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}           
                    onChangeText={(text) => this.setState({ newName: text })}
                    placeholder="Enter metting's name "
                    value={this.state.newName}                 
                />
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 10,
                        marginBottom: 20,
                        borderBottomWidth: 1
                    }}
                    
                    onChangeText={(text) => this.setState({ newFoodDescription: text })}
                    placeholder="Enter new food's description of Metting"
                    value={this.state.newFoodDescription}
                />
                <Button
                    style={{ fontSize: 18, color: 'white' }}
                    containerStyle={{
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: 'mediumseagreen'
                    }}
                    onPress={() => {
                         if (this.state.newName.length == 0 || this.state.newDescription.length == 0) {
                            alert("You must enter the plan and description of metting");
                            return;
                        }       
                        const newKey = this.generateKey(24);
                        const newName = {
                            key: newKey,
                            name: this.state.newName,
                            description: this.state.newDescription
                        };    
                        flatListData.push(newName);    
                        this.props.parentFlatList.refreshFlatList(newKey);                                
                        this.refs.myModal.close();                                                                       
                    }}>
                    Save
                </Button>
            </Modal>
        );
    }
}