
import User from "@models/user.model";
import { connectToDB } from "@utils/database"

export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        const users = await User.findById({
            _id: params.id
        })

        return new Response(JSON.stringify(users), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch users", {status: 500})
    }
}