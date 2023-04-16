import asyncHandler from "express-async-handler"
import { contactModel } from "../models/contactModel.js"

//@desc get all contacts
//@route Get /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get all contacts" })
})

//@desc create contacts
//@route Post /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {

    console.log(`the request body is`, req.body)
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("all fields are required")
    }
    res.status(201).json({ message: "Create contacts" })
})

//@desc get contact
//@route Get /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get Contact for ${req.params.id}` });
})

//@desc update contact
//@route Put /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Contact for ${req.params.id}` });
})

//@desc delete contact
//@route delete /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Deleted Contact for ${req.params.id}` });
})


export {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}