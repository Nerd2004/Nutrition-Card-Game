const router = require("express").Router();
const { User } = require("../models/user");

router.put("/", async (req, res) => {
  try {
    // const {email, s} = (req.body)
    // Update the user by ID with the provided data
    await User.updateOne(
      { email: req.body.email },
      { $inc: { score: req.body.score } }
    ).exec();

    console.log(req.body.email);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// router.put('/update/:id', async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const {name, email, age, salary} = (req.body)
//       const updatedData = {name, email, age, salary}; // Assuming the updated data is sent in the request body
//       // Update the user by ID with the provided data
//       await User.updateOne({ _id: userId }, updatedData).exec();

//     console.log('Update operation completed'); // Console log message
//       // Find the updated user
//       const USER = await User.findOne({ _id: userId });

//       if (!USER) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       // Return the updated user data
//       res.json(USER)
//     } catch (err) {
//       res.status(500).json(err);
//     }
//  });

module.exports = router;
