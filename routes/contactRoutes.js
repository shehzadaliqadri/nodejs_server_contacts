import express from 'express';
import {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} from '../controller/contactController.js';

const router = express.Router()

router.route("/")
    .get(getContacts)
    .post(createContact);


router.route("/:id")
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);



export { router }
