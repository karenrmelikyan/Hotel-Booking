import Users from "./pages/users/Users";
import Hotels from "./pages/hotels/Hotels";
import Login from "./pages/login/Login";
import {Navigate, Routes, Route, BrowserRouter} from "react-router-dom";
import {AdminContext} from "./context/AdminContext";
import {useContext} from "react";

function App() {
    const {admin} = useContext(AdminContext);

    function ProtectedRoute({children}) {
        if(!admin) {
            return <Navigate to="/login" />
        }

        return children;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/users" element={
                    <ProtectedRoute>
                        <Users/>
                    </ProtectedRoute>
                }/>

                <Route path="/hotels" element={
                    <ProtectedRoute>
                        <Hotels/>
                    </ProtectedRoute>
                }/>

                <Route path="/login" element={<Login/>}/>

                <Route path="*" element={
                    <Navigate to="/users" />
                } />
            </Routes>
        </BrowserRouter>
   );
}

export default App;
