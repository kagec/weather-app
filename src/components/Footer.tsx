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
  }
`;

export default Footer;
