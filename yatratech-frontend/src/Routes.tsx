import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import Homepage from "./tsx-files/Homepage.tsx";
import AuthenticationForm from "./tsx-files/AuthenticationForm.tsx";
import AdminDashboard from "./tsx-files/AdminDashboard.tsx";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Homepage/>
        },
        {
            path: "/join-our-family",
            element: <AuthenticationForm/>
        },
        {
            path: "/admin-dashboard",
            element: <AdminDashboard/>
        }
    ]
)

const queryClient = new QueryClient();

function Routes() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </>
    )
}

export default Routes