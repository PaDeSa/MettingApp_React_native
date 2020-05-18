import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight } from 'react-native';
import FlatListData from './FlatListData';
import Swipeout from 'react-native-swipeout';
import AddMett from './AddMett';

class FlatListItem extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            activeRowKey: null
        };          
    }
    render() {   
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }              
            },          
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item.key });
            },      
            right: [
                { 
                    onPress: () => {    
                        const deletingRow = this.state.activeRowKey;          
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [                              
                              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              {text: 'Yes', onPress: () => {        
                                FlatListData.splice(this.props.index, 1); 
                                //Refresh FlatList ! 
                                this.props.parentFlatList.refreshFlatList(deletingRow);
                              }},
                            ],
                            { cancelable: true }
                          ); 
                    }, 
                    text: 'Delete', type: 'delete' 
                }
            ],  
            rowId: this.props.index, 
            sectionId: 1    
        };               
        return (  
            <Swipeout {...swipeSettings}>
                <View style={{
                flex: 1,
                flexDirection:'column',                                
                }}>            
                    <View style={{
                            flex: 1,
                            flexDirection:'row',
                            backgroundColor: 'mediumseagreen'
                    }}>            
                        <View style={{
                                flex: 1,
                                flexDirection:'column',   
                                height: 100                 
                            }}>            
                                <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                                <Text style={styles.flatListItem}>{this.props.item.description}</Text>

                        </View>              
                    </View>
                    <View style={{
                        height: 1,
                        backgroundColor:'white'                            
                    }}>
                
                    </View>
                </View>   
            </Swipeout>      
            
        );
    }
}
const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,  
    }
});

export default class MeetFlatList extends Component {
    constructor(props) {
        super(props);     
        this.state = ({
            deletedRowKey: null,            
        });
        this._onPressAdd = this._onPressAdd.bind(this);        
    }
    refreshFlatList = (activeKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: activeKey
            };
        });
        this.refs.flatList.scrollToEnd();
    }
    _onPressAdd () {
        // alert("You add Item");
        this.refs.AddMett.showAddMett();
    }
    render() {
      return (
        <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0}}>
            <View style={{
                backgroundColor: 'tomato', 
                flexDirection: 'row',
                justifyContent:'flex-end',                
                alignItems: 'center',
                height: 64}}>
                <TouchableHighlight 
                    style={{marginRight: 10}}
                    underlayColor='tomato'
                    onPress={this._onPressAdd}
                    >
                </TouchableHighlight>
            </View>
            <FlatList 
                ref={"flatList"}
                data={FlatListData}
                renderItem={({item, index})=>{
                    return (
                    <FlatListItem item={item} index={index} parentFlatList={this}>

                    </FlatListItem>);
                }}
                >

            </FlatList>
            <AddMett ref={'AddMett'} parentFlatList={this} >

            </AddMett>
        </View>
      );
    }
}