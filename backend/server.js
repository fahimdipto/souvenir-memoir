import  express from 'express';
import  cors from 'cors';
import  mongoose from 'mongoose';
import postRoutes from './routes/posts.js'
import {} from 'dotenv/config'

const app = express();



app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/post',postRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.ATLAS_URL, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>app.listen(PORT,() =>console.log(`Server Running on port ${PORT}`))
).catch((error)=> console.log(error.message));

//mongoose.set('useFindAndModify',false);