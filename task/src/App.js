import './App.css';
import Home from './component/home';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from  './Components/Navbar';
// import Home from './Components/Home';
// import AllUsers from './Components/AllUsers';
// import AddUser from './Components/AddUser';
// import EditUser from './Components/EditUser';
// import NotFound from './Components/NotFound';
// import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';

function App() {
  return (
    <>
   <Home/>
    {/* <Navbar />
    // <Router>
    //   <Routes>
    //     <Route path="/" component={Home} exact />
    //     <Route path="/all" component={AllUsers} exact />
    //     <Route path="/add" component={AddUser} exact />
    //     <Route path="/edit/:id" component={EditUser} exact />
    //     <Route component={NotFound} />
    //     </Routes>
    // </Router> */}
    </>
   
  );
}

export default App;
