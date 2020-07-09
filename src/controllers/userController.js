import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
	res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
	const {
		body: { name, email, password, passwordV },
	} = req;

	if (password !== passwordV) {
		res.status(400);
		res.render("join", { pageTitle: "Join" });
	} else {
		try {
			const user = await User({
				name,
				email,
			});
			await User.register(user, password);
			next();
		} catch (error) {
			console.log(error);
			res.redirect(routes.home);
		}
	}
};
export const getLogin = (req, res) =>
	res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
	failureRedirect: routes.login,
	successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
	const {
		_json: { id, avatar_url: avatarUrl, name, email },
	} = profile;
	try {
		const user = await User.findOne({ email });
		if (user) {
			user.githubId = id;
			user.save();
			return cb(null, user);
		}
		const newUser = await User.create({
			email,
			name,
			githubId: id,
			avatarUrl,
		});
		return cb(null, newUser);
	} catch (error) {
		return cb(error);
	}
};

export const postGithubLogin = (req, res) => {
	res.redirect(routes.home);
};

export const logout = (req, res) => {
	req.logout();
	res.redirect(routes.home);
};

export const getMyProfile = (req, res) =>
	res.render("userDetail", { pageTitle: "User Detail", user: req.user });

export const userDetail = async (req, res) => {
	const {
		params: { id },
	} = req;
	try {
		const user = await User.findById(id).populate("videos");
		console.log(user);
		res.render("userDetail", { pageTitle: "User Detail", user });
	} catch (error) {
		res.redirect(routes.home);
	}
};
export const getEditProfile = (req, res) =>
	res.render("editProfile", { pageTitle: "Edit Profile" });
export const postEditProfile = async (req, res) => {
	const {
		body: { name, email },
		file,
	} = req;

	try {
		await User.findByIdAndUpdate(req.user.id, {
			name,
			email,
			avatartUrl: file ? file.location : req.user.avatarUrl,
		});
	} catch (error) {
		res.redirect(routes.editProfile);
	}
};

export const getEditPassword = (req, res) =>
	res.render("editPassword", { pageTitle: "EditPassword" });
export const postEditPassword = async (req, res) => {
	const {
		body: { oldPassword, newPassword, newPasswordV },
	} = req;
	try {
		if (newPassword !== newPasswordV) {
			res.status(400);
			res.redirect(`/users/${routes.editPassword}`);
			return;
		}
		await req.user.changePassword(oldPassword, newPassword);
		res.redirect(routes.myprofile);
	} catch (error) {
		res.status(400);
		res.redirect(`/users/${routes.editPassword}`);
	}
};
