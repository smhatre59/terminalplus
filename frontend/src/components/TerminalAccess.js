import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import './css/TerminalAccess.css';
import Terminal from 'react-bash';
import request from'superagent';
var apiBaseUrl = "http://localhost:5000/api/";
import Iframe from 'react-iframe';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
const history = [
    { value: 'Type `help` to begin' },
];

let getData=function(input,callback){
       request
  .post(apiBaseUrl+'commandrun')
  .send({ command: input})
  .set('Accept', 'application/json')
  .end(function(err, res){
    // Calling the end function will send the request
    if(err){
        callback(err)
    }
    callback(res);
    });
}

const structure = {
    public: {
        file1: { content: 'The is the content for file1 in the <public> directory.' },
        file2: { content: 'The is the content for file2 in the <public> directory.' },
        file3: { content: 'The is the content for file3 in the <public> directory.' },
    },
    'README.md': { content: 'Some readme' },
};
export default class TerminalAccess extends Component {
constructor(props){
    super(props);
    this.state={
        commandData:''
    }
}
render(){
    const extensions = {
    sudo: {
        exec: ({ structure, history, cwd }) => {
            return { structure, cwd,
                history: history.concat({ value: 'Nice try...' }),
            };
        },
    },
    docker:{
      exec: ({ structure, history, cwd },command) => {
          let fetchData = getData(command.input,(res) =>{
            var response = JSON.parse(res.text).result.split("\n");
            var tablerowData = response[1].split("   ");
            tablerowData = tablerowData.filter(function(item){
                 return item.length>3;   
            })
            var tableheaderData = response[0].split("   ");
            tableheaderData = tableheaderData.filter(function(item){
                 return item.length>3;   
            })
            var table=[],tableHeaderColumn=[],tableHeader=[],tableRowColumn=[],tableBody=[];
            tableheaderData.map(function(item){
                tableHeaderColumn.push(
                   <TableHeaderColumn>
                      {item}
                   </TableHeaderColumn> 
                )
                return item;
            })

            tableHeader.push(
              <TableHeader>
                <TableRow>
                    {tableHeaderColumn} 
                </TableRow>
              </TableHeader>       
            )

            tablerowData.map(function(item){
                tableRowColumn.push(
                    <TableRowColumn>
                        {item}
                    </TableRowColumn>
                )
                return item;
            })

            tableBody.push(
                <TableBody>
                    <TableRow>
                        {tableRowColumn}
                    </TableRow>    
                </TableBody>
            )
            table.push(
                <Table>
                    {tableHeader}
                    {tableBody}
                </Table>
            )
            this.setState({commandData:table})
            })
          return { structure, cwd, history: history.concat({ value: 'Nice try...' }), };       
        },   
    },
    portainer:{
        exec: ({ structure, history, cwd },command) => {
            let fetchData = getData("docker-machine ip manager1",(res) =>{
                var response = JSON.parse(res.text).result.split("\n")[0];
                let embedUrl = "http://"+response+":9000/"
                console.log("embedUrl",embedUrl)
                let commandData =[];
                commandData.push(
                    <div>
                        <Iframe url={embedUrl} />
                    </div>
                )
                this.setState({commandData})
            })
            return { structure, cwd, history: history.concat({ value: 'Nice try...' }), };
        }
    }
    };
    return(
        <MuiThemeProvider>
            <Tabs>
                 <Tab label="Docker Administration" >
                 <div className="parentContainer">
                 <center>
                 <h4>Run docker administration commands here</h4>
                  <div style={{flex:1}}>
                  <Terminal history={history} structure={structure} extensions={extensions} prefix={"user@HOMEPC"}/>  
                  </div>
                 </center> 
                  <div>
                        {this.state.commandData}
                  </div>    
                 </div>
             </Tab>
            </Tabs>
        </MuiThemeProvider>
    )
}
}
