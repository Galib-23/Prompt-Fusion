//GET (read)

import Prompt from "@models/prompt.model";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
      
    }
}
