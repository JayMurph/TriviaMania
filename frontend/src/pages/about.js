import React from "react";
import { Paragraph, CenteredDiv, PageHeader } from "../StyledElements";

const About = () => {
  return (
    <CenteredDiv>
      <PageHeader>Trivia Mania</PageHeader>
      <div>
        <Paragraph>Unleash your inner genius with Trivia Mania!</Paragraph>
        <Paragraph>
          Test your knowledge in math, history, science, literature, and more.
        </Paragraph>
        <Paragraph>Play now and become the ultimate trivia champion!</Paragraph>
      </div>
    </CenteredDiv>
  );
};

export default About;
