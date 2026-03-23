import { Outlet } from "react-router-dom"
import { Navbar } from "./Components/Navbar"
import { Cart } from "./Pages/Cart/CartItem"

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Cart />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}