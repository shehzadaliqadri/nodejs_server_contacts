import express from 'express';
import { getContact, createContact } from '../controller/contactController.js';

const router = express.Router()

router.route("/").get(getContact);

router.route("/").post(createContact);

router.route("/:id").get((req, res) => {
    res.status(200).json({ message: `Get Contact for ${req.params.id}` });
})

router.route("/:id").put((req, res) => {
    res.status(200).json({ message: `Update Contact for ${req.params.id}` });
})

router.route("/:id").delete((req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` });
})



export { router }
