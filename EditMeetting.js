import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from './FlatListData';

var screen = Dimensions.get('window');
export default class EditMeeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            foodDescription: ''
        };
    }
    showEditMeeting = (edittingName, flatlistItem) => {     
        // console.log(`edittingName = ${JSON.stringify(edittingName)}`);           
        this.setState({
            key: edittingName.key,
            name: edittingName.name,
            foodDescription: edittingName.foodDescription,
            flatlistItem: flatlistItem
        });
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
                }}>Information of Meeting</Text>
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
                    onChangeText={(text) => this.setState({ name: text })}
                    placeholder="Enter your metting "
                    value={this.state.name}                 
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
                    
                    onChangeText={(text) => this.setState({ foodDescription: text })}
                    placeholder="Enter the description"
                    value={this.state.foodDescription}
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
                         if (this.state.name.length == 0 || this.state.foodDescription.length == 0) {
                            alert("You must enter metting and description");
                            return;
                        }       
                        //Update existing Food
                        var foundIndex = flatListData.findIndex(item => this.state.key == item.key);
                        if (foundIndex < 0) {
                            return;
                        }
                        flatListData[foundIndex].name = this.state.name;
                        flatListData[foundIndex].foodDescription = this.state.foodDescription;
                        
                        this.state.flatlistItem.refreshFlatListItem();

                        this.refs.myModal.close();                                                                       
                    }}>
                    Save
                </Button>
            </Modal>
        );
    }
}