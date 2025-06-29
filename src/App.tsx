import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Authorization from "./pages/Auth";
import NavPanel from "./components/layouts/navPanel";
import { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import ChoosenCanvas from "./pages/Canvas/index";
import Canvas from "./pages/Canvas/canvas";
import { getMyInfo } from "./store/slices/authSlice";

function App() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const token = useAppSelector((state: any) => state.authSlice.token);
    const isAuth = Boolean(token);

    useLayoutEffect(() => {
        if (token) {
            dispatch(getMyInfo());
        }
    }, [token]);

    if (!isAuth && location.pathname !== "/auth") {
        return <Navigate to="/auth" replace />;
    }
    if (isAuth && location.pathname === "/auth") {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="w-full h-[100vh] max-h-fit relative flex items-center gap-4 p-4 box-border">
            {isAuth && <NavPanel />}
            <div className="w-full min-h-full">
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    {!isAuth && <Route path="/auth" element={<Authorization />} />}
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
