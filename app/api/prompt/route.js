import Prompt from "@models/prompt.model";
import { connectToDB } from "@utils/database"

export const GET = async (request) => {
    try {
        await connectToDB();

        const { searchParams } = new URL(request.url);
        const searchTerm = searchParams.get('searchTerm');

        const prompts = await Prompt.find({
            $or: [
                { prompt: { $regex: searchTerm, $options: 'i' } },
                { tag: { $regex: searchTerm, $options: 'i' } }
            ]
        }).populate('creator');

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch prompts", {status: 500})
    }
}