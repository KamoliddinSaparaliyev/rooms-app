import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import RoomCreate from "./pages/Rooms/RoomCreate";
import RoomsList from "./pages/Rooms/RoomsList";
import RoomShow from "./pages/Rooms/RoomShow";
import RoomUpdate from "./pages/Rooms/RoomUpdate";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/rooms" element={<RoomsList />} />
          <Route path="/rooms/create" element={<RoomCreate />} />
          <Route path="/rooms/edit/:id" element={<RoomUpdate />} />
          <Route path="/rooms/:id" element={<RoomShow />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
