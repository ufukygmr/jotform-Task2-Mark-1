import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  TextInput,
  CheckBox,
  TouchableOpacity,
  Button
} from 'react-native';



// import console = require('console');
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: '',
      id: null,
      tasks: [{id: 123112313 , task: "fuufkkfa", edit: false, done: false, style: styles.task1}],
      i: 0
    }}

  takeInput = () => {
    this.setState(state => {
      const data = {id: null, task: null, edit: null, done: false, style: styles.task1}
      if(state.inputText === ''){
        return null
      }
      else{
        data.task = state.inputText
        data.edit = false
        data.id = state.i
        const tasks = [data, ...state.tasks];
        const i = state.i + 1
        return {tasks, data, i}
      }
    })
  }

  makeEditable = (id) => {
    this.setState(state => {
      const node = state.tasks.find((node) => {return (node.id == id)})
      let edit = node.edit 
      edit = true
      node.edit = edit
      return {node}
    })
  }

  editText = (id, text) => {
    this.setState(state => {
      const node = state.tasks.find((node) => {return (node.id == id)})
      node.task = text 
      return {node}
    })
  }

  saveText = (id) => {
    this.setState(state => {
      const node = state.tasks.find((node) => {return (node.id == id)})
      let edit = node.edit
      edit = false 
      node.edit = edit
      return {node}
    })
  }

  completedTask = (id) => {
    this.setState(state => {
      const node = state.tasks.find((node) => {return (node.id == id)})
      let isDone = node.done
      if(isDone === false){
        isDone = true
        node.done = isDone
        this.doneStyle(id)
      }
      else {
        isDone = false
        node.done = isDone
        this.doneStyle(id)
      }
      return {node}
    })
  }

  doneStyle = (id) => {
    // redux, redux-middlewares, immutablity, mobx(react-native)
    this.setState(state => {
      const node = state.tasks.find((node)=> {return (node.id == id)})
      if (node.done === false){
        node.style = styles.task1
        return {node}
      }
      else {
        style = {
          backgroundColor: '#A7F432',
          textAlign: 'left',
          padding: 5,
          borderRadius: 10,
          width: 200
        }
        node.style = style
        return {node}
      }
    })
  }



  render() {
    const arr = this.state.tasks.map(data => {
      let output = null 
      if (data.edit === false){
        output = (
          (<View key = {data.id}>
          <TextInput
            value = {data.task}
            onChangeText = {(text) => {this.editText(data.id, text)}}
            editable = {data.edit}
            onPress ={() => {this.completedTask(data.id)}}
          />
          <Button 
            title = "Edit"
            onPress = {() => {this.makeEditable(data.id)}}
            style = {styles.button}
          >Edit</Button> 
          <Button 
            title = "Done or Undone"
            onPress = {() => {this.doneStyle(data.id)}}
            style = {styles.button}
          >Done or Undone</Button> 
      </View>))
      }
      else {
        output = (<View key = {data.id}>
          <TextInput
            value = {data.task}
            onChangeText = {(text) => {this.editText(data.id, text)}}
            editable = {data.edit}
          />
          <Button
            title = "Save"
            onPress = {() => {this.saveText(data.id)}}
          ></Button> 
      </View>)
      }
         
      return (output)
    })
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Jotform ToDo Application</Text>
        <Text style={styles.instructions}>Please Add Your Task And Press Submit Button</Text> 
        <TextInput style = {styles.input}
          placeholder = "Write Your Task"
          onChangeText = {(Text) => this.state.inputText = Text}
        />
        <Button
          title = "Submit"
          color="#841584"
          onPress= {this.takeInput}
        />
        {arr}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    marginBottom: 30,
    padding : 10,
    width: 367,
    fontSize: 16,
    color: '#444',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#F5F5F5'
  },
  task1: {
    textAlign: 'left',
    padding: 5,
    backgroundColor: '#f2f6f5',
    borderRadius: 10,
    width: 200
  },
  button: {
    width: 100,
    textAlign: 'left',
    backgroundColor: "#fff"
  }
});