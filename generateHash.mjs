// generateHash.mjs
import bcrypt from 'bcryptjs';

const hash = await bcrypt.hash('123456', 10);
console.log('Generated Hash:', hash);
