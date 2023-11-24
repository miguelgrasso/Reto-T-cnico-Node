import { createClient } from "redis"; 

const clientDb = createClient();
 
export { clientDb };