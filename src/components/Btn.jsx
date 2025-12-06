import React from 'react'
import styled from 'styled-components'

function Btn({ as, $btn, $w, children, ...props }) {
  return (
    <StyledBtn as={as} $btn={$btn} $w={$w} {...props}>
      {children}
    </StyledBtn>
  );
} export default Btn;

const StyledBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$btn', '$w'].includes(prop)
})`
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  padding: var(--padding);
  margin: 0 auto;
  border-radius: .8rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  transition: all .3s ease;
  
  width: ${({ $w }) => ($w ? "max-content" : "100%")};
  font-size: ${({ $btn }) => $btn === "alt" ? "medium" : ""};
  text-transform: ${({ $btn }) => $btn !== "alt" ? "uppercase" : ""};

  background: ${({ $btn }) => {
    switch ($btn) {
      case "main": return "var(--color-main)";
      case "alt": return "transparent";
      case "out": return "var(--color-white)";
      case "success": return "var(--color-white)";
      case "danger": return "var(--color-white)";
      default: return "var(--color-white)";
    }
  }};

  color: ${({ $btn }) => {
      switch ($btn) {
      case "main": return "var(--color-dark)";
      case "alt": return "var(--color-main)";
      case "out": return "var(--color-main)";
      case "success": return "var(--color-success)";
      case "danger": return "var(--color-danger)";
      default: return "var(--color-dark)";
    }
  }};

  box-shadow: ${({ $btn }) =>
    $btn === "alt" || $btn === "out"|| $btn === "success" || $btn === "danger"
      ? "none"
      : `
        2px 2px 4px 1px var(--color-shadow),
        inset -2px -2px 4px var(--color-light),
        inset 1px 1px 1px 1px var(--color-shadow)
      `
  };

  border: ${({ $btn }) => {
      switch ($btn) {
      case "out": return "2px solid var(--color-main)";
      case "success": return "2px solid var(--color-success)";
      case "danger": return "2px solid var(--color-danger)";
      default: return "none";
    }
  }};

  &:hover {
      ${({ $btn }) => $btn === "alt"
        ? `
          text-decoration: underline;
          opacity: .8;
        `
        : `
          background: var(--color-light);
          color: var(--color-dark);
          font-weight: 700;
        `
      }
    }

  & svg {
    width: 1.5rem;
    height:1.5rem;
  }
`;