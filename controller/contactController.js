//@desc get all contacts
//@route Get /api/contacts
//@access public
const getContact = (req, res) => {
    res.status(200).json({ message: "Get all contacts" })
}

//@desc get all contacts
//@route Get /api/contacts
//@access public
const createContact = (req, res) => {
    res.status(200).json({ message: "Create contacts" })
}





export { getContact, createContact }