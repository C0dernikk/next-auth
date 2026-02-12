import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import toast, {Toaster} from "react-hot-toast";
import { sendEmail } from "@/helpers/mailer";

await connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email} = reqBody
        const user = await User.findOne({email})
        
        if(!user){
            return NextResponse.json(
                {error: "User does not exist!"},
                {status: 400}
            )
        }

        await sendEmail({email, emailType: "RESET", userId: user._id});

        return NextResponse.json(
            { message: "Email sent to forgot password",
              success: true,
              user
            }
        )
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},
                    {status: 500}
                )
    }
}