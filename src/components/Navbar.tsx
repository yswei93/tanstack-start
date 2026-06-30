import { Show, UserButton } from "@clerk/tanstack-react-start";
import { usePostHog } from "@posthog/react";
import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";

const Navbar = () => {
	const posthog = usePostHog();

	const handleSignInClick = () => {
		posthog.capture("sign_in_clicked");
	};

	return (
		<nav className="navbar">
			<div className="brand">
				<div className="mark">
					<div className="glyph" />
				</div>
				<Link to="/">Skilld</Link>
			</div>

			<div className="actions">
				<Show when="signed-out">
					<Link
						to="/sign-in/$"
						className="btn-primary"
						onClick={handleSignInClick}
					>
						<LogIn />
						Sign In
					</Link>
				</Show>
				<Show when="signed-in">
					<UserButton />
				</Show>
			</div>
		</nav>
	);
};

export default Navbar;
