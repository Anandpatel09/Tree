

import HomeCards from "./HomeCards";
import HomeNavbar from "./HomeNavbar";
import Hometable from "./Hometable";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeNavbar />
      <main className="flex items-center justify-center p-6">
      <h1 className="font-bold text-2xl">Welcome to the village Directory </h1>
        
      </main>
      <HomeCards/>
      <Hometable/>
    </div>
  );
};

export default Home;