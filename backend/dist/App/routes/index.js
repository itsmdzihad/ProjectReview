import { Router } from "express";
import authRoute from "../modules/auth/auth.route.js";
import userRoute from "../modules/user/user.route.js";
const router = Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: authRoute,
    },
    {
        path: "/users",
        route: userRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
