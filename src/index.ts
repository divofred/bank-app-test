
import { AppDataSource } from "./data-source"

import app from "./app"

AppDataSource.initialize().then(async () => {

    // create express app

    // start express server
    app.listen(3000)

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error.message))

export default AppDataSource