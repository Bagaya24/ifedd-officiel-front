
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { protectedRoute, publiqueRoute } from './DateRoute'


export default function Router() {
  return (
    <BrowserRouter basename='/'>
            <Routes>
                {/* Connexion et déconnexion */}

                {/* Publiques routes */}
                <Route>
                    {
                        publiqueRoute.map((route, index) => (
                            <Route key={index} path={route.path} element={<route.component/>}/>
                        ))
                    }
                </Route>
                {/* Protect routes */}

                <Route>
                    {
                        protectedRoute.map((route, index) => (
                            <Route key={index} path={route.path} element={<route.component/>}/>
                        ))
                    }
                </Route>
            </Routes>
    </BrowserRouter>
  )
}
