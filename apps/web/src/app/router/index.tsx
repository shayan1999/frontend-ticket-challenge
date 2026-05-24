import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { NotFoundPage } from "@/pages/not-found-page"
import { RouterErrorPage } from "@/pages/router-error-page"
import { SeatSelectionPage } from "@/pages/seat-selection"
import { TicketPage } from "@/pages/ticket-page"

const router = createBrowserRouter([
    {
        path: "/",
        element: <SeatSelectionPage />,
        errorElement: <RouterErrorPage />,
    },
    {
        path: "/ticket/:ticketId",
        element: <TicketPage />,
        errorElement: <RouterErrorPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
])

export function AppRouter() {
    return <RouterProvider router={router} />
}
