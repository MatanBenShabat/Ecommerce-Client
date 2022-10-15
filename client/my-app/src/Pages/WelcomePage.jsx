import useGetUserData from "../Hooks/useGetUserData";

const WelcomePage = () => {
  const userData = useGetUserData();
  return <h1>Welcome back {userData.username}!</h1>;
};

export default WelcomePage;
