// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from "@solana/web3.js";
//import { walletNameToAddressAndProfilePicture } from "@portal-payments/solana-wallet-names";

import { TldParser } from "@onsol/tldparser";
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

    const parser = new TldParser(CONNECTION);
    const owner = await parser.getOwnerFromDomainTld(domain);

    if (owner) {
      res.status(200).json({
        s: "ok",
        result: owner.toBase58(),
      })
    } else {
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

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { domain } = req.query
//   if (domain && !Array.isArray(domain)) {
//     let data = await walletNameToAddressAndProfilePicture(CONNECTION, domain)
//     if (data) {
//       res.status(200).json({
//         s: "ok",
//         result: data.walletAddress,
//       })
//     } else {
//       res.status(200).json({
//         s: "error",
//         result: "Domain not found"
//       })
//     }
//   } else {
//     res.status(200).json({
//       s: "error",
//       result: "Domain not found"
//     })
//   }
// }
