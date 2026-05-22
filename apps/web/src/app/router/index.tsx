import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { SeatMapPage } from "@/pages/seat-map"
import { TicketSuccessPage } from "@/pages/ticket-success"

const router = createBrowserRouter([
    {
        path: "/",
        element: <SeatMapPage />,
    },
    {
        path: "/ticket/:ticketId",
        element: <TicketSuccessPage />,
    },
])

export function AppRouter() {
    return <RouterProvider router={router} />
}
