import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authorization from "./pages/Auth";
import NavPanel from "./components/layouts/navPanel";
import { useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";
import { RootState } from "./store/store";

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const token = useSelector((state: RootState) => state.authSlice.accessToken);

    useLayoutEffect(() => {
        if(token){
            setIsAuth(true)
        } else{
            setIsAuth(false)
        }
    }, [token]);

    if (!isAuth) return <Authorization />;

    return (
        <div className="w-full h-[100vh] max-h-fit relative flex items-center gap-20 p-4 box-border">
            {/* size = (default = sm), md, lg, xl */}
            <NavPanel /> 
            <div className="">
                <Routes>
                    <Route path="/auth" element={<Authorization />} />
                    <Route path="/canvas" element={<Authorization />} />
                </Routes>
            </div>

            <div className="absolute top-0 right-0 w-10 h-10"></div>
        </div>
    );
}

export default App;
