/**
 * @file:Main applicatio file
 */ 
import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import routes from './routes/mainroutes'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {draweropen: false};
  }
  /**
   * Toggle opening and closing of drawer
   * @param {*} event 
   */ 
  toggleDrawer(event){
  // console.log("drawer click");
  this.setState({draweropen: !this.state.draweropen})
  }

  render() {
    return (
      <Router>           
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            title="Admin Dashboard"
            onLeftIconButtonTouchTap={(event) => this.toggleDrawer(event)}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Drawer open={this.state.draweropen}>
            <MenuItem>
              <div>
              User details
              <a href="#"><FontIcon
                className="material-icons drawerclosebutton"
                color={blue500}
                styles={{ top:10,}}
                onClick={(event) => this.toggleDrawer(event)}
              >clear</FontIcon></a>
              </div>
            </MenuItem>
              <div>
              <Link to="/"><MenuItem onClick={(event) => this.setState({draweropen:false})}>
                  Monitoring dashboard
              </MenuItem></Link>
              <Link to="/terminalaccess"><MenuItem onClick={(event) => this.setState({draweropen:false})}>
                  Terminal access
              </MenuItem></Link>
              <Link to="/vncaccess"><MenuItem onClick={(event) => this.setState({draweropen:false})}>
                  VNC Access
              </MenuItem>
              </Link>
              <Link to="/mysqlmonitoring"><MenuItem onClick={(event) => this.setState({draweropen:false})}>
                  MysqlMonitoring
              </MenuItem>
              </Link>
              </div> 
          </Drawer>
        </MuiThemeProvider>
        <div class="bodyContainer" onClick={(event) => this.setState({draweropen:false})}>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
        </div>
      </div>
    </Router>  
    );
  }
}

export default App;
