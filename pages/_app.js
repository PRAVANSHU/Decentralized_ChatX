import "../app/globals.css";  // Use correct relative path

//internal import
import { ChatAppProvider } from "@/Context/ChatAppContext";
import { NavBar } from "@/Components/index1";

const MyApp=({Component,pageProps }) =>(
  <div>
    <ChatAppProvider>
      <Component {...pageProps}/>
      </ChatAppProvider>
  </div>
);

export default MyApp;