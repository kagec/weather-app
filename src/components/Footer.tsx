import styled from "styled-components";

const Footer = () => {
  return (
    <FooterSign>
      created by <span>kagec</span> - devChallenges.io
    </FooterSign>
  );
};

const FooterSign = styled.footer`
  color: #a09fb1;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-top: 112px;

  > span {
    font-weight: 700;
    border-bottom: solid 1px;
  }

  @media screen and (max-width: 1024px) {
    margin-top: 96px;
  }
`;

export default Footer;
