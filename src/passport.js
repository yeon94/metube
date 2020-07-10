import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import {
	githubLoginCallback,
	kakaoLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
	new GithubStrategy(
		{
			clientID: process.env.GH_ID,
			clientSecret: process.env.GH_SECRET,
			callbackURL: process.env.PRODUCTION
				? `https://murmuring-castle-64725.herokuapp.com${routes.githubCallback}`
				: `http://localhost:4000${routes.githubCallback}`,
		},
		githubLoginCallback
	)
);
passport.use(
	new KakaoStrategy(
		{
			clientID: process.env.KAKAO_SECRET,
			clientSecret: "",
			callbackURL: process.env.PRODUCTION
				? `https://quiet-ocean-34936.herokuapp.com${routes.kakaoCallback}`
				: `http://localhost:4000${routes.kakaoCallback}`,
		},
		kakaoLoginCallback
	)
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
