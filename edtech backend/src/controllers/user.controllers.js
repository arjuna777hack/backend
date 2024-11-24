import { User } from "../models/user.models.js";
import { ApiError } from "../utility/apiError.js";
import { asyncHandler } from "../utility/asyncHandler.js"; 
import { uploadonCloudinary } from "../utility/cloudinary.js";
import { ApiResponse } from "../utility/apiResponse.js";
import jwt from "jsonwebtoken";


const generateAccessAndRefreshTokens = async(userId)=>{
// console.log(userId);

try {
    const user = await User.findById(userId)
    
   const accesstoken =  user.generateAccessToken()
    const refreshtoken = user.generateRefreshToken()

    user.refreshToken  = refreshtoken
    await user.save({validateBeforeSave : false})
    
    return {accesstoken , refreshtoken}

} catch (error) {
    // console.log(error);
    
    throw new ApiError(500, "Something went wrong while generating refresh and access token")
}

} 



const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
  
    // Validate that all fields are provided
    if ([email, username, password].some((field) => field?.trim() === "")) {
      throw new ApiError("400", "All fields are required");
    }
  
    // Check if user already exists with the given username or email
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
  
    if (existingUser) {
      throw new ApiError("409", "User with email or username already exists");
    }
  
    // Create the user in the database
    const user = await User.create({
      email,
      password,
      username: username.toLowerCase(),
    });
  
    // Find the created user excluding the password and refreshToken fields
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
  
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }
  
    // Generate the access and refresh tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
  
    // Return the response including the user data and tokens
    return res.status(201).json(
      new ApiResponse(200, {
        user: createdUser,
        accessToken,  // Include the access token
        refreshToken, // Include the refresh token
      }, "User registered successfully")
    );
  });
  



const loginUser = asyncHandler( async (req,res)=>{


    const {username, email,password} = req.body;

    if(!(username || email)){
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne(
      {
        $or:[
            {username} , {email}
        ]
      }
    )

// console.log(user);


    if(!user){
        throw new ApiError(404, "user Doesn't exit")
    }

    const isPasswordvalid = await user.isPasswordCorrect(password);

    if(!isPasswordvalid){
        throw new ApiError(401, "Invalid user credentials")
    }


    const {accesstoken, refreshtoken}  = await generateAccessAndRefreshTokens(user._id)
    // console.log(accesstoken, refreshtoken);
    

    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")

const options = {
    httpOnly : true,
    secure:true
}

return res
.status(200)
.cookie("accessToken",accesstoken,options)
.cookie("refreshToken",refreshtoken,options)
.json(
    new ApiResponse(200,
        {
            user: loggedInUser, accesstoken, refreshtoken
        },
        "User logged in successfully"
    )
)

})

const logoutUser = asyncHandler( async (req,res)=>{
    // cookies remove 
    // delete refresh token

  await  User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{refreshToken: undefined}
        },
        {
            new : true
        }
    )
    
    const options = {
        httpOnly : true,
        secure:true
    }

return res
.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(new ApiResponse(200,{}, "user successfully logout"))

})


const refreshAccessToken = asyncHandler( async (req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

if(!incomingRefreshToken){
    throw new ApiError(401, "unauthorized request");
}
try {
    const decodedToken = jwt.verify(
        incomingRefreshToken, 
        process.env.REFRESH_TOKEN_SECRET
    )
    
    const user = await User.findById(decodedToken?._id)
    if(!user){
        throw new ApiError(401, "Invalid refresh Token");
    }
    // console.log(incomingRefreshToken, "token : " ,user?.refreshToken)
    if(incomingRefreshToken !== user?.refreshToken){
        throw new ApiError(401, "Refresh token is expired or userid")
    }
    
    
    const options = {
        httpOnly:true,
        secure:true
    }
    
    const {accesstoken,refreshtoken} = await generateAccessAndRefreshTokens(user._id)
    
    return res.status(200)
    .cookie("accessToken", accesstoken,options)
    .cookie("refreshToken", refreshtoken,options)
    .json(
        new ApiResponse(200,
            {accesstoken,refreshtoken},
            "Access token refreshed"
        )
    )
    
} catch (error) {
    throw new ApiError(401, error?.message || "invalid refresh token")
}

})

export { registerUser,loginUser , logoutUser, refreshAccessToken };

