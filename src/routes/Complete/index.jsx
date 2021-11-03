/** Contact details page */
import React, {useState, useEffect} from "react";
import PT from "prop-types";
import "./styles.module.scss";
import { Link } from "@reach/router";
import { useSelector } from "react-redux";
import withAuthentication from "hoc/withAuthentication";
import {toastr} from 'react-redux-toastr'
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
// import components and other stuffs
import IconCheck from "../../assets/images/icon-check.svg";
// import components and other stuffs
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageH1 from "components/PageElements/PageH1";
import PageH2 from "components/PageElements/PageH2";
import PageH3 from "components/PageElements/PageH3";
import PageP from "components/PageElements/PageP";
import PageUl from "components/PageElements/PageUl";
import PageRow from "components/PageElements/PageRow";
import PageFoot from "components/PageElements/PageFoot";
import Button from "components/Button";
import OnboardProgress from "components/OnboardProgress";
import { BUTTON_SIZE, BUTTON_TYPE } from "constants";

const Complete = () => {
  const [myProfileData, setMyProfileData] = useState({});
  const authUser = useSelector((state) => state.authUser);

  // Get Member data from redux (firstName, lastName, handle, photoURL) and store it on myProfileData
  useEffect(() => {
    if(!authUser || !authUser.handle) return;
    getAuthUserProfile().then(result => {
      setMyProfileData(result);
    }).catch(e => {
      toastr.error('Error', 'failed to get profile basic infos!');
      console.log(e);
    })
  }, [authUser])

  return (
    <>
      <Page title="Contact Details" styleName="complete">
        <PageContent>
          <PageH2>ONBOARDING COMPLETE!</PageH2>
          {`${myProfileData?.firstName || ""} ${myProfileData?.lastName || ""} | ${authUser?.handle}`}
          <PageDivider />
          <PageH1>LET THE FUN BEGIN.</PageH1>
          <br />
          <div styleName="congrats-box">
            <PageH2><IconCheck styleName="icon-check" />CONGRATULATIONS!</PageH2>
            <PageP>
              Almost done! Be sure to go set up your payment so you can get paid for your work
            </PageP>
            <PageP>
              Now it's time to put your skills to good use. Go explore your new Topcoder home and discover
              the ways you can earn, and connect with great people in the Topcoder Community.
            </PageP>
            <br />
            <Link to="/">
              <Button size={BUTTON_SIZE.MEDIUM} type={BUTTON_TYPE.SECONDARY}>EXPLORE TOPCODER HOME</Button>
            </Link>
          </div>
          <OnboardProgress level={4} />
        </PageContent>
      </Page>
    </>
  )
};

export default withAuthentication(Complete);
