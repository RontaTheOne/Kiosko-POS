import express from 'express'; 

const app = express(); 

const PORT = 0; 
 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});