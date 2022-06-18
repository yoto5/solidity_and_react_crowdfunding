import { NFTStorage, File } from 'nft.storage';
import process from 'process';
import formidable, {File as _File} from 'formidable';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import axios from 'axios';

const fsPromises = fs.promises;

const NFT_STORAGE_KEY = String(process.env.NFT_STORAGE_KEY);


export const config = {
    api: {
      bodyParser: false,
    },
  };

export default async function handler(req: any, res: any){
    if(req.method==='POST'){

        const form = new formidable.IncomingForm();
       
        await form.parse(req, async function(err, fields, files){
            
            if (err) {
              res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
              res.end(String(err));
              return;
            }

            // rename auto generated temp file to original name
            const f: any = files.file;
            f.newFileName = f.oldFileName;
            const oldFileName: string = String(f.originalFilename);
            const newFileName: string = String(f.newFilename);
            const filePath: string = String(f.filepath);
            const newFilePath: string = filePath.replace(newFileName, oldFileName)

            const renameRes = await fsPromises.rename(filePath, newFilePath);

            console.log('renameRes', renameRes);

            const image = await fileFromPath(newFilePath);
            // create a new NFTStorage client using our API key
            const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
        
            // call client.store, passing in the image & metadata
            const ret_nft_info = await nftstorage.store({
              image,
              name: 'test',
              description: 'test image',
            });
            console.log('ret_val', ret_nft_info);
            
            // get image url from metadata
            const metadataUrl = ret_nft_info.url.replace('ipfs://', 'https://ipfs.io/ipfs/');
            const metadata: any = await axios.get(metadataUrl);
            console.log('metadata', metadata)
            
            // convert image urls
            let imageUrl = undefined;
            if(metadata){
              imageUrl = metadata.data.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
              console.log(imageUrl);
            }
            
            
            return res.status(200).json({imageUrl: imageUrl})
          });
    
    }   
}

async function fileFromPath(filePath: any) {
  const content = await fs.promises.readFile(filePath)
  const type: any = mime.getType(filePath)
  return new File([content], path.basename(filePath), { type })
}