import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Rooms from "./pages/Rooms";
import Hotels from "./pages/Hotels";
import Users from "./pages/Users";
import Login from "./pages/login/Login";

function App() {
    function ProtectedRoute({children}) {
        const admin = JSON.parse(localStorage.getItem('admin')) || null;
        if(!admin) {
            return <Navigate to="/login"/>
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

                <Route path="/rooms" element={
                    <ProtectedRoute>
                        <Rooms/>
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
