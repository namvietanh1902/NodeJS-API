import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud',homeController.getCRUD);
    router.post('/post-crud',homeController.postCRUD);
    router.get('/get-crud',homeController.displayGetCRUD);
    router.get('/edit-crud',homeController.getEditCRUD);
    router.put('/edit-crud/:id',homeController.editCRUD);
    router.delete('/delete-crud/:id',homeController.deleteCRUD);

    router.post('/api/login',userController.handleLogin);
    router.get('/api/get-users/:id',userController.handleGetAllUsers);
    router.post('/api/create-user',userController.handleCreateUser);
    const options ={
        fun: "nope",
        aduoi: "yes"
    }
    console.log(options['fun']);
    return app.use("/", router);
}

module.exports = initWebRoutes;