import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/header";
import axios from "axios";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

// AppComponent.getInitialProps = async (appContext) => {
//   const { data } = await axios.get(
//     "http://localhost:3000/api/users/currentuser"
//   );
//   console.log(data);

//   let pageProps = {};
//   if (appContext.Component.getInitialProps) {
//     pageProps = await appContext.Component.getInitialProps(appContext.ctx);
//   }

//   return {
//     pageProps,
//     ...data,
//   };
// };

export default AppComponent;
