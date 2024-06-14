import { useState } from 'react'
import './App.css'
import Main from './Pages/main/Main'
import { ItemsProvider } from './Context/itemsContext'
import { ArticleProvider } from './Context/articlesContext'

function App() {

  return (
    <ArticleProvider>
      <ItemsProvider>
        <Main/>
      </ItemsProvider>
    </ArticleProvider>
    
  )
}

export default App
