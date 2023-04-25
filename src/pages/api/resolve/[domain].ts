// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from "@solana/web3.js";
import { walletNameToAddressAndProfilePicture } from "@portal-payments/solana-wallet-names";

import { MAINNET } from '@/lib/config';

// export const config = {
//   runtime: 'edge',
// }

type Data = {
  result: string,
  s: string,
}

const CONNECTION = new Connection(MAINNET);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { domain } = req.query
  if (domain && !Array.isArray(domain)) {

    try {
      let data = await walletNameToAddressAndProfilePicture(CONNECTION, domain);
      if (data && data.walletAddress) {
        res.status(200).json({
          s: "ok",
          result: data.walletAddress,
        })
      } else {
        res.status(200).json({
          s: "error",
          result: "Domain not found"
        })
      }
    } catch (e) {
      res.status(200).json({
        s: "error",
        result: "Domain not found"
      })
    }
  } else {
    res.status(200).json({
      s: "error",
      result: "Domain not found"
    })
  }
}