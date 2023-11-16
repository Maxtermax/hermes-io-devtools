import React, { useRef } from "react";
import { formatDate } from "@core/utils/utils";
import VerticalBar from "@core/views/components/VerticalBar/VerticalBar";
import SourceCode from "@core/views/components/SourceCode/SourceCode";
import Greeting from "@core/views/components/Greeting/Greeting";
import Recording from "@core/views/components/Recording/Recording";
import Parameters from "@core/views/components/Parameters/Parameters";
import Wrapper from "./Wrapper";
import Container from "./Container";
import List from "./List";
import Item from "./Item";
import PlayContext from './PlayContext';
import Panel from './Panel';
import Title from './Title';
import TimeStamp from './TimeStamp';

const Details = (props = {}) => {
  const { data = [], anchor = {}, onSetContext = () => null, recording = false } = props;
  const containerRef = useRef(null);

  const handleCopy = () =>
    containerRef?.current?.querySelector?.("button").click();

  return (
    <Container ref={containerRef}>
      {data.map(({ date, playing, stackTrace, value, listener, id }) => (
        <List key={id}>
          <Item playing={playing} anchor={anchor}>
            <PlayContext onSetContext={onSetContext} id={id}  />
            <VerticalBar playing={playing} />
            <Panel>
              <Title name={listener} />
              <TimeStamp text={formatDate(date)} />
              <Wrapper>
                <Parameters value={value} onCopy={handleCopy} />
              </Wrapper>
              <Wrapper>
                <SourceCode stackTrace={stackTrace} name={listener} />
              </Wrapper>
            </Panel>
          </Item>
        </List>
      ))}
      {!recording && data.length === 0 ? <Greeting /> : null}
      {recording && data.length === 0 ? <Recording /> : null }
    </Container>
  );
};

export default Details;
