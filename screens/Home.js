import React, { Component } from "react";
import {View,Text,StyleSheet,FlatList,SafeAreaView,Alert} from "react-native"
import {ListItem} from 'react-native-elements'
import axios from 'axios'
export default class HomeScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            list_data : [],
            url:'http://127.0.0.1:5000/',
        }
    }
    getPlanets = () =>{
        const {url} = this.state;
        axios
        .get(url)
        .then(response =>{
            return this.setState({
                list_data:response.data.data
            })
        })
        .catch(error =>{
            Alert.alert(error.message)
        }) 
    }
    componentDidMount(){
        this.getPlanets();
    }
    renderItem = ({item,index})=>(
        <ListItem 
        key ={index} 
        title = {'Planet$:${item.name}'}
        subtitle = {'Diatance from earth:${item.distance_from_earth}'}
        titleStyle = {styles.title}
        containerStyle = {styles.list_container}
        bottomDivider 
        chevron
        onPress = {()=>
        this.props.navigation.navigate('Details',{planet_name:item.name})}>
            
        </ListItem>
    )
    keyExtractor = (item,index) =>index.toString()
    render(){
        const {list_data} = this.state
        if (list_data.length == 0){
            return (
                <View>
                    <Text>Loading.....</Text>
                </View>
            )
        }
        else{
            return(
                <SafeAreaView>
                <View>                   
                    <View>
                        <Text>
                            Planets World
                        </Text>
                    </View>
                    <View>
                        <FlatList
                        keyExtractor = {this.keyExtractor}
                        data={this.state.list_data}
                        renderItem = {this.renderItem}>
                        </FlatList>
                    </View>
                    <Text>
                        Home Screen
                    </Text>
                </View>
              </SafeAreaView>
            )
        }
    }
}
const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:'blue'
    },
    list_container:{
        backgroundColor:'teal'
    }    
})