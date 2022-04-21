import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import cloud from 'cloudinary'
import Users from './user.modal.js'
dotenv.config()
const cloudinary = cloud.v2
const app = express()
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(cors())

const port = process.env.PORT || 5000

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLODINARY_API_SECRET
})

mongoose.connect(process.env.MONGOURI)
    .then(() => {
        app.listen(port, () => console.log('server listening on port: ', port))
    })

app.get('/', (req, res) => {
    res.send('HOME')
})

app.get('/api/v1/users/login', async (req, res) => {
    const { email, password } = req.query;

    const userDetail = await Users.findOne({ email: email });

    if (userDetail) {
        if (await bcrypt.compare(password, userDetail.password)) {
            res.send(userDetail);
        } else {
            res.send({ error: "invaild Password" });
        }
    } else {
        res.send({ error: "user does not exist" });
    }
})

app.get('/api/v1/users/check', async (req, res) => {
    const { email } = req.query
    try {
        const user_exists = await Users.findOne({email: email})
        if (user_exists){
            res.json({status: 'user exists'})
        } else res.json({status: 'ok'})
    } catch (error) {
        console.error(error)        
    }
})

app.post('/api/v1/users/signup', async (req, res) => {
    try {
        const { email, password, fullname, address, questions, image1, image2, image3, gradient, postDate } = req.body

        const encrypt_password = await bcrypt.hash(password, 10)

            let tempImages = [image1, image2, image3]
            let date_ob = new Date()
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            const now = {
                year,
                month,
                date,
                hours
            }
            const uploadedResponse1 = await cloudinary.uploader.upload( tempImages[0].image , {
                    upload_preset: 'futureme'
            })
            const uploadedResponse2 = await cloudinary.uploader.upload( tempImages[1].image , {
                    upload_preset: 'futureme'
            })
            const uploadedResponse3 = await cloudinary.uploader.upload( tempImages[2].image , {
                    upload_preset: 'futureme'
            })
            let userDetail = {
                email,
                password: encrypt_password,
                fullname,
                address,
                questions,
                images: [{question: image1.question ,image:uploadedResponse1.url} , {question: image2.question, image: uploadedResponse2.url}, { question: image3.question , image:uploadedResponse3.url}],
                gradient,
                postDate: now
            }
            Users.create(userDetail, (err, result) => {
                if (err) {
                    res.status(500)
                } else {
                    res.send({ status: 'ok' })
                }
            })
        
    } catch (error) {
        console.error(error)
    
}})
