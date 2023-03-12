import { Route, Routes } from "react-router-dom";
import SideBar from "./Component/HomePage/SideBar";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Component/pages/Home";
import InputSection from "./Component/pages/InputSection";

function App() {
  return (
    <div>
      <Navbar />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
        <SideBar />
        <div className="lg:pl-[14rem]  mt-[5.8125rem]">
          <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/jobs" element={<InputSection />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
