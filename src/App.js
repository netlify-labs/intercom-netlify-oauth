import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='app-contents'>
          <h1>Intercom login</h1>
          <div>
            <a href="/.netlify/functions/auth">
              <img 
                src="https://static.intercomassets.com/assets/oauth/primary-7edb2ebce84c088063f4b86049747c3a.png" 
                srcSet="https://static.intercomassets.com/assets/oauth/primary-7edb2ebce84c088063f4b86049747c3a.png 1x, https://static.intercomassets.com/assets/oauth/primary@2x-0d69ca2141dfdfa0535634610be80994.png 2x, https://static.intercomassets.com/assets/oauth/primary@3x-788ed3c44d63a6aec3927285e920f542.png 3x"
                />
            </a>
          </div>
        </div>
      </div>
    )
  }
}
