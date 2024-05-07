const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {validateRegisterInput, validateLoginInput} = require("../../util/validator");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const { UserInputError } = require("apollo-server");

function generateToken(user) {
    return jwt.sign(
        {
            id : user.id,
            email : user.email,
            username: user.username
        }, 
        SECRET_KEY, { expiresIn : "1h"}
    );
}

module.exports = {
    Mutation: {

        async login(_, {username, password}){
            const {valid, errors} = validateLoginInput(username, password);

            if(!valid){
                throw new UserInputError("Errors",{errors});
            }

            const user = await User.findOne({username});

            if (!user){
                errors.general = "User not found";
                throw new UserInputError("User not found",{errors});
            }
            else{
                const match = await bcrypt.compare(password, user.password)
                
                if(!match){
                    errors.general = "Wrong Credentials"
                    throw new UserInputError("Credentials",{errors});
                }
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user.id,
                token
            };
        },

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

            //Making sure user does not exist

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

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res.id,
                token
            };

        }

    }
};
