import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ToDoList from "@/components/ToDo/ToDoList";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="max-w-7xl mx-auto p-5">
          <NavBar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto min-h-screen flex flex-col mt-20">
        <ToDoList />
        <Footer />
      </div>
    </div>
  );
}
