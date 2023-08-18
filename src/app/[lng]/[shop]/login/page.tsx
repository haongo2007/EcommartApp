import FlexRowCenter from "components/flex-box/FlexRowCenter";
import { Metadata } from "next";
import Login from "components/sessions/Login";
import { PageDefaultProps } from "types/types";

export const metadata: Metadata = {
    title: 'Login',
}
  
export default function LoginPage({ params }: PageDefaultProps){
    const {lng,shop} = params;
    return (
        <FlexRowCenter flexDirection="column" minHeight="60vh">
            <Login locale={lng} domain={shop}/>
        </FlexRowCenter>
    );
};