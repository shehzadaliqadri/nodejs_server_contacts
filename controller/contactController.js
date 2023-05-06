import asyncHandler from "express-async-handler"
import { contactModel as Contact } from "../models/contactModel.js"

//@desc get all contacts
//@route Get /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find(user_id, req.user.id);
    res.status(200).json(contact);
})

//@desc create contacts
//@route Post /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("all fields are required")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    })
    res.status(201).json(contact)
})

//@desc get contact
//@route Get /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    if ((req.params.id).length === 24) {
        const contact = await Contact.findById(req.params.id);
        contact ?
            res.status(200).json(contact) :
            res.status(404); throw new Error("Contact not found")
    } else {
        res.status(404)
        throw new Error("id is invalid, check length and try again")
    }
})

//@desc update contact
//@route Put /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    if ((req.params.id).length === 24) {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        updatedContact ?
            res.status(200).json(updatedContact) :
            res.status(404); throw new Error("Contact not found")

    } else {
        res.status(404)
        throw new Error("id is invalid, check length and try again")
    }
})

//@desc delete contact
//@route delete /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    if ((req.params.id).length === 24) {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);

        deletedContact ?
            res.status(200).json(deletedContact) :
            res.status(404); throw new Error("Contact not found")

    } else {
        res.status(404)
        throw new Error("id is invalid, check length and try again")
    }
})


export {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}