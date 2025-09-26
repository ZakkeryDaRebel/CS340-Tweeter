import SocialMediaButton from "./SocialMediaButton";

const OAuth = () => {

    return (
        <div className="text-center mb-3">
            <SocialMediaButton title="Google" icon="google" />
            <SocialMediaButton title="Facebook" icon="facebook" />
            <SocialMediaButton title="Twitter" icon="twitter" />
            <SocialMediaButton title="LinkedIn" icon="linkedin" />
            <SocialMediaButton title="GitHub" icon="github" />
        </div>
    );
}

export default OAuth;