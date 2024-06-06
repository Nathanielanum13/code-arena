import { Context } from "elysia"
import { createHTMLContent } from "./json-to-html"
export const Builder = async (ctx: Context): Promise<Response> => {
    let response: Response = new Response()

    response = new Response(build(ctx.body), {
        headers: {
            'Content-Type': 'text/html'
        }
    })

    return response
}

const build = (json: any) => {
    return `<!DOCTYPE html><html lang="${json.lang || 'en'}"><head>${createHTMLContent(json?.head)}</head><body>${createHTMLContent(json?.body)}</body></html>`;
};