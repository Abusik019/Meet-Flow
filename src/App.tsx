import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authorization from "./pages/Auth";

function App() {
    return <>
        <Routes>
            <Route path="/auth" element={<Authorization />}/>
        </Routes>
    </>;
}

export default App;
