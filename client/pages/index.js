import axios from "axios";

const LandingPage = ({ currentUser }) => {
    // console.log(currentUser);
    axios.get("http://localhost:3000/api/users/currentuser");
    return currentUser ? (
        <h1>You are signed in</h1>
    ) : (
        <h1>You are NOT signed in</h1>
    );
};

// LandingPage.getInitialProps = async () => {
//   console.log("LANDING PAGE!");
//   // request being sent has no cookies attached to it because it is being sent from the server
//   const { data } = await axios.get(
//     "http://localhost:3000/api/users/currentuser"
//   );
//   console.log(data);
//   return data;
// };

export default LandingPage;
