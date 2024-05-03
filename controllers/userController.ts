import { Request, Response } from "express";
import db from "../models";
import { error } from "console";
import { Op } from "sequelize";
import { registerSchema,loginSchema } from '../utils/validators';
import { generateToken } from '../utils/jwt';
import bcrypt from "bcrypt";


// This method returns all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "dateOfBirth"] },
      include: {
        model: db.Address,
        as: "addresses",
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      },
    });
    const normalizedUsers: any = [];
    users.map((user: any) => {
      const transformedAddress: any = {};
      user.addresses.forEach((addr: any) => {
        transformedAddress[addr.id] = {
          fullName: addr.fullName,
          pinCode: addr.pinCode,
          city: addr.city,
          state: addr.state,
          streetAddress: addr.streetAddress,
          mobileNumber: addr.mobileNumber,
        };
        user.addresses = { ...transformedAddress };
      });
      const normalizedUser: any = {
        id: user.id,
        user: user.user,
        password: user.password,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.phone,
        email: user.email,
        address: user.addresses,
      };
      normalizedUsers.push(normalizedUser);
    });

    res.json(normalizedUsers);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

// This method returns a user by id including their orders,addresses,reviews
const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await db.User.findByPk(userId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: db.Address,
          as: "addresses",
          attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
        },
      ],
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const userData = {
      id: user.id,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.phone,
      email: user.email,
      address: user.addresses.reduce(
        (acc: { [addressId: string]: any }, address: any) => {
          acc[address.id] = {
            fullName: address.fullName,
            pinCode: address.pinCode,
            city: address.city,
            state: address.state,
            streetAddress: address.streetAddress,
            mobileNumber: address.mobileNumber,
          };

          return acc;
        },
        {}
      ),
    };

    res.json(userData);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

// This method creates a new user
const createNewUser = async (req:Request,res:Response) => {
    try {
        await registerSchema.validateAsync(req.body)
    }
    catch(error:any) {
        return res.status(400).json(error.details[0].message);
    }
    try {

        const {firstName,lastName,user, email,phone,dateOfBirth,password} = req.body;
        // check if the email or username exists
        const userExists= await db.User.findOne({where:{[Op.or]: [{ email }, { user }]}});
        if(userExists) {
            return res.status(400).send('Email or username is already associated with an account');
        }

        const newUser=await db.User.create({
            firstName,
            lastName,
            user,
            email,
            phone,
            dateOfBirth,
            password,
            createdAt:Date.now(),
            updatedAt:Date.now(),
         })

         res.status(201).json({message:"user created successfully",user:newUser});

    }

    catch(error:any) {

            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({error:"Email address must be unique"})
              }
            else {
                res.status(400).json(error.message)
            }
    }

}


// This method handles user login
const loginUser = async (req:Request,res:Response) => {
    try {
        await loginSchema.validateAsync(req.body)
    }
    catch(error:any) {
        res.status(400).json(error.details[0].message);
    }

    try {
        const expiryInterval= 2*24*60*60; // 2 days in seconds
        const {email,password}=req.body;
        const currentUser:any=await db.User.findOne({where:{email}})
        if(!currentUser) {
            return res.status(404).json('Email not found');
        }

        // Verify password
        const ispassValid= await bcrypt.compare(password,currentUser.password)
        if(!ispassValid) {
            return res.status(404).json('Incorrect Password');
        }

        // Authenticate user with jwt
        const token = generateToken({ id:currentUser.id, username:currentUser.user},process.env.JWT_SECRETS)
        // Create a cookie and send token to client
        res.cookie('jwt', token, {httpOnly: true, maxAge: expiryInterval * 1000});
        res.status(200).json({message: "User has successfully logged in",token});
    } catch(error) {
        return res.status(500).send('Internal Server Error');
    }
}


// This method handles user logout
const logoutUser = async (req:Request,res:Response) => {
    // replacing the current cookie with a blank one that has 1 ms lifetime
    res.cookie('jwt','', {maxAge: 1});
    res.status(200).json({message: "User has successfully logged out"});
}


// this method updates user account
const updateUserById = async (req: Request, res: Response) => {

    try {
        await registerSchema.validateAsync(req.body)
    }
    catch(error:any) {
        return res.status(400).json(error.details[0].message);
    }

    try {
        const userId=req.params.userId;
        const {firstName,lastName,user, email,phone,dateOfBirth,password} = req.body;
        const currentUser:any=await db.User.findByPk(userId);
        if(firstName) {
            currentUser.firstName=firstName;
        }
        if(lastName) {
            currentUser.lastName=lastName;
        }
        if(email) {
            currentUser.email=email;
        }
        if(password) {
            const hashedPassword=await bcrypt.hash(password, 10);
            currentUser.password=hashedPassword;
        }
        if(user) {
            currentUser.user=user;
        }
        if(phone) {
            currentUser.phone=phone;
        }
        if(dateOfBirth) {
            currentUser.dateOfBirth=dateOfBirth;
        }

        await currentUser.save();
        res.status(200).json({message: "User has successfully updated"});
    }
    catch(error) {
        return res.status(500).send('Internal Server Error');
    }
};

// This method deletes user account
const deleteUserById = async (req: Request, res: Response) => {
    try {

        const userId=req.params.userId;
        if(Number(userId)!==Number(req.user.id)) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await db.User.destroy({ where: {id:userId}});
        res.status(200).json({message: "User has successfully deleted"});

    }
    catch(error) {
        return res.status(500).send('Internal Server Error');
    }


};

export {
  getAllUsers,
  getUserById,
  createNewUser,
  loginUser,
  logoutUser,
  updateUserById,
  deleteUserById,
};
