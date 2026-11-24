
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="min-w-0 flex-1">
        <Outlet />



        



      </main>
      <Footer />
      {/* Shared footer will be implemented in the layout phase. */}
    </div>
  )
}

export default MainLayout
