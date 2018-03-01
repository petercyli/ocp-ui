/**
 *
 * Card
 *
 */
import styled from 'styled-components';


const Card = styled.div`
  padding: 10px;
  background-color: white;
  margin: 10px;
  min-width: 650px;
  min-height: 430px;
  height: 100%;
  border-radius: 2px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

Card.propTypes = {};

export default Card;