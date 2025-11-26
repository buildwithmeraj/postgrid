import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <StyledWrapper>
      <div className="flex items-center justify-center h-[75vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-primary rounded-lg p-4">
          <div className="text-2xl flex items-center justify-center mb-2 font-bold text-primary">
            Loding ...
          </div>
          <div className="cards">
            <div className="card">
              <div className="face front" />
              <div className="face back" />
            </div>
            <div className="card">
              <div className="face front" />
              <div className="face back" />
            </div>
            <div className="card">
              <div className="face front" />
              <div className="face back" />
            </div>
            <div className="card">
              <div className="face front" />
              <div className="face back" />
            </div>
            <div className="card">
              <div className="face front" />
              <div className="face back" />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cards {
    display: flex;
    gap: 10px;
  }

  .card {
    position: relative;
    width: 20px;
    height: 30px;
    perspective: 500px;
    animation: flip 2s infinite;
  }

  .card:nth-child(2) {
    animation-delay: 0.2s;
  }
  .card:nth-child(3) {
    animation-delay: 0.4s;
  }
  .card:nth-child(4) {
    animation-delay: 0.6s;
  }

  .face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 4px;
  }

  .front {
    background: #c39fea;
  }

  .back {
    background: #c39fea;
    transform: rotateY(180deg);
  }

  @keyframes flip {
    0%,
    100% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(180deg);
    }
  }
`;

export default Loading;
