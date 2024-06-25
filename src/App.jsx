import { useState } from 'react'
import './App.css'
import Main from './Pages/main/Main'
import Login from './Pages/login/Login'
import { ItemsProvider } from './Context/itemsContext'
import { ArticleProvider } from './Context/articlesContext'
import { UserProvider } from './Context/userContext'
import ProtectedRoutes from './Pages/protectedroutes'
import AddArticles from './Pages/addArticles/AddArticles'
import { Route, Routes, BrowserRouter, Navigate, Link } from 'react-router-dom'


function App() {

  return (
    <UserProvider>
      <ArticleProvider>
        <ItemsProvider>
          <BrowserRouter>
            <Routes>
              <Route path='home' element={<Main/>}/>
              <Route path='login' element={<Login/>}/>

              <Route element={<ProtectedRoutes />}>
                <Route path='add' element={<AddArticles/>}/>
              </Route>

              <Route path='/' element={<Navigate to={'/home'}/>}/>
              
            </Routes>
          </BrowserRouter>
        </ItemsProvider>
      </ArticleProvider>
    </UserProvider>
    
  )
}

export default App
