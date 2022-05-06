import { useContext } from 'react';
import './App.scss';
import Header from './components/Header';
import Content from './components/Content';
import { Route, Routes, Navigate } from 'react-router-dom';
import Student from './components/Student'
import AlertModal from './components/modals/AlertModal'
import { AppContext } from './contexts/AppProvider'


function App() {
  const { isShowAlert, message, error } = useContext(AppContext)

  return (
    <>

      <div className="App">
        {isShowAlert &&
          <AlertModal
            message={message}
            error={error}
          />
        }

        <Header />
        <Routes>
          <Route
            path="*"
            element={<Navigate to="/manage-student" replace />}
          />
          <Route path='manage-student' element={<Content />} >
            <Route
              path="/manage-student"
              element={<Navigate to="/manage-student/all" replace />}
            />
            <Route path=':courseIdParam' element={<Student />} />


          </Route>


        </Routes>
      </div>
    </>
  );
}

export default App;
