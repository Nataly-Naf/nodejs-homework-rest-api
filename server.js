import app from './app.js'
// mongoDB lGNw81p609yhHuOo
// natspivak84
import mongoose from 'mongoose'

const DB_HOST = "mongodb+srv://Nataly:lGNw81p609yhHuOo@cluster0.afqrzic.mongodb.net/my-contacts?retryWrites=true&w=majority"
mongoose.connect()
  .then(() => { app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})})
  .catch(error => {
    console.log(error.message);
    process.exit(1)
  })

