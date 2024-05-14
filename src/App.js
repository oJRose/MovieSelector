import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { SearchPage } from "./pages/SearchPage";
import { MoviePage } from "./pages/MoviePage";
import { SignUp } from "./pages/SignUp";
import { LogIn } from "./pages/LogIn"
import { Account } from "./pages/Account"
import { AuthContextProvider } from "./context/AuthContext";

function App() {

  return (
    <>

      <AuthContextProvider>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse/search" element={<SearchPage />} />
            <Route path="/browse/movie/">
              <Route path=':movieID' element={<MoviePage />} />
            </Route>
            <Route path="/account" element={<Account />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
        </Routes>
      </AuthContextProvider>

      
    </>
  );
}

export default App;
