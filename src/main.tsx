import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './app'
import Header from './components/header.tsx'
import Footer from './components/footer.tsx'
import BlogIndex from './components/BlogIndex.tsx'
import BlogPost from './components/BlogPost.tsx'
import AdminBlog from './components/AdminBlog.tsx'
import Websites from './components/sites.tsx'
import Repos from './components/repos.tsx'
import Videos from './components/Videos.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header/>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blogs" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<AdminBlog />} />
          <Route path="/websites" element={<Websites />} />
          <Route path='/repos' element={<Repos />} />
          <Route path='/videos' element={<Videos />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  </StrictMode>,
  
)