
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
// import { RegegistrationForm } from './components/registrationForm';
// import { UserTable } from './components/UserTable';
import { PostTable } from './components/postTable';

function App() {
const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex w-full items-center justify-center p-4 flex-col gap-3'>
       
        {/* <RegegistrationForm /> */}
        <h1> The User detail Table</h1>
        {/* <UserTable /> */}
        <PostTable/>
      </div>
    
    </QueryClientProvider>
  )
}

export default App
