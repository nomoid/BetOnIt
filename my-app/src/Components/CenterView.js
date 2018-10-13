import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

class CenterView extends Component {
  render() {
    return (
        <Grid>
            <Row className="show-grid">
                <Col xs={1} md={4} lg={4}></Col>
                <Col xs={4} md={4}>{this.props.children}</Col>
                <Col xs={1} md={4} lg={4}></Col>
            </Row>
        </Grid>
    );
  }
}

export default CenterView;