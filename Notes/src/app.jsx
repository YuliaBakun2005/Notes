import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import { Login } from './routes/Login';
import { Home } from './routes/Home';
import {Registration} from './routes/Registration';
import { About } from './routes/About';
import {Notes} from './routes/Notes';
import {NotePage} from './routes/NotePage';
import {EditNote} from './routes/EditNote';
import {NotFound} from './routes/NotFound';
import {CreateNote} from './routes/CreateNote';
import { UserContextProvider } from './components/UserContextProvider';
import { RequireAuth } from './components/RequireAuth';

const router= createBrowserRouter([
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/',
    element:<RequireAuth>
      <Home/>
    </RequireAuth>,

  },
  {
    path: '/registration',
    element: <Registration/>,
  },
  {
    path: '/about',
    element:<RequireAuth>
      <About/>
    </RequireAuth>,

  },
  {
    path: '/notes',
    element:<RequireAuth>
      <Notes/>
    </RequireAuth>,

  },
  {
    path: '/notes/:noteId',
    element:<RequireAuth>
      <NotePage/>
    </RequireAuth>,

  },
  {
    path: '/notes/create',
    element:<RequireAuth>
      <CreateNote/>
    </RequireAuth>,

  },
  {
    path: '/notes/:noteId/edit',
    element:<RequireAuth>
      <EditNote/>
    </RequireAuth>,

  },
  {
    path:'*',
    element:<RequireAuth>
      <NotFound/>
    </RequireAuth>,

  }

])

export function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router}/>
      <div className="flex flex-col  mt-4">
        <hr className="w-full" />
        <div className="flex justify-between items-center">
          <div>
            <p className="pl-4">Created by: Yulia Bakun</p>
          </div>
          <div>
            <p className="pr-4">BSU: 2023</p>
          </div>
        </div>
      </div>
    </UserContextProvider>
  );
}