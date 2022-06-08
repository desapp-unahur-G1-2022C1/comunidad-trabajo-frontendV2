import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files) {
    console.log(files);
    this.setState({
      files: files
    });
  }
  render() {
    return <DropzoneArea dropzoneText="Arrastre o seleccione su CV en formato .PDF" acceptedFiles={['document/*']} onChange={this.handleChange.bind(this)} />;
  }
}
