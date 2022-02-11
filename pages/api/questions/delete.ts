// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {questionsDelete} from '../../../server/controllers/party-controller'
// const questionsRoutes = require('../../../server/controllers/party-controller')

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await questionsDelete(req, res)
}


