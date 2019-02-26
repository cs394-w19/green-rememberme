import React from "react";
import { Accordion, Icon } from "semantic-ui-react";
import "./AccordionList.css";

class AccordionList extends React.Component {
  state = { activeIndex: -1, iconName: "plus" };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const activeIndex = this.state.activeIndex;
    const newIndex = activeIndex === index ? -1 : index;
    const newIcon = activeIndex === index ? "plus" : "minus";
    this.setState({ activeIndex: newIndex, iconName: newIcon });
  };

  render() {
    const activeIndex = this.state.activeIndex;
    return (
      <div className="maxWidth" ref={this.state.myRef}>
        <Accordion>
          <Accordion.Title
            className="title"
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Icon name={this.state.iconName} />
            {this.props.name}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            {this.props.children}
          </Accordion.Content>
        </Accordion>
      </div>
    );
  }
}

export default AccordionList;
