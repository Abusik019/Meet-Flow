import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authorization from "./pages/Auth";
import NavPanel from "./components/layouts/navPanel";
import { useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import ChoosenCanvas from "./pages/Canvas/index";
import Canvas from "./pages/Canvas/canvas";
import { getMyInfo } from "./store/slices/authSlice";

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.authSlice.accessToken);

    useLayoutEffect(() => {
        if(token){
            setIsAuth(true);
            dispatch(getMyInfo());
        } else{
            setIsAuth(false);
        }
    }, [token]);

    if (!isAuth) return <Authorization />;

    return (
        <div className="w-full h-[100vh] max-h-fit relative flex items-center gap-4 p-4 box-border">
            {/* size = (default = sm), md, lg, xl */}
            <NavPanel /> 
            <div className="w-full min-h-full">
                <Routes>
                    <Route path="/auth" element={<Authorization />} />
                    <Route path="/canvas" element={<ChoosenCanvas />} />
                    <Route path="/canvas/new" element={<Canvas />} />
                    <Route path="/canvas/past" element={<Canvas />} />
                </Routes>
            </div>

            <div className="absolute top-0 right-0 w-10 h-10"></div>
        </div>
    );
}

export default App;
