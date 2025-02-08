const bcryptjs = require("bcryptjs");
const User = require("../module/userModule.js");

// register user
const registerUser = async (req, res) => {
  try {
    let { name, email, userName, password, phoneNumber, sex, maritalStatus } =
      req.body;
    // validate required fields
    if (
      !name ||
      !email ||
      !userName ||
      !password ||
      !phoneNumber ||
      !sex ||
      !maritalStatus
    ) {
      return res
        .status(400)
        .json({ message: "All Required Fields Must Be Provided" });
    }

    //Hash the password
    const saltround = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, saltround);

    // save user in database
    const newUser = new User({
      name,
      email,
      userName,
      password: hashedpassword,
      phoneNumber,
      sex,
      maritalStatus,
    });

    // register User in Database
    const registeredUser = await newUser.save();
    res.status(201).json(registeredUser);
  } catch (err) {
    console.error("registration Error", err);
    // handle duplicate key errors
    if (err.code === 11000) {
      return res.status(400).jason({
        message: "User Already Exist",
        field: Object.keys(err.keyValue),
      });
    }
    res.status.json({ message: "Error resistration user", err: err.message });
  }
};

//login user
const loginUser = async (req, res) => {
    try {
        const { phoneNumber, password} = req.body;
        if(!phoneNumber || !password) {
            return res
            .status(400)
            .json({ message: "phoneNumber and password are required"});

        }

        //find the user by phoneNumber

        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: "phoneNumber not found"});
        }

        console.log(user);
        // compare password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({message: "invalid password"});

        }
        
    } catch (error) {
        
        res.status(500).json({message: "error logging in",error });

    }

   
};

// update user
const updateUser = async ( req, res) =>{
    try {
        const {id}= req.params;
        //find user by id
        const user = await user.findByid(id);
        if (!user) {
            return res.status(404).json({message: "user not found"});
        }
        
    } catch (error) {
        
    }
}

    


module.exports = {
  registerUser,updateUser,loginUser
};
