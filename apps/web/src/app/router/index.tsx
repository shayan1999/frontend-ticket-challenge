import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { SeatSelectionPage } from "@/pages/seat-selection"
import { TicketPage } from "@/pages/ticket-page"

const router = createBrowserRouter([
    {
        path: "/",
        element: <SeatSelectionPage />,
    },
    {
        path: "/ticket/:ticketId",
        element: <TicketPage />,
    },
])

export function AppRouter() {
    return <RouterProvider router={router} />
}
