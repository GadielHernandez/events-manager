import { google } from 'googleapis'

const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN!

class GoogleClient {
    auth
    constructor() {
        this.auth = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        )

        this.auth.setCredentials({
            refresh_token: REFRESH_TOKEN,
        })
    }
}

export default new GoogleClient()
