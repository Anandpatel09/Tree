import "./App.css";
import AppRouter from "./Routers/Approuter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
     
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </>
  );
}

export default App;
