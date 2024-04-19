import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

export async function GET(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    console.log(res)
    const session = await getSession({ req })
    console.log(session)
    /* ... */
    return new Response()
}