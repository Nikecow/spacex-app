import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { FavoritesProvider } from "./context/FavoritesContext"
import App from "./components/app"

const root = ReactDOM.createRoot(document.getElementById("root") as Element)
root.render(
    <React.StrictMode>
        <Router>
            <FavoritesProvider>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </FavoritesProvider>
        </Router>
    </React.StrictMode>
)
