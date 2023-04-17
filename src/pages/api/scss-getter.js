import fs from 'fs';
import path from 'path';

export default function handler(req, res) {

    const filePath = path.join(process.cwd(), 'public', 'styles', '[shopid].scss');

  const fileContent = fs.readFileSync(filePath, 'utf8');
  res.status(200).json({ content: fileContent });

}
