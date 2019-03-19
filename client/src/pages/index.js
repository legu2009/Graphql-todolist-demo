import React, { Fragment } from "react";
import { Router } from "@reach/router";
import Launches from "./launches";
import Profile from "./profile";
import { PageContainer } from "../components";

export default function Pages() {
  return (
    <PageContainer>
      <Router primary={false} component={Fragment}>
        <Launches path="/" />
        <Profile path="profile" />
      </Router>
    </PageContainer>
  );
}
