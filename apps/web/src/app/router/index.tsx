import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { SeatSelectionPage } from "@/pages/seat-selection"
import { seatMapLoader } from "@/pages/seat-selection/loader"
import { TicketSuccessPage } from "@/pages/ticket-success"

const router = createBrowserRouter([
    {
        path: "/",
        loader: seatMapLoader,
        element: <SeatSelectionPage />,
    },
    {
        path: "/ticket/:ticketId",
        element: <TicketSuccessPage />,
    },
])

export function AppRouter() {
    return <RouterProvider router={router} />
}
