import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import Homepage from "./tsx-files/Homepage.tsx";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Homepage/>
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