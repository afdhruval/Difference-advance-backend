import "dotenv/config"
import express from "express"
// import strategy and GoogleStrategy
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

const app = express()

app.get("/", (req, res) => {
    res.send("sorry");
})

/* initialize the passport for making the authentication */
app.use(passport.initialize())

/* with the help of passport if you want 
to use authentication this is must to use write same as below */

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // GOOGLE_CALLBACK_URL: "http://localhost:3000/auth/google/callback"
    callbackURL: "http://localhost:3000/auth/google/callback"
}, (_, __, Profile, done) => {
    return done(null, Profile);
}))

app.get("/auth/google",
    passport.authenticate("google", { scope: ["Profile", "email"] })
)

app.get("/auth/google/callback",
    passport.authenticate('google', { session: false, failureRedirect: "/" }),
    (req, res) => {
        console.log(req.user)
        res.send("google authenticate successfull")
    }
)



app.listen(3000, () => {
    console.log("server is running on 3000");
})