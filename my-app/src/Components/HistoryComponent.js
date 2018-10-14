import React from "react";
import { render } from "react-dom";
import { makeData } from "./Utils";
import ReactTable from "react-table";
import "react-table/react-table.css";
import '../Styles/Table.css';

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div className="Table">
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Info",
              columns: [
                {
                  Header: "Game",
                  accessor: "game"
                },
                {
                  Header: "Opponent",
                  accessor: "userName"
                },
                {
                  Header: "Status",
                  accessor: "status"
                }
              ]
            },
            {
              Header: 'Stats',
              columns: [
                {
                  Header: "Winrate",
                  accessor: "winrate"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

render(<Table />, document.getElementById("root"));

export default Table;
