import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Home } from "../pages/Home";

const browserRouter = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={<Home />} />,
        <Route path="/404" element={<div>404</div>} />,
        <Route path="*" element={<Navigate to="/404" replace />} />
    ])
)

const Router = () => {
    return <RouterProvider router={browserRouter} />
}

export { Router };

