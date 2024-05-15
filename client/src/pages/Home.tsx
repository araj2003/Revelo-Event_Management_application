import Header from "../component/Header/Header";
import Sidebar from "../component/Sidebar/Sidebar";

function Home() {
  return <div>
    <Header />
    <div className="app__body">
      <Sidebar />
    </div>
  </div>;
}

export default Home;
