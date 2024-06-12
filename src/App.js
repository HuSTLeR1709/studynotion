
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"
import Navbar from './components/common/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error'
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About';
import MyProfile from './components/core/Dashboard/MyProfile';
import PrivateRoute from './components/core/auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Settings from './components/core/Dashboard/Settings';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Cart from './components/core/Dashboard/Cart';

import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import AddCourse from './components/core/Dashboard/AddCourse';
import MyCourses from './components/core/Dashboard/MyCourses';
import EditCourse from './components/core/Dashboard/EditCourse';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor';



function App() {
  const {user} = useSelector((state)=> state.profile)
  return (
    <div className='min-h-screen w-screen flex flex-col bg-richblack-900 '>
    <Navbar/>
<Routes>
      <Route path= "/" element={<Home/>}/>
      <Route path= "/catalog/:catalogName" element={<Catalog/>}/>
      <Route path= "/courses/:courseId" element={<CourseDetails/>}/>

      
      <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
        path='/error'
        element={<Error/>}
        ></Route>

        <Route
        path='/forgot-password'
        element={<ForgotPassword/>}
        ></Route>

        <Route
        path='/update-password/:id'
        element={<UpdatePassword/>}
        ></Route>

        <Route
        path='/verify-email'
        element={<VerifyEmail/>}
        ></Route>

        <Route
        path='/about'
        element={<About/>}>

        </Route>

        <Route element={<PrivateRoute> <Dashboard/> </PrivateRoute>}>
        
          
          <Route path='/dashboard/my-profile' element={<MyProfile/>}></Route> 
          <Route path='/dashboard/settings' element={<Settings/>}></Route>
          

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='/dashboard/cart' element={<Cart/>}></Route>
                <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>}></Route>
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='/dashboard/add-course' element={<AddCourse/>}></Route>
                <Route path='/dashboard/my-courses' element={<MyCourses/>}></Route>
                <Route path='/dashboard/instructor' element={<Instructor/>}></Route>
                <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}></Route>
                
                
              </>
            )
          }

         </Route>

         <Route
         element={<PrivateRoute>
          <ViewCourse/>
         </PrivateRoute>}
         >
         {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path='/view-course/:courseId/section/:sectionId/sub-Section/:subSectionId' element={<VideoDetails/>}/>
            </>
          )
         }

         </Route>

        
 </Routes>  
        

         

        
        
        
      

        

        




    </div>
  );
}

export default App;
