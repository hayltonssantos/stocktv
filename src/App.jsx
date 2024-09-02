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
import LogScreen from './Pages/log/LogScreen'
import Reset from './Pages/reset/Reset'
import Register from './Pages/register/Register'
import Config from './Pages/config/Config'
import Reports from './Pages/reports/Reports'
import CreateUser from './Pages/createUser/CreateUser'
import Dashboard from './Pages/dashboard/Dashboard'
import AllArticles from './Pages/AllArticles/AllArticles'


function App() {

  return (
    <UserProvider>
      <ArticleProvider>
        <ItemsProvider>
          <BrowserRouter>
            <Routes>
              <Route path='home' element={<Main/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='reset' element={<Reset/>}/>

              
              <Route path='register' element={<ProtectedRoutes><Register/></ProtectedRoutes>}/>
              <Route path='add' element={<ProtectedRoutes><AddArticles/></ProtectedRoutes>}/>
              <Route path='log' element={<ProtectedRoutes><LogScreen/></ProtectedRoutes>}/>
              <Route path='config' element={<ProtectedRoutes><Config/></ProtectedRoutes>}/>
              <Route path='reports' element={<ProtectedRoutes><Reports/></ProtectedRoutes>}/>
              <Route path='dashboard' element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}/>
              <Route path='newuser' element={<CreateUser/>}/>
              <Route path='articles' element={<AllArticles/>}/>
            

              <Route path='/' element={<Navigate to={'/home'}/>}/>
              
            </Routes>
          </BrowserRouter>
        </ItemsProvider>
      </ArticleProvider>
    </UserProvider>
    
  )
}

export default App
