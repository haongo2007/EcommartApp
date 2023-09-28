import FlexRowCenter from "components/flex-box/FlexRowCenter";
import { Metadata } from "next";
import Signup from "components/sessions/Signup";
import { PageDefaultProps } from "types/types";

export const metadata: Metadata = {
    title: 'SignUp',
}
  
export default function SignupPage({ params }: PageDefaultProps){
    const {lng,shop} = params;
  return (
    <FlexRowCenter flexDirection="column" minHeight="80vh">
      <Signup locale={lng} domain={shop}/>
    </FlexRowCenter>
  );
};