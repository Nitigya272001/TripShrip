import {BrowserRouter, useLocation} from "react-router-dom";
import {AuthContextProvider} from "./components/auth/AuthContext";
import Body from "./components/semantics/body/Body";
import { useLayoutEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
//useLayoutEffect vs useEffect



function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Body />
      </BrowserRouter>
    </AuthContextProvider>
  );
}


export default App;
