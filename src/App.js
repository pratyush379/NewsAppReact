import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
Route,
Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
   pageSize = 5;
  apiKey = process.env.REACT_APP_NEWS_API
  state  = {
    progress : 0
  }

  setProgress = (progress) =>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        
<Navbar></Navbar>
<LoadingBar
        color='#f11946'
        height = '3'
        progress={this.state.progress}
       
      />

<Routes>
  <Route exact path='/'   element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} pageSize={20}  key = 'general' category="general" country='in'/>}></Route>
  <Route exact path='/business'  element={<News setProgress={this.setProgress} apiKey = {this.apiKey} pageSize={20} key = 'business' category="business" country='in'/>}></Route>
 <Route exact path='/entertainment'   element={<News setProgress={this.setProgress} apiKey = {this.apiKey} pageSize={20} key = 'entertainment' category="entertainment" country='in'/>}></Route>
 <Route exact path='/general' element={<News setProgress={this.setProgress} apiKey = {this.apiKey} pageSize={20}  key = 'general'  category="general" country='in'/>}></Route>
 <Route exact path='/health'   element={<News setProgress={this.setProgress} apiKey = {this.apiKey} pageSize={20} key = 'health' category="health" country='in'/>}></Route>
 <Route exact path='/science'  element={<News setProgress={this.setProgress} apiKey = {this.apiKey} pageSize={20}  key = 'science' category="science" country='in'/>}></Route>
 <Route exact path='/sports'  element={<News setProgress={this.setProgress} apiKey = {this.apiKey} pageSize={20} key = 'sports'  category="sports" country='in'/>}></Route>
 <Route exact path='/technology'  element={<News setProgress={this.setProgress} apiKey = {this.apiKey} pageSize={20} key = 'technology' category="technology" country='in'/>}></Route>

</Routes>

      </div>
    )
  }
}
