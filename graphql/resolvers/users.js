const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {validateRegisterInput} = require("../../util/validator");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const { UserInputError } = require("apollo-server");


module.exports = {
    Mutation: {
        async register(_, 
            {registerInput: {username, email, password, confirmPassword }}, 
            context, 
            info
        ){

            //Validating user data
            const {valid, errors} = validateRegisterInput(
            username,
            email,
            password,
            confirmPassword
            );
            if (!valid){
                throw new UserInputError("Error",{errors});
            }

            //Making sure user doesn't already exist

            const user = await User.findOne({username});
            if (user){
                throw new UserInputError('Username is taken', {
                    errors:{
                        username: "This username is taken"
                    }
                });
            }
            
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign(
                {
                    id : res.id,
                    email : res.email,
                    username: res.username
                }, 
                SECRET_KEY, { expiresIn : "1h"}
            );

            return {
                ...res._doc,
                id: res.id,
                token
            };

        }

    }
};
