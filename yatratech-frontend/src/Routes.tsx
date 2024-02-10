import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import Homepage from "./tsx-files/Homepage.tsx";
import AuthenticationForm from "./tsx-files/AuthenticationForm.tsx";
import AdminDashboard from "./tsx-files/AdminDashboard.tsx";
import AdminOrders from "./tsx-files/AdminOrders.tsx";
import AdminUsers from "./tsx-files/AdminUsers.tsx";
import AdminVehicles from "./tsx-files/AdminVehicles.tsx";
import UserHomepage from "./tsx-files/UserHomepage.tsx";
import UserProfile from "./tsx-files/UserProfile.tsx";


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
        },
        {
            path: "/admin-users",
            element: <AdminUsers/>
        },
        {
            path: "/admin-orders",
            element: <AdminOrders/>
        },
        {
            path: "/admin-vehicles",
            element: <AdminVehicles/>
        },
        {
            path: "/homepage",
            element: <UserHomepage/>
        },
        {
            path: "/profile",
            element: <UserProfile/>
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