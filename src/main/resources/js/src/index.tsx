import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import styled from 'styled-components'

const BodyStyled = styled.body`
  font-family: 'Readex Pro';
  font-size: 16px;
`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BodyStyled>
    <React.StrictMode>
      <link
        href="https://fonts.googleapis.com/css?family=Readex Pro"
        rel="stylesheet"
      />
      <App />
    </React.StrictMode>
  </BodyStyled>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
